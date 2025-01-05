
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const About = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
        arrows:true
        
      };
      const feedbacks =[
        {
            message:"The photos turned out amazing- thank you for capturing our memories!The photos turned out amazing- thank you for capturing our memories!The photos turned out amazing- thank you for capturing our memories!",
            name:"Tom",
        },
        {
            message:"Fantastic experience! You truly made us feel comfortable and special.",
            name:"Rahul",
        },
        {
            message:"I couldn’t be happier with the photos – they exceeded my expectations!",
            name:"Priyanka",
        },
        {
            message:"You’ve captured the perfect moments, and we’re thrilled with the results.",
            name:"Venkatesh",
        },
        {
            message:"A wonderful experience from start to finish – I’ll definitely be back!",
            name:"Raju",
        },
      ];
  return (
    <div className="m-5 flex flex-col items-center  " >
        
        <header className='m-5 p-5 text-5xl font-serif tracking-wider'>
            A B O U T
        </header>
        <section className="m-5 relative flex flex-col-reverse md:flex-row items-center justify-between h-80%">
            {/* Left Content */}
            <div className=" flex flex-col justify-center  bg-white text-black w-full md:w-1/2  col-5 p-8 md:p-16 md:text-left text-center ">
                <h1 className="p-4 text-5xl md:text-4xl font-serif leading-tight">Meat the Photographer</h1>
                <p className='text-xl italic pb-2'>Hello, I’m Ganesh Gatti, a passionate photographer specializing in portraits, landscapes, weddings, etc. I have a deep love for capturing the beauty of moments and transforming them into timeless memories. With a keen eye for detail and a creative approach, I aim to tell stories through my lens, bringing emotions and ideas to life.</p>
                <p className='text-xl italic pb-2'>Whether working on events, portraits, or nature photography, or exploring new creative perspectives, my goal is to create images that resonate and inspire. Photography for me is not just about taking pictures; it’s about connecting with people and the world around me to create something meaningful and lasting.</p>
            </div>

      {/* Right Image */}
      <div className="w-full  md:w-1/2 relative overflow-hidden">
        <img
          src="https://images.squarespace-cdn.com/content/v1/56457d9be4b0ed8bf45381d2/1449362624783-W3AF7BZPANIR6N76SAFZ/shutterstock_275989319.jpg?format=2500w" // Replace with your image URL
          alt="Hero"
          className="object-cover "
        />
      </div>
     </section>
     <section className="m-5 relative  flex flex-col items-center justify-between">
        <div className="m-5 p-5 text-xl md:text-3xl font-serif">What Clients Are Saying</div>
        
      </section>
      <Carousel className="md:h-full w-full"
        autoPlay
        infiniteLoop
        interval={6000}
        showThumbs={false}       // Disable the thumbnails at the bottom
        showIndicators={false}   // Disable the navigation dots
        showStatus={false}     // Disable the "2 of 5" text
      >
        {feedbacks.map((item) => (
          <div key={item.name} className=" relative flex flex-col justify-center items-center px-2">
            <p className=" p-4 text-2xl md:text-4xl font-serif leading-tight text-center">{item.message}</p>
            <p className="py-5 font-semibold text-xl text-gray-400 text-center">{item.name}</p>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
