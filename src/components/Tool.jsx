import React from "react";
import { FaCompressArrowsAlt, FaFileImage, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
const Tool = () => {
  const tools = [
    {
      icon: <FaFileImage />,
      title: "JPG to PNG",
      url: "/jpg-to-png",
    },
    {
      icon: <FaLink />,
      title: "URL to Image",
      url: "/url-to-image",
    },
    {
      icon: <FaFileImage />,
      title: "PNG to JPG",
      url: "/png-to-jpg",
    },
    {
      icon: <FaCompressArrowsAlt />,
      title: "Image Resize",
      url: "/image-resize",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-amber-100 text-left md:text-3xl m-6 lg:flex-row gap-5  items-center justify-center  md:ml-36">
        Tools:
      </h1>
      <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-3 m-auto w-[90%] md:w-[70%] lg:w-[65%]">
        {tools.map((tool, index) => (
            <Link
              to={tool.url}
              key={index}
              className={`flex ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }  py-2 gap-3 items-center justify-between m-auto w-[100%] bg-zinc-950 hover:bg-zinc-900 home-card rounded-xl`}
            >
              <div className={` flex items-center justify-center text-4xl text-amber-200 bg-zinc-900 hover:bg-zinc-800 w-100 h-100 p-5  px-7 ${index % 2 === 0 ? "rounded-r-full" : "rounded-l-full"}`}>
                {tool.icon}
              </div>
              <h2 className="px-6 text-xl font-bold text-white text-center md:text-2xl">
                {tool.title}
              </h2>
            </Link>
        ))}
      </div>
    </>
  );
};

export default Tool;
