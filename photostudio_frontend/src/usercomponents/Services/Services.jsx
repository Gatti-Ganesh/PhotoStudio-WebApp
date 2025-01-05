import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Services = () => {
  const navigate =useNavigate();
  const {auth} =useSelector((store)=>store);
    const servicesData = [
        {
            id: 1,
            image: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg",
            title: "Wedding",
            time: "48H",
            price:"Price Varible",
        },
        {
            id: 2,
            image: "https://cdn.pixabay.com/photo/2022/08/17/15/46/family-7392843_1280.jpg",
            title: "Family",
            time: "5H",
            price:"Price Varible",
        },
        {
            id: 3,
            image: "https://danielerosephotography.com/wp-content/uploads/2021/05/Daniele-Rose-Photography-Camarillo-Beach-Maternity-Session-1024x771.jpg",
            title: "Maternity",
            time: "3H",
            price:"Price Varible",
        },
        {
            id: 4,
            image: "https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/qswxtzkfx86ykby637ob",
            title: "Commercial",
            time: "1H 30 min",
            price:"Price Varible",
        },
    ];
  return (
    <div className="m-5 flex flex-col justify-center items-center  " >
        
        <header className='m-5 p-5 text-5xl font-serif tracking-wider'>
            S E R V I C E S
        </header>
        <div className="m-5 flex flex-col justify-center items-center">
  {servicesData.map((data, index) => (
    <section
      key={index}
      className="m-5 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl"
    >
      {/* Left Image */}
      <div className="w-full md:w-1/2 h-auto overflow-hidden group flex justify-center">
        <img
          src={data.image} // Replace with your image URL
          alt="image"
          className="object-cover w-full h-auto max-h-[400px] transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-center items-start p-8 bg-white text-black w-full md:w-1/3 text-left">
        <h1 className="pb-3 text-3xl sm:text-xl md:text-2xl font-serif leading-tight">
          {data.title}
        </h1>
        <hr className="w-full border-black" />
        <p className="pt-3 text-sm tracking-widest text-gray-400 mb-4">
          {data.time}
        </p>
        <p className="text-sm tracking-widest text-gray-400 mb-4">
          {data.price}
        </p>
        {auth.user?<button
          onClick={() => navigate(`book-now?id=${data.id}`)}
          className="text-center border border-black p-2  md:w-1/2 hover:text-gray-300 transition"
        >
          Book Now
        </button>:<button
          onClick={() => navigate("/account/login")}
          className="text-center border border-black p-2  md:w-1/2 hover:text-gray-300 transition"
        >
          Book Now
        </button>
                         }
      </div>
    </section>
  ))}
</div>

    </div>
  )
}
