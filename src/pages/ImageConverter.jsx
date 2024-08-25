import React, { useState, useEffect } from "react";
import axios from "axios";
import NProgress from "nprogress";
import { Helmet } from "react-helmet";
import "nprogress/nprogress.css";
import toast from "react-hot-toast";
import { FaDownload, FaExclamationTriangle, FaTrash } from "react-icons/fa";
import Tool from "../components/Tool";

const formats = ["jpg", "jpeg", "png", "webp", "gif", "bmp"]; // Add more formats if needed

const IMAGE_STORAGE_KEY = "convertedImages";
const IMAGE_STORAGE_EXPIRY_KEY = "convertedImagesExpiry";
const STORAGE_EXPIRY_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

const ImageConverter = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [convertedImages, setConvertedImages] = useState([]);
  const [format, setFormat] = useState("jpg");

  useEffect(() => {
    // Retrieve stored images if not expired
    const storedImages = sessionStorage.getItem(IMAGE_STORAGE_KEY);
    const expiryTime = sessionStorage.getItem(IMAGE_STORAGE_EXPIRY_KEY);

    if (storedImages && expiryTime && Date.now() < parseInt(expiryTime, 10)) {
      setConvertedImages(JSON.parse(storedImages));
    } else {
      // Clear expired data
      sessionStorage.removeItem(IMAGE_STORAGE_KEY);
      sessionStorage.removeItem(IMAGE_STORAGE_EXPIRY_KEY);
    }
  }, []);

  const isValidImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|png|webp|gif|bmp)$/) != null;
  };

  const handleConvert = async () => {
    if (!imageUrl) {
      toast.error("Please enter a valid image URL");
      return;
    }

    try {
      NProgress.start();

      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
        validateStatus: function (status) {
          return status === 200; // Resolve only if the status code is 200
        },
        timeout: 15000, // 15 seconds timeout
      });

      const contentType = response.headers["content-type"];
      if (!contentType || !contentType.includes("image")) {
        throw new Error("The URL does not point to an image.");
      }

      const blob = new Blob([response.data], { type: `image/${format}` });
      const convertedImageUrl = URL.createObjectURL(blob);

      const newConvertedImages = [
        ...convertedImages,
        { url: convertedImageUrl, format },
      ];

      // Save to session storage
      sessionStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(newConvertedImages));
      sessionStorage.setItem(IMAGE_STORAGE_EXPIRY_KEY, (Date.now() + STORAGE_EXPIRY_DURATION).toString());

      setConvertedImages(newConvertedImages);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Image not found. Please check the URL.");
      } else if (error.message.includes("URI malformed")) {
        toast.error(
          "The image URL is malformed. Please provide a correct URL."
        );
      } else if (error.message.includes("timeout")) {
        toast.error(
          "Request timed out. Please check your internet connection or try again later."
        );
      } else if (error.message.includes("URL does not point to an image")) {
        toast.error("The provided URL is not an image. Please check the URL.");
      } else {
        toast.error(
          "Failed to convert the image. Please check the URL or try a different image."
        );
      }
    } finally {
      NProgress.done();
      setImageUrl("");
    }
  };

  const handleDelete = (index) => {
    const updatedImages = convertedImages.filter((_, i) => i !== index);
    setConvertedImages(updatedImages);

    // Update session storage
    sessionStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(updatedImages));
  };

  const handleDownload = (url, format) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `converted_image.${format}`;
    link.click();
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setImageUrl(text);
    } catch (err) {
      toast.error("Failed to paste the URL. Please allow clipboard access.");
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center m-auto w-[80%] md:w-[70%] lg:w-[65%] space-y-4 md:space-y-0 md:space-x-4 rounded-lg p-4 mt-4">
      <Helmet>
        <title>
          Image Converter - Convert Images from URL to JPG, JPEG, PNG
        </title>
        <meta
          name="description"
          content="Convert images online from URL to JPG, JPEG, or PNG format. Easy and fast image conversion with download and delete options."
        />
        <meta
          name="keywords"
          content="image converter, URL image converter, JPG converter, JPEG converter, PNG converter, online image converter, image conversion tool"
        />
        <meta name="author" content="imageConverter" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Image Converter - Convert Images from URL to JPG, JPEG, PNG"
        />
        <meta
          property="og:description"
          content="Convert images online from URL to JPG, JPEG, or PNG format. Easy and fast image conversion with download and delete options."
        />
        <meta property="og:image" content="path_to_social_image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Image Converter - Convert Images from URL to JPG, JPEG, PNG"
        />
        <meta
          property="twitter:description"
          content="Convert images online from URL to JPG, JPEG, or PNG format. Easy and fast image conversion with download and delete options."
        />
        <meta property="twitter:image" content="path_to_social_image.jpg" />
      </Helmet>

      <h2 className="text-2xl font-bold text-amber-100 text-left md:text-xl m-6 lg:flex-row gap-5 items-center justify-center md:ml-36">
        Image Converter from URL: to JPG, JPEG, PNG and more
      </h2>
      <div className="flex flex-row items-center space-x-2 w-full md:w-[80%]">
        <input
          type="text"
          placeholder="Enter Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 rounded w-[80%]"
        />
        <button
          onClick={handlePaste}
          className="paste-button border p-2 rounded"
        >
          Paste
        </button>
      </div>
      <div className="flex  mt-2 w-[400px] flex-wrap justify-center items-center ">
        {formats.map((fmt) => (
          <button
            key={fmt}
            onClick={() => setFormat(fmt)}
            className={`border p-2 rounded ${
              format === fmt
                ? "bg-[#f8ffc3] text-[#2f3028]"
                : "bg-[#2f3028] text-gray-300"
            } transition-all duration-300 ease-in-out hover:bg-[#f8ffc3] hover:text-[#2f3028] w-[100px] border-2 border-[#444] hover:border-[#f8ffc3] m-2`}
          >
            {fmt.toUpperCase()}
          </button>
        ))}
      </div>
      <button
        onClick={handleConvert}
        className=" px-8 py-2 rounded-full mt-2 url-convert-button"
      >
        Convert
      </button>

      <div className="mt-4">
        <h3 className="text-xl mt-4  text-amber-100 text-center">
          Converted Images
        </h3>
        <div className="flex flex-col items-center justify-between w-full mt-2 space-y-2">
          {convertedImages.length > 0 ? (
            <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
              {convertedImages.map(({ url, format }, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 w-full"
                >
                 <div className="w-full h-[100%] shadow  shadow-zinc-700 p-4 m-3 flex flex-col justify-center items-center rounded-md">
                  <img src={url} alt={`Converted ${index}`} width="200" height="200" className="rounded-lg" />
                  <div className="pt-3 flex flex-row items-center justify-between gap-24">
                  <FaTrash    onClick={() => handleDelete(index)} className="text-red-600 text-2xl" />
                  <FaDownload onClick={() => handleDownload(url, format)} className="text-gray-400 text-2xl" />
                  </div>
                 </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center mt-2 gap-2">
              <FaExclamationTriangle className="text-gray-400 text-3xl" />
              <p className="text-center text-gray-500">
                Please enter a valid image URL for conversion
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    {/*  */}
    <Tool/>
    </>
  );
};

export default ImageConverter;
