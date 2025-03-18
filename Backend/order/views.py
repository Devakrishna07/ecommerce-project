from django.shortcuts import render

# Create your views here.
import random
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Order
from Product.models import Product
from .serializers import OrderSerializer

@api_view(['POST'])
def create_order(request):
    """
    API to create an order. Fetches product data from `product_id` and sends OTP to customer email.
    """
    product_id = request.data.get('product_id')
    
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    customer_name = request.data.get('customer_name')
    customer_email = request.data.get('customer_email')
    quantity = int(request.data.get('quantity'))
    delivery_address = request.data.get('delivery_address')
    payment_method = request.data.get('payment_method')

    if not all([customer_name, customer_email, quantity, delivery_address, payment_method]):
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    total_price = product.price * quantity  # Assuming `price` field exists in `Product` model

    # Generate OTP
    otp = str(random.randint(100000, 999999))

    # Save order with OTP (unverified)
    order = Order.objects.create(
        product=product,
        customer_name=customer_name,
        customer_email=customer_email,
        quantity=quantity,
        total_price=total_price,
        delivery_address=delivery_address,
        payment_method=payment_method,
        otp=otp,
        is_verified=False  # Unverified until OTP is confirmed
    )

    # Send OTP via email
    send_mail(
        subject="Your Order OTP Confirmation",
        message=f"Your OTP for order confirmation is {otp}.",
        from_email="yourshop@example.com",
        recipient_list=[customer_email],
        fail_silently=False
    )

    return Response({"message": "Order created. OTP sent to email.", "order_id": order.id}, status=status.HTTP_201_CREATED)
