from django.contrib import admin

# Register your models here.
from .models import CustomUser, RegistrationLog, LoginLog, PasswordResetLog

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'phone_number', 'get_is_active', 'get_is_staff', 'date_joined')
    search_fields = ('username', 'email', 'phone_number')
    list_filter = ()  # Remove 'is_active' and 'is_staff' if they are not fields in the model
    ordering = ('date_joined',)
    actions = ['delete_selected']

    def get_is_active(self, obj):
        return obj.is_active
    get_is_active.boolean = True
    get_is_active.short_description = 'Active'

    def get_is_staff(self, obj):
        return obj.is_staff
    get_is_staff.boolean = True
    get_is_staff.short_description = 'Staff'

from django.contrib import admin
from .models import PasswordResetLog

from django.contrib import admin
from .models import PasswordResetLog

@admin.register(PasswordResetLog)  # Keep only this registration
class PasswordResetLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_email', 'reset_token', 'reset_requested_at', 'reset_completed_at')

    def get_email(self, obj):
        return obj.user.email  # Fetch email from related CustomUser

    get_email.short_description = 'Email'


@admin.register(RegistrationLog)
class RegistrationLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'phone_number', 'registered_at')
    search_fields = ('username', 'email', 'phone_number')
    ordering = ('-registered_at',)

@admin.register(LoginLog)
class LoginLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'login_time')
    search_fields = ('username', 'email')
    ordering = ('-login_time',)

