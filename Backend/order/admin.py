from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'customer_name', 'customer_email', 'quantity', 
                    'total_price', 'payment_status', 'payment_method', 'order_date', 'is_verified')
    list_filter = ('payment_status', 'payment_method', 'is_verified', 'order_date')
    search_fields = ('customer_name', 'customer_email', 'transaction_id', 'product__product_name')
    ordering = ('-order_date',)
    readonly_fields = ('order_date', 'transaction_id')  # Prevent changes to transaction_id and order_date

    fieldsets = (
        ("Order Details", {
            'fields': ('product', 'customer_name', 'customer_email', 'quantity', 'total_price', 'delivery_address')
        }),
        ("Payment Info", {
            'fields': ('payment_status', 'payment_method', 'transaction_id')
        }),
        ("Verification", {
            'fields': ('otp', 'is_verified')
        }),
        ("Timestamps", {
            'fields': ('order_date',)
        }),
    )


