import React from 'react'
import Banner from '../componenets/sections/Banner'
import Carousel from '../componenets/layout/Carousel'
import carousel_1 from '../assets/carousel/carousel_1.jpg'
import carousel_2 from '../assets/carousel/carousel_2.jpg'
import carousel_3 from '../assets/carousel/carousel_3.jpg'
import carousel_4 from '../assets/carousel/carousel_4.jpg'
import carousel_5 from '../assets/carousel/carousel_5.jpg'
import StoryTelling from '../componenets/sections/StoryTelling'
import CarouselProduct from '../componenets/common/CarouselProduct'

const slidesData = [
  {
    id: 1,
    title: 'Casual Summer Outfits',
    imgSrc: carousel_1,  // Removed the curly braces
  },
  {
    id: 2,
    title: 'Sporty & Streetwear Vibes',
    imgSrc: carousel_2,
  },
  {
    id: 3,
    title: 'Elegant Evening Wear',
    imgSrc: carousel_3,
  },
  {
    id: 4,
    title: 'Business Casual Collection',
    imgSrc: carousel_4,
  },
  {
    id: 5,
    title: 'Winter Outerwear',
    imgSrc: carousel_5,
  },
  
];



const Home:React.FC = () => {
  return (
    <div className='hoepage'>
        <Banner/>
        <Carousel slides={slidesData} heading='carousel'/>
        <CarouselProduct/>
        <StoryTelling/>
        <CarouselProduct/>



    </div>
  )
}

export default Home