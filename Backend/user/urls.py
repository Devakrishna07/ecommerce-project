from django.urls import path
from .views import register, login
from .views import forgot_password, reset_password, change_password

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('forgot-password/', forgot_password),
    path('reset-password/<uidb64>/<token>/', reset_password),
    path('change-password/', change_password),
]

