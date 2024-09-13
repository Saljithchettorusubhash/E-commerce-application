import React, { useState } from 'react';
import Heading from '../common/Heading'; // Reusable Heading component
import Paragraph from '../common/Paragraph'; // Reusable Paragraph component

interface Slide {
  id: number;
  title: string;
  imgSrc: string;
  link?: string;
}

interface CarouselProps {
  slides: Slide[];
  heading: string;
  autoPlay?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  heading = 'Irish Goods',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Next and Previous Slide Handlers
  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="carousel-container relative w-full py-8 overflow-hidden">
      {/* Carousel Header */}
      <div className="text-center mb-12">
        {/* Reusable Heading component */}
        <Heading text={heading} level={2} color="black" fontSize="clamp(2rem, 4vw, 3rem)" />
        
        {/* Reusable Paragraph component */}
        <Paragraph text="Explore the finest collection of Irish authentic native goods from Irish Clobber" fontSize="clamp(1rem, 2vw, 1.5rem)" color="gray-700" />
        
        {/* Reusable Button component */}
        <button className="mt-6 px-6 py-2 bg-gray-800 text-white uppercase font-semibold rounded hover:bg-gray-700">
          Shop
        </button>
      </div>

      {/* Slider Content */}
      <div
        className="slider flex transition-transform duration-500 ease-in-out list-none"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Adjusted for 1 slide per view on smaller screens
        }}
      >
        {slides.map((slide, index) => (
          <li
            key={slide.id}
            className={`slide item-${index} flex-shrink-0 w-full md:w-1/1 lg:w-1/3 px-4`} // Adjusted for responsiveness
            aria-hidden={index !== currentIndex}
            style={{ transition: 'transform 0.5s ease-in-out' }}
          >
            <figure className="relative">
              <div className="media-container overflow-hidden rounded-lg">
                <img
                  className="w-full h-[420px] sm:h-[600px] md:h-[720px] object-cover"
                  src={slide.imgSrc}
                  alt={slide.title}
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent text-white">
                <h3 className="text-xl font-bold">{slide.title}</h3> {/* Increased font size */}
              </div>
              {slide.link && (
                <a href={slide.link} aria-label={slide.title} className="absolute inset-0"></a>
              )}
            </figure>
          </li>
        ))}
      </div>

      {/* Arrow Navigation */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button
          className={`bg-white p-2 rounded-full shadow-md hover:bg-gray-200 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="24px" height="24px" fill="none">
            <path stroke="currentColor" strokeWidth="1.5" d="M15.525 18.966L8.558 12l6.967-6.967"></path>
          </svg>
        </button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button
          className={`bg-white p-2 rounded-full shadow-md hover:bg-gray-200 ${currentIndex >= slides.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={nextSlide}
          disabled={currentIndex >= slides.length - 1}
        >
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="24px" height="24px" fill="none">
            <path stroke="currentColor" strokeWidth="1.5" d="M8.474 18.966L15.44 12 8.474 5.033"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
