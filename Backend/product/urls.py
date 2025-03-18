from django.urls import path
from .views import top_four_product_images, search_or_latest_products, product_detail

urlpatterns = [
    path('top/', top_four_product_images, name='top-four-products'),
    path('search/', search_or_latest_products, name='search-or-latest'),
    path('detail/<int:product_id>/', product_detail, name='product-detail'),
]
