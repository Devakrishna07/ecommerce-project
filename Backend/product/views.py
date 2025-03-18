from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET'])
def top_four_product_images(request):
    """
    Get the first image of the top 4 products where product_count > 1.
    """
    products = Product.objects.filter(product_count__gt=1).order_by('-id')[:4]
    serialized_products = ProductSerializer(products, many=True).data

    # Extract only the first image from product_images
    product_images = [
        {
            "product_name": product["product_name"],
            "first_image": product["product_images"][0] if product["product_images"] else None
        }
        for product in serialized_products
    ]

    return Response(product_images)

@api_view(['GET'])
def search_or_latest_products(request):
    """
    Search products by name, type, company, or description.
    If no search is made, return the first image of the last 5 products.
    """
    search_query = request.GET.get('q', None)

    if search_query:
        # Filter products if a search query is provided
        products = Product.objects.filter(
            Q(product_name__icontains=search_query) |
            Q(product_type__icontains=search_query) |
            Q(product_company__icontains=search_query) |
            Q(product_description__icontains=search_query)
        )
    else:
        # Fetch the last 5 products if no search is made
        products = Product.objects.order_by('-id')[:5]

    serialized_products = ProductSerializer(products, many=True).data

    # Extract only the first image
    product_images = [
        {
            "product_name": product["product_name"],
            "first_image": product["product_images"][0] if product["product_images"] else None
        }
        for product in serialized_products
    ]

    return Response(product_images)

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET'])
def product_detail(request, product_id):
    """
    Fetches product details from the database and returns them in JSON format.
    If `product_count < 1`, returns a "Product not available" message.
    """
    product = get_object_or_404(Product, id=product_id)

    if product.product_count < 1:
        return Response({"message": "Product not available"}, status=404)

    # Serialize the product details
    serialized_product = ProductSerializer(product).data
    return Response(serialized_product)
