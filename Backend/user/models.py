from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, phone_number, name, password=None):
        if not email:
            raise ValueError("Email is required")
        if not username:
            raise ValueError("Username is required")
        if not phone_number:
            raise ValueError("Phone number is required")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, phone_number=phone_number, name=name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, phone_number, name, password=None):
        user = self.create_user(email, username, phone_number, name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'  # User logs in with email instead of username
    REQUIRED_FIELDS = ['username', 'phone_number', 'name']

    def __str__(self):
        return self.email
