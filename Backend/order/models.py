from django.db import models
from Product.models import Product

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="orders")
    customer_name = models.CharField(max_length=255, blank=False, null=False)
    customer_email = models.EmailField(blank=False, null=False)
    quantity = models.PositiveIntegerField(blank=False, null=False)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    delivery_address = models.TextField(blank=False, null=False)
    payment_status = models.CharField(
        max_length=20, 
        choices=[('Pending', 'Pending'), ('Completed', 'Completed'), ('Failed', 'Failed')],
        default='Pending',
        blank=False, null=False
    )
    transaction_id = models.CharField(
        max_length=100, 
        unique=True, 
        blank=False, null=False
    )  # Mandatory now
    payment_method = models.CharField(
        max_length=50, 
        choices=[('Card', 'Card'), ('UPI', 'UPI'), ('Net Banking', 'Net Banking'), ('COD', 'Cash on Delivery')],
        default='Card',
        blank=False, null=False
    )
    otp = models.CharField(max_length=6, blank=True, null=True)  # OTP for verification
    is_verified = models.BooleanField(default=False)  # Flag for OTP verification
    order_date = models.DateTimeField(auto_now_add=True, blank=False, null=False)

    def __str__(self):
        return f"Order {self.id} - {self.product.product_name} - {self.customer_name}"
