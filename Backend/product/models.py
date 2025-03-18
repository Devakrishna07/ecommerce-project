from django.db import models


def upload_to(instance, filename):
    return f'products/{filename}'

class Product(models.Model):
    PRODUCT_TYPES = [
        ('Shirt', 'Shirt'),
        ('T-Shirt', 'T-Shirt'),
        ('Jeans', 'Jeans'),
        ('Trousers', 'Trousers'),
        ('Jacket', 'Jacket'),
        ('Shoes', 'Shoes'),
        ('Accessories', 'Accessories'),
    ]

    MATERIAL_TYPES = [
        ('Cotton', 'Cotton'),
        ('Polyester', 'Polyester'),
        ('Denim', 'Denim'),
        ('Leather', 'Leather'),
        ('Wool', 'Wool'),
        ('Silk', 'Silk'),
        ('Other', 'Other'),
    ]

    SIZE_CHOICES = [
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
        ('XXL', 'Double Extra Large'),
    ]

    product_type = models.CharField(max_length=50, choices=PRODUCT_TYPES)
    product_name = models.CharField(max_length=255)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    product_company = models.CharField(max_length=255)
    product_color = models.CharField(max_length=100)
    product_description = models.TextField()
    product_size = models.CharField(max_length=10, choices=SIZE_CHOICES, blank=True, null=True)
    product_material = models.CharField(max_length=50, choices=MATERIAL_TYPES)
    product_count = models.PositiveIntegerField(default=0)  # Stock count
    product_image = models.ImageField(upload_to=upload_to, blank=True, null=True)


    def __str__(self):
        return f"{self.product_name} - {self.product_company} ({self.product_type})"
