from django.urls import path
from .views import search_products, product_detail, top_carousel_products, top_products

urlpatterns = [
    path('api/search/', search_products, name='search_products'),
    path('api/product/<int:product_id>/', product_detail, name='product_detail'),
    path('api/top-carousel/', top_carousel_products, name='top_carousel_products'),
    path('api/top-products/', top_products, name='top_products'),
]
