import React from 'react'
import { FaFileImage, FaCog, FaLock } from "react-icons/fa";
const Details = () => {
    const cardContent = [
        {
          icon: <FaFileImage />,
          title: "JPG to PNG / PNG to JPG",
          description:
            "Easily convert JPG to PNG and vice versa. Supports over 500+ formats, including RAW files.",
        },
        {
          icon: <FaCog />,
          title: "Best Image Converter",
          description:
            "High-quality image conversion with batch processing. Perfect for all your needs.",
        },
        {
          icon: <FaLock />,
          title: "Free & Secure",
          description:
            "Free and secure conversion with 256-bit SSL encryption. Files auto-delete after a few hours.",
        },
      ];
  return (
   
    <section className="mt-5">
    <div className="flex flex-col lg:flex-row gap-10 items-center justify-center m-auto w-[80%] md:w-[70%] lg:w-[65%]">
      {cardContent.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 items-center justify-center m-auto w-[100%] home-card rounded-xl"
        >
          <div className="flex items-center justify-center text-4xl text-amber-100">
            {item.icon}
          </div>
          <h2 className="text-xl font-bold text-amber-100 text-center md:text-2xl">
            {item.title}
          </h2>
          <p className="text-md text-amber-50 text-center px-4">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  </section>
  )
}

export default Details