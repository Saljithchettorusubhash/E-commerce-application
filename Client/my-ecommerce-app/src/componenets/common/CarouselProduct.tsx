import React, {  useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import ProductCard from '../layout/ProductCard';
import product_1 from '../../assets/ProductCarousel/product_1.jpg';
import product_2 from '../../assets/ProductCarousel/product_2.jpg';
import product_3 from '../../assets/ProductCarousel/product_3.jpg';
import product_4 from '../../assets/ProductCarousel/product_4.jpg';
import product_5 from '../../assets/ProductCarousel/product_5.jpg';
import product_6 from '../../assets/ProductCarousel/product_6.jpg';
import product_7 from '../../assets/ProductCarousel/product_7.jpg';

const products = [
  { name: 'Kobe 9 Elite Low Protro', category: 'Basketball Shoes', price: '€209.99', imageUrl: product_1 },
  { name: 'Nike SB Dunk Low Pro', category: 'Skate Shoes', price: '€129.99', imageUrl: product_2 },
  { name: 'Nike Air Max 90', category: 'Lifestyle Shoes', price: '€139.99', imageUrl: product_3 },
  { name: 'Nike Air Max 90', category: 'Lifestyle Shoes', price: '€139.99', imageUrl: product_4 },
  { name: 'Nike Air Max 90', category: 'Lifestyle Shoes', price: '€139.99', imageUrl: product_5 },
  { name: 'Nike Air Max 90', category: 'Lifestyle Shoes', price: '€139.99', imageUrl: product_6 },
  { name: 'Nike Air Max 90', category: 'Lifestyle Shoes', price: '€139.99', imageUrl: product_7 }
];

const CarouselProduct: React.FC = () => {
  const swiperRef = useRef<any>(null);

  return (
    <section className="carousel-section my-12 mx-4 lg:mx-16">
      {/* Carousel Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">New In This Week</h2>
        <div className="flex items-center">
          <a href="https://www.nike.com/gb/w/new-3n82y" className="px-4 py-2 bg-black text-white rounded mr-4" target="_self">
            Discover All
          </a>
          <button onClick={() => swiperRef.current.swiper.slidePrev()} className="carousel-btn prev-btn bg-gray-200 p-2 rounded-full">
            <svg viewBox="0 0 24 24" width="24px" height="24px" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15.525 18.966L8.558 12l6.967-6.967" />
            </svg>
          </button>
          <button onClick={() => swiperRef.current.swiper.slideNext()} className="carousel-btn next-btn bg-gray-200 p-2 rounded-full ml-2">
            <svg viewBox="0 0 24 24" width="24px" height="24px" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8.474 18.966L15.44 12 8.474 5.033" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Product Slider */}
      <Swiper
        ref={swiperRef}
        spaceBetween={10}  // Space between slides
        slidesPerView={3}  // Show 3 slides for large screens
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },    // Show 1 slide for mobile (below 768px)
          768: { slidesPerView: 2, spaceBetween: 15 },  // Show 2 slides for tablet (768px and above)
          1024: { slidesPerView: 3, spaceBetween: 20 }, // Show 3 slides for desktop (1024px and above)
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard
              name={product.name}
              category={product.category}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CarouselProduct;
