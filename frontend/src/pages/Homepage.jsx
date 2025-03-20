import React from "react";
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

// Sample dress banner images (replace with actual image URLs)

const banners = [BannerImg1, BannerImg2, BannerImg3];

export default function HomePage() {
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

      {/* Featured Products */}
      <div className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {[1, 2, 3, 4].map((product) => (
            <div key={product} className="product-item">
              <div className="product-image">Image</div>
              <h3 className="product-name">Product {product}</h3>
              <p className="product-price">$49.99</p>
              <button className="buy-button">Buy Now</button>
            </div>
          ))}
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
