import React, { useState, useEffect, useRef } from "react";
import Banner_1 from "../../assets/Video/Banner_1.mp4";
import Banner_2 from "../../assets/Video/Banner_2.mp4";
import Heading from "../common/Heading";
import Paragraph from "../common/Paragraph";
import Button from "../common/Button";

const Banner: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(Banner_1); // Track which video is playing
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null); // Use ref to control video

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Check screen size on initial render
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle video end to switch videos
  const handleVideoEnd = () => {
    if (currentVideo === Banner_1) {
      setCurrentVideo(Banner_2);
    } else {
      setCurrentVideo(Banner_1);
    }
  };

  return (
    <div className="denim-feature-section relative w-full h-screen overflow-hidden"> {/* Prevents overflow */}
      <a className="block h-full">
        <div className={`flex ${isSmallScreen ? "flex-col" : "md:flex-row"} items-stretch w-full h-full`}>
          {/* Conditionally render one or two videos based on screen size */}
          {isSmallScreen ? (
            <div className="flex-1 relative">
              <div className="clobber_video_container w-full h-full">
                <div className="clobber_preview_video_content clobber-preview_content-ambient w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    onEnded={handleVideoEnd}
                    playsInline
                    muted
                    className="clobber_preview_video w-full h-full object-cover"
                    src={currentVideo}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 relative">
                <div className="clobber_video_container w-full h-full">
                  <div className="clobber_preview_video_content clobber-preview_content-ambient w-full h-full">
                    <video
                      autoPlay
                      loop
                      playsInline
                      muted
                      className="clobber_preview_video w-full h-full object-cover"
                      src={Banner_1}
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="clobber_video_container w-full h-full">
                  <div className="clobber_preview_video_content clobber-preview_content-ambient w-full h-full">
                    <video
                      autoPlay
                      loop
                      playsInline
                      muted
                      className="clobber_preview_video w-full h-full object-cover"
                      src={Banner_2}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Centered Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4 md:px-0">
          <div className="text-center text-white max-w-lg">
            {/* Pass fontSize and color as props */}
            <Heading text="Explore Irish Goods" level={1} fontSize="clamp(2rem, 4vw, 5rem)" color="white" />
            <Paragraph text="Find authentic Irish clothing, accessories, and more" fontSize="clamp(1.5rem, 3vw, 2.5rem)" color="white" />
            {/* Button with white background and black text */}
            <br/>
            <Button text="Shop Now" bgColor="white" textColor="black" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default Banner;
