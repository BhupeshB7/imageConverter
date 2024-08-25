import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import toast from "react-hot-toast";
import Tool from "../components/Tool";
import Details from "../components/Details";
import FileUploader from "./components/FileUploader";

const JPGPNG = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [convertedImage, setConvertedImage] = useState(null);
  const [error, setError] = useState(null);
  const [conversionTime, setConversionTime] = useState(null);

  useEffect(() => {
    const storedImage = sessionStorage.getItem("uploadedImage");
    if (storedImage) {
      setImagePreview(storedImage);
    }
  }, []);

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile && newFile.type === "image/jpeg") {
      setFile(newFile);
      setImagePreview(URL.createObjectURL(newFile));
      sessionStorage.setItem("uploadedImage", URL.createObjectURL(newFile));
    } else {
      setError("Please select a JPG image.");
    }
  };

  const handleConvert = () => {
    if (!file) {
      setError("Please select a JPG file first.");
      return;
    }

    setError(null);
    setConversionProgress(0);
    setConversionTime(null);

    const startTime = Date.now();

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size to image dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        try {
          const pngUrl = canvas.toDataURL("image/png");
          setConvertedImage(pngUrl);
          setConversionProgress(100);

          const endTime = Date.now();
          const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Convert to seconds
          setConversionTime(timeTaken);

          sessionStorage.setItem("convertedImage", pngUrl);
        } catch (e) {
          setError("Failed to convert image.");
        }
      };

      img.onerror = () => {
        setError("Failed to load image.");
      };
    };

    reader.onerror = () => {
      setError("Failed to read file.");
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete the uploaded image?"
    );
    if (!confirm) return;
    setFile(null);
    setImagePreview(null);
    setConvertedImage(null);
    setError(null);
    setConversionTime(null);
    sessionStorage.removeItem("uploadedImage");
    sessionStorage.removeItem("convertedImage");
    setConversionProgress(0);
    toast.success("Image deleted successfully.");
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center m-auto w-[80%] md:w-[70%] lg:w-[65%] space-y-4 rounded-lg p-4 mt-4 bg-[#2f3028]">
        <Helmet>
          <title>Convert JPG to PNG | Simple Image Converter</title>
          <meta
            name="description"
            content="Convert your JPG images to PNG format easily with our tool. Fast and user-friendly."
          />
          <meta
            name="keywords"
            content="JPG to PNG, image converter, convert JPG to PNG, online image converter"
          />
          <meta
            property="og:title"
            content="Convert JPG to PNG | Simple Image Converter"
          />
          <meta
            property="og:description"
            content="Convert your JPG images to PNG format easily with our tool. Fast and user-friendly."
          />
          <meta
            property="og:image"
            content="URL_TO_AN_IMAGE_REPRESENTING_YOUR_TOOL"
          />
          <meta property="og:url" content="YOUR_PAGE_URL" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Your Name or Company" />
          <link rel="canonical" href="YOUR_PAGE_URL" />
        </Helmet>

        <section className="flex flex-col items-center justify-center m-auto w-[80%] md:w-[70%] lg:w-[65%] space-y-4 md:space-y-0 md:space-x-4  rounded-lg p-4 mt-4 ">
          <FileUploader onFileChange={handleFileChange} />
        </section>
        <section className="flex flex-row justify-center items-center mt-4 gap-5">
          <div>
            {imagePreview && (
              <motion.div
                className="flex flex-col items-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-[250px] h-[300px] rounded-lg shadow-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConvert}
                  className="mt-6 px-6 py-3 bg-amber-900 text-amber-100 rounded-lg font-semibold"
                >
                  Convert to PNG
                </motion.button>
              </motion.div>
            )}
          </div>
          <div>
            {conversionProgress > 1 && (
              <ProgressBar
                completed={conversionProgress}
                className="mt-4 w-full md:w-[95%]"
                bgColor="#facc15"
                height="18px"
                labelColor="#000"
              />
            )}

            {convertedImage && (
              <div className="mt-1">
                <img
                  src={convertedImage}
                  alt="Converted"
                  className="w-[250px] h-[300px] rounded-lg shadow-lg mt-4"
                />
                <div className="flex justify-between items-center w-full mt-4 mb-2 gap-3">
                  <a
                    href={convertedImage}
                    download="converted-image.png"
                    className="mt-1 inline-block px-6 py-3 bg-amber-800 text-amber-100 rounded-lg font-semibold"
                  >
                    Download PNG
                  </a>
                  <button
                    className="mt-4 text-red-500 text-xl"
                    onClick={handleDelete}
                  >
                    <FaTrashAlt className="mr-2" />
                  </button>
                </div>

                <p className="text-md text-amber-200">
                  Total time taken: {conversionTime} seconds
                </p>
              </div>
            )}
          </div>
        </section>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </section>
      <Details />
      <Tool />
    </>
  );
};

export default JPGPNG;
