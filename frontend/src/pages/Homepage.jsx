import React from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Homepage.css";
import RelatedProducts from "./RelatedProduct";
import BannerImg1 from "../assets/images/Banner_img1.png";
import BannerImg2 from "../assets/images/Banner_img2.png";
import BannerImg3 from "../assets/images/Banner_img3.png";
import axios from "axios";
// Sample dress banner images (replace with actual image URLs)

const banners = [BannerImg1, BannerImg2, BannerImg3];

export default function HomePage() {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch data from Django backend
    axios
      .get("http://127.0.0.1:8000/Product/top/") // Change URL if needed
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to product details page
};
        
  return (
    <div className="homepage-container">
      {/* Banner Carousel */}
      <div className="banner-carousel">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
        >
          {banners.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Banner ${index + 1}`} className="banner-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Categories */}
      <div className="categories">
        {["Shirts", "Trousers", "Jackets", "Accessories"].map((category) => (
          <div key={category} className="category-item">{category}</div>
        ))}
      </div>
      {/* featured products */}
      <div className="featured-products">
      <h2 className="section-title">Featured Products</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="product-item">
              <div className="product-image">
                <img src={product.first_image} alt={product.product_name} />
              </div>
              <h3 className="product-name">{product.product_name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <button className="buy-button" onClick={() => handleProductClick(product.id)}>Buy Now</button>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>

      {/* Call to Action */}
      <div className="cta">Limited Offer! Get 20% off on your first order!</div>
      <RelatedProducts />
      {/* Footer */}
      <div className="footer">&copy; 2025 My E-Commerce. All Rights Reserved.</div>
    </div>
  );
}
