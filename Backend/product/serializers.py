import base64
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    product_images = serializers.ListField(
        child=serializers.CharField(), required=False  # Accepts multiple Base64 images as a list
    )

    def validate_product_images(self, value):
        """ Validate each image in the list to ensure it's a valid Base64 string. """
        for image in value:
            try:
                base64.b64decode(image)  # Decode Base64 image
            except Exception:
                raise serializers.ValidationError("Invalid image format. Each image must be a valid Base64 string.")
        return value

    class Meta:
        model = Product
        fields = '__all__'
