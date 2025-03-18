from django.contrib import admin
from django.utils.html import format_html
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'product_name', 'product_type', 'product_price', 'product_company', 'product_count', 'product_image_preview')
    search_fields = ('product_name', 'product_type', 'product_company', 'product_description')
    list_filter = ('product_type', 'product_company', 'product_color')
    ordering = ('-id',)
    readonly_fields = ('id', 'product_image_preview')  # Ensure this is included correctly
    list_per_page = 20

    fieldsets = (
        ("Product Details", {
            "fields": ("product_name", "product_type", "product_price", "product_company", "product_description")
        }),
        ("Specifications", {
            "fields": ("product_color", "product_size", "product_material", "product_count")
        }),
        ("Images", {
            "fields": ("product_image",)  # Change 'product_images' to 'product_image'
        }),
    )

    def product_image_preview(self, obj):
        """Show image preview in the admin panel"""
        if obj.product_image:
            return format_html('<img src="{}" width="100" height="100" />', obj.product_image.url)
        return "No Image"

    product_image_preview.short_description = "Preview"
