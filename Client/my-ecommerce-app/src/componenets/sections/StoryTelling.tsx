import React, { useState, useEffect, useRef } from "react";
import StoryImage from "../../assets/HomePage/Story.jpg"; // Your image file

const StoryTelling: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Handle window resize to adjust scaling dynamically
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll position for animation
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  // Intersection Observer to detect when the section is in and out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      { threshold: viewportWidth > 1024 ? 0.8 : viewportWidth > 768 ? 0.7 : 0.6 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [viewportWidth]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate background size based on scroll
  const getBackgroundSize = () => {
    if (!isInView) return "calc(100% - 10rem)";
    const initialSize = viewportWidth > 1024 ? 90 : viewportWidth > 768 ? 85 : 80;
    const maxSize = 110;
    const scrollRange = viewportWidth > 1024 ? 400 : 300;
    const size = initialSize + (scrollPosition / scrollRange) * (maxSize - initialSize);
    return `${Math.min(size, maxSize)}%`;
  };

  return (
    <section ref={sectionRef} className="relative h-[100vh] w-full px-4 sm:px-8 mt-10 mb-10">
      {/* Background Image with Scaling Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center w-full h-full transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${StoryImage})`,
          backgroundSize: getBackgroundSize(),
          backgroundPosition: "center",
        }}
      ></div>

      {/* Text Overlay */}
      <div
        className={`relative z-10 flex flex-col justify-center items-center h-full text-white text-center transition-all duration-700 ease-in-out transform ${
          isInView ? "opacity-100 visible scale-100 translate-y-0" : "opacity-0 invisible scale-90 translate-y-5"
        }`}
      >
        <h2 className="text-4xl sm:text-5xl font-bold">Our Story</h2>
        <p className="mt-4 text-lg sm:text-xl">Stuff your universe in them and go</p>

        <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 mt-6">
          <button className="px-6 py-2 bg-white text-black rounded-md">Read More</button>
          <button className="px-6 py-2 bg-white text-black rounded-md">Shop Now</button>
          <button className="px-6 py-2 bg-white text-black rounded-md">Contact Us</button>
          <button className="px-6 py-2 bg-white text-black rounded-md">Subscribe</button>
        </div>
      </div>
    </section>
  );
};

export default StoryTelling;
