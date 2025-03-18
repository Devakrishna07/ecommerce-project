from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.timezone import now

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, phone_number, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not phone_number:
            raise ValueError("Users must have a phone number")
        
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            phone_number=phone_number
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, phone_number, password):
        user = self.create_user(username, email, phone_number, password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    password_reset_token = models.CharField(max_length=100, null=True, blank=True)
    password_reset_expires = models.DateTimeField(null=True, blank=True)
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone_number']
    
    def __str__(self):
        return self.username

class RegistrationLog(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    username = models.CharField(max_length=150)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    password = models.CharField(max_length=128)
    registered_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.username} registered at {self.registered_at}"

class LoginLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    username = models.CharField(max_length=150)
    email = models.EmailField()
    login_time = models.DateTimeField(default=now)
    logout_time = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.username} logged in at {self.login_time}"

class PasswordResetLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    reset_token = models.CharField(max_length=100)
    reset_requested_at = models.DateTimeField(auto_now_add=True)
    reset_completed_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.username} requested password reset at {self.reset_requested_at}"
