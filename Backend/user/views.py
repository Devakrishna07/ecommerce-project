from django.shortcuts import render

# Create your views here.
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import authenticate
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Function to generate JWT tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Register API
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=400)

    user = User.objects.create_user(username=username, password=password)
    return Response(get_tokens_for_user(user))

# Login API
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user:
        return Response(get_tokens_for_user(user))
    
    return Response({"error": "Invalid credentials"}, status=400)


# Forgot Password (Send reset link)
@api_view(['POST'])
def forgot_password(request):
    email = request.data.get('email')
    user = User.objects.filter(email=email).first()
    
    if user:
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_link = f"http://localhost:3000/reset-password/{uid}/{token}/"
        
        send_mail(
            "Password Reset",
            f"Click here to reset your password: {reset_link}",
            "admin@example.com",
            [email],
        )
        return Response({"message": "Password reset link sent to your email."})
    
    return Response({"error": "Email not found"}, status=400)

# Reset Password (Set a new password)
@api_view(['POST'])
def reset_password(request, uidb64, token):
    new_password = request.data.get('password')
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)

        if default_token_generator.check_token(user, token):
            user.set_password(new_password)
            user.save()
            return Response({"message": "Password reset successful."})
    except:
        pass

    return Response({"error": "Invalid token"}, status=400)

# Change Password (For logged-in users)
@api_view(['POST'])
def change_password(request):
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')

    if user.check_password(old_password):
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password changed successfully."})
    
    return Response({"error": "Incorrect old password"}, status=400)

    