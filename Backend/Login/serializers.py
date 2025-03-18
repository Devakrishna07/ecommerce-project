from rest_framework import serializers
from .models import CustomUser, RegistrationLog, LoginLog, PasswordResetLog

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone_number', 'date_joined']

class RegistrationLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationLog
        fields = ['id', 'user', 'username', 'email', 'phone_number', 'password', 'registered_at']

class LoginLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginLog
        fields = ['id', 'user', 'username', 'email', 'login_time', 'logout_time']

class PasswordResetLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetLog
        fields = ['id', 'user', 'reset_token', 'reset_requested_at', 'reset_completed_at']
