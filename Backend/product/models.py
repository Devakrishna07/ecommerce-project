from django.db import models

# Create your models here.

class Product(models.Model):
    PRODUCT_TYPES = [
        ('tshirt', 'T-Shirt'),
        ('shirt', 'Shirt'),
        ('jeans', 'Jeans'),
        ('trousers', 'Trousers'),
        ('jacket', 'Jacket'),
        ('shoes', 'Shoes'),
        ('accessories', 'Accessories'),
        ('other', 'Other'),
    ]

    product_name = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)  # Company name of the product
    product_type = models.CharField(max_length=50, choices=PRODUCT_TYPES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    color = models.CharField(max_length=50)
    size = models.CharField(max_length=10)  # Example: S, M, L, XL
    material = models.CharField(max_length=100)  # Example: Cotton, Denim, Leather
    description = models.TextField()
    stock = models.PositiveIntegerField()  # Number of items available
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product_name} - {self.company_name}"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return f"Image for {self.product.product_name}"
