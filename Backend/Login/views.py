from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.utils.timezone import now
from django.contrib.auth import authenticate, login, logout
from .models import CustomUser, LoginLog, RegistrationLog, PasswordResetLog
from .serializers import CustomUserSerializer, LoginLogSerializer, RegistrationLogSerializer
import random
import string
from django.core.cache import cache

otp_storage = {}
password_reset_tokens = {}  # Initialize reset tokens dictionary


class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"message": "Email not found. Please register."}, status=status.HTTP_404_NOT_FOUND)

        user = authenticate(email=email, password=password)
        if user:
            login(request, user)  # Log in the user session
            login_log = LoginLog.objects.create(user=user, username=user.username, email=user.email, login_time=now())
            serializer = LoginLogSerializer(login_log)
            return Response({"message": "Login successful", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Incorrect password. Please try again."}, status=status.HTTP_400_BAD_REQUEST)


class RegisterAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        username = request.data.get('username')
        phone_number = request.data.get('phone_number')
        password = request.data.get('password')
        otp = request.data.get('otp')

        if CustomUser.objects.filter(email=email).exists():
            return Response({"message": "Email already exists. Please login."}, status=status.HTTP_400_BAD_REQUEST)

        stored_otp = cache.get(f'otp_{email}')
        if stored_otp:
            if otp and otp == stored_otp:
                user = CustomUser.objects.create_user(username=username, email=email, phone_number=phone_number, password=password)
                RegistrationLog.objects.create(user=user, username=username, email=email, phone_number=phone_number, password=password, registered_at=now())
                cache.delete(f'otp_{email}')  # Remove OTP after successful registration
                return Response({"message": "Registration successful. Please login."}, status=status.HTTP_201_CREATED)
            return Response({"message": "Invalid OTP. Please try again."}, status=status.HTTP_400_BAD_REQUEST)

        # Generate OTP and store it
        generated_otp = str(random.randint(100000, 999999))
        cache.set(f'otp_{email}', generated_otp, timeout=300)  # Store OTP for 5 minutes

        send_mail(
            'Your OTP Code',
            f'Your OTP code is {generated_otp}',
            'no-reply@example.com',
            [email],
            fail_silently=False,
        )

        return Response({"message": "OTP sent to email. Please verify."}, status=status.HTTP_200_OK)


class ForgotPasswordAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"message": "Email not found. Please register."}, status=status.HTTP_404_NOT_FOUND)

        reset_token = str(random.randint(100000, 999999))
        password_reset_tokens[email] = reset_token  # Store the OTP
        PasswordResetLog.objects.create(user=user, email=email, reset_token=reset_token, reset_requested_at=now())

        send_mail(
            'Password Reset OTP',
            f'Your password reset OTP is {reset_token}',
            'no-reply@example.com',
            [email],
            fail_silently=False,
        )

        return Response({"message": "OTP sent to email. Please verify to reset password."}, status=status.HTTP_200_OK)


class ResetPasswordAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        new_password = request.data.get('new_password')

        if email not in password_reset_tokens or password_reset_tokens[email] != otp:
            return Response({"message": "Invalid OTP. Please try again."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"message": "Email not found. Please register."}, status=status.HTTP_404_NOT_FOUND)

        user.set_password(new_password)
        user.save()

        PasswordResetLog.objects.filter(email=email).update(reset_completed_at=now())
        del password_reset_tokens[email]

        return Response({"message": "Password reset successful. Please login."}, status=status.HTTP_200_OK)
