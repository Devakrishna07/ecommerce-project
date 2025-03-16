from django.contrib import admin
from django.utils.html import format_html
from .models import Product, ProductImage

class ProductImageInline(admin.TabularInline):  # Inline model for multiple images
    model = ProductImage
    extra = 2  # Default 2 image fields when adding a product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'company_name', 'product_type', 'price', 'color', 'display_image', 'created_at')
    list_filter = ('company_name', 'product_type', 'color')  # Sidebar filtering
    search_fields = ('product_name', 'company_name', 'description')  # Search functionality
    inlines = [ProductImageInline]  # Allows multiple images in the product form
    ordering = ['-created_at']  # Show latest products first
    fieldsets = (
        ("Product Details", {
            "fields": ("product_name", "company_name", "product_type", "price", "color", "description")
        }),
        ("Images", {
            "fields": ("display_image",),
            "classes": ("collapse",),  # Collapsible section for images
        }),
    )

    def display_image(self, obj):
        
        """Display the first image of the product in the admin panel."""
        first_image = obj.images.first()
        if first_image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit:cover;"/>', first_image.image.url)
        return "No Image"

    display_image.allow_tags = True
    display_image.short_description = "Preview"

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'image')  # Displays product name and image
