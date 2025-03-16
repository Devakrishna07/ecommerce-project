from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializer
from django.db.models import Q
from difflib import get_close_matches

# 1️⃣ API to get products similar to search query (handles spelling mistakes)
@api_view(['GET'])
def search_products(request):
    query = request.GET.get('q', '')  # Get query from URL params
    products = Product.objects.all()

    if query:
        product_names = list(products.values_list('product_name', flat=True))  # Get all product names
        close_matches = get_close_matches(query, product_names, n=5, cutoff=0.5)  # Find similar names

        # Filter products matching similar names
        products = products.filter(Q(product_name__in=close_matches) | Q(product_name__icontains=query))

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# 2️⃣ API to get details of a single product
@api_view(['GET'])
def product_detail(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

# 3️⃣ API to get the top 3 products for the carousel (based on latest added)
@api_view(['GET'])
def top_carousel_products(request):
    products = Product.objects.order_by('-created_at')[:3]  # Get latest 3 products
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# 4️⃣ API to get top 4 products for the product page
@api_view(['GET'])
def top_products(request):
    products = Product.objects.order_by('-created_at')[:4]  # Get latest 4 products
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
