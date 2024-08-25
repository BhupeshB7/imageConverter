// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaTrashAlt } from "react-icons/fa";
// import imageCompression from "browser-image-compression";
// import ProgressBar from "@ramonak/react-progress-bar";
// import Tool from "../components/Tool";
// import toast from "react-hot-toast";
// import Details from "../components/Details";

// const Home = () => {
//   const [file, setFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [format, setFormat] = useState("jpg");
//   const [convertedImage, setConvertedImage] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [conversionProgress, setConversionProgress] = useState(0);

//   const validTypes = ["image/jpeg", "image/png", "image/webp"];
//   const maxAge = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

//   useEffect(() => {
//     // Check for stored converted image
//     const storedImage = sessionStorage.getItem("convertedImage");
//     const storedTime = sessionStorage.getItem("conversionTime");

//     if (storedImage && storedTime) {
//       const now = new Date().getTime();
//       if (now - storedTime < maxAge) {
//         setConvertedImage(storedImage);
//       } else {
//         sessionStorage.removeItem("convertedImage");
//         sessionStorage.removeItem("conversionTime");
//       }
//     }
//   }, []);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];

//     if (!validTypes.includes(selectedFile.type)) {
//       toast.error("Invalid file type. Please upload a JPG, PNG, or WEBP file.");
//       return;
//     }

//     const maxSize = 50 * 1024 * 1024;
//     if (selectedFile.size > maxSize) {
//       toast.error("File size exceeds 50MB limit.");
//       return;
//     }

//     setFile(selectedFile);
//     setImagePreview(URL.createObjectURL(selectedFile));
//   };

//   const handleFormatChange = (e) => {
//     setFormat(e.target.value);
//   };

//   const handleDelete = () => {
//     const confirm = window.confirm(
//       "Are you sure you want to delete the converted image?"
//     );

//     if (!confirm) {
//       return;
//     }
//     setFile(null);
//     setImagePreview(null);
//     setConvertedImage(null);
//     setUploadProgress(0);
//     setConversionProgress(0);
//     sessionStorage.removeItem("convertedImage");
//     sessionStorage.removeItem("conversionTime");
//     toast.success("Converted image deleted successfully.");
//   };

//   const handleConvert = async () => {
//     if (!file) {
//       toast.error("Please upload a file.");
//       return;
//     }

//     try {
//       setConversionProgress(20);

//       const options = {
//         maxWidthOrHeight: 1920,
//         useWebWorker: true,
//         fileType: format,
//       };

//       const compressedFile = await imageCompression(file, options);

//       setConversionProgress(60);

//       const convertedBlob = new Blob([compressedFile], {
//         type: `image/${format}`,
//       });
//       const convertedUrl = URL.createObjectURL(convertedBlob);

//       setConvertedImage(convertedUrl);
//       setConversionProgress(100);

//       // Store in session storage with a timestamp
//       sessionStorage.setItem("convertedImage", convertedUrl);
//       sessionStorage.setItem("conversionTime", new Date().getTime());

//       toast.success("Image converted successfully.");
//     } catch (error) {
//       console.error("Error converting image:", error);
//       setConversionProgress(0);
//       toast.error(
//         "An error occurred during the conversion process. Please try again."
//       );
//     }
//   };

//   const handleDeleteConverted = () => {
//     const confirm = window.confirm(
//       "Are you sure you want to delete the converted image?"
//     );

//     if (!confirm) {
//       return;
//     }
//     sessionStorage.removeItem("convertedImage");
//     sessionStorage.removeItem("conversionTime");
//     setConvertedImage(null);
//     setConversionProgress(0);
//     toast.success("Converted image deleted successfully.");
//   };

//   return (
//     <>
//       <h1 className="text-2xl font-bold text-amber-100 text-center md:text-5xl m-6">
//         Free Online Image Converter
//       </h1>
//       <p className="text-md text-amber-50 text-center md:text-xl px-4 md:px-8">
//         Effortlessly convert your images online with our{" "}
//         <strong>completely free</strong> tool. Reliable image conversion at your
//         fingertips.
//       </p>

//       <section className="flex  flex-col items-center justify-center m-auto w-[80%] md:w-[70%] lg:w-[65%] space-y-4 md:space-y-0 md:space-x-4 border-2 border-dashed border-amber-200 rounded-lg p-4 mt-4 bg-[#5d5f4b]">
//         <div className="w-full flex flex-col items-center">
//           <label className="text-amber-100 mb-2">
//             Choose a file to upload:
//           </label>
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="home_image_input "
//             accept="image/*"
//           />
//         </div>

//         {uploadProgress > 0 && (
//           <ProgressBar
//             completed={uploadProgress}
//             className="mt-4"
//             bgColor="#facc15"
//           />
//         )}
//          <div className="flex flex-col md:flex-row gap-5 items-center mt-4">
//               <div className="pt-6">
//               {imagePreview && (
//           <motion.div
//             className="flex flex-col items-center mt-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="w-[250px] h-[300px] rounded-lg shadow-lg"
//             />
//             <div className="flex justify-between items-center w-full mt-4 mb-2">
//               <select
//                 value={format}
//                 onChange={handleFormatChange}
//                 className="p-2 rounded-lg bg-amber-200 text-amber-700"
//               >
//                 <option value="jpg">Convert to JPG</option>
//                 <option value="png">Convert to PNG</option>
//               </select>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleDelete}
//                 className="ml-4 px-4 py-2 text-red-500  rounded-lg font-semibold flex items-center"
//               >
//                 <FaTrashAlt className="mr-2" />
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//           <motion.button
//           onClick={handleConvert}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           // disabled={!file}
//           className="mt-6  px-6 py-3 bg-amber-900 text-amber-100 rounded-lg font-semibold"
//         >
//           Convert Image
//         </motion.button>
//               </div>
//               <div>
//               {conversionProgress > 0 && (
//           <ProgressBar
//             completed={conversionProgress}
//             className="mt-4 w-full"
//             bgColor="#facc15"
//           />
//         )}

//         {convertedImage && (
//           <div >

//             <img
//               src={convertedImage}
//               alt="Converted"
//               className="w-[250px] h-[300px] rounded-lg shadow-lg mt-4"
//             />
//             <div className="flex justify-between items-center w-full mt-4 mb-2 gap-3">
//               <a
//                 href={convertedImage}
//                 download={`converted-image.${format}`}
//                 className="mt-4 inline-block px-6 py-3 bg-amber-800 text-amber-100 rounded-lg font-semibold"
//               >
//                 Download
//               </a>
//               <button
//                 className="mt-4 text-red-500 text-xl"
//                 onClick={handleDeleteConverted}
//               >
//                 <FaTrashAlt className="mr-2" />
//               </button>
//             </div>
//           </div>
//         )}
//               </div>
//          </div>

//       </section>
//       <Details />
//       <Tool />
//     </>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import FileUploader from "./components/FileUploader";
import ImagePreview from "./components/ImagePreview";
import Progress from "./components/Progress";
import ConvertedImage from "./components/ConvertedImage";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import Details from "../components/Details";
import Tool from "../components/Tool";
import { motion } from "framer-motion";
import { FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
const Home = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [format, setFormat] = useState("jpg");
  const [convertedImage, setConvertedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [conversionTime, setConversionTime] = useState(null);
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxAge = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  useEffect(() => {
    const storedImage = sessionStorage.getItem("convertedImage");
    const storedTime = sessionStorage.getItem("conversionTime");

    if (storedImage && storedTime) {
      const now = new Date().getTime();
      if (now - storedTime < maxAge) {
        setConvertedImage(storedImage);
      } else {
        sessionStorage.removeItem("convertedImage");
        sessionStorage.removeItem("conversionTime");
      }
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Invalid file type. Please upload a JPG, PNG, or WEBP file.");
      return;
    }

    const maxSize = 50 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      toast.error("File size exceeds 50MB limit.");
      return;
    }

    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete the converted image?"
    );

    if (!confirm) {
      return;
    }
    toast.success("Converted image deleted successfully.");
    setFile(null);
    setImagePreview(null);
    setConvertedImage(null);
    setUploadProgress(0);
    setConversionProgress(0);
    sessionStorage.removeItem("convertedImage");
    sessionStorage.removeItem("conversionTime");
    setConversionTime(null);
  };

  const handleConvert = async () => {
    if (!file) {
      toast.error("Please upload a file.");
      return;
    }
    setConversionTime(null);
    const startTime = Date.now();
    try {
      setConversionProgress(20);

      const options = {
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: format,
      };

      const compressedFile = await imageCompression(file, options);

      setConversionProgress(60);

      const convertedBlob = new Blob([compressedFile], {
        type: `image/${format}`,
      });
      const convertedUrl = URL.createObjectURL(convertedBlob);

      setConvertedImage(convertedUrl);
      setConversionProgress(100);

      sessionStorage.setItem("convertedImage", convertedUrl);
      sessionStorage.setItem("conversionTime", new Date().getTime());
      const endTime = Date.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
      setConversionTime(timeTaken);
      toast.success("Image converted successfully.");
    } catch (error) {
      console.error("Error converting image:", error);
      setConversionProgress(0);
      toast.error(
        "An error occurred during the conversion process. Please try again."
      );
    }
  };

  const handleDeleteConverted = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete the converted image?"
    );

    if (!confirm) {
      return;
    }
    sessionStorage.removeItem("convertedImage");
    sessionStorage.removeItem("conversionTime");
    setConvertedImage(null);
    setConversionProgress(0);
    toast.success("Converted image deleted successfully.");
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-amber-100 text-center md:text-5xl m-6">
        Free Online Image Converter
      </h1>
      <p className="text-md text-amber-50 text-center md:text-xl px-4 md:px-8">
        Effortlessly convert your images online with our{" "}
        <strong>completely free</strong> tool. Reliable image conversion at your
        fingertips.
      </p>

      <section className="flex flex-col  justify-center m-auto w-[80%] md:w-[70%] lg:w-[65%] space-y-4 md:space-y-0 md:space-x-4 border-2 border-dashed border-amber-200 rounded-lg p-4 mt-4 bg-[#5d5f4b]">
        <Link
          to="/url-to-image"
          className="flex flex-row items-center justify-end mt-4 gap-2"
        >
          <h5 className="text-lg text-yellow-200 p-1">from url </h5>
          <FaLink className="text-yellow-200 text-2xl" />
        </Link>

        <FileUploader onFileChange={handleFileChange} />

        <Progress progress={uploadProgress} color="#facc15" />

        <div className="flex flex-col md:flex-row gap-5 items-center mt-4">
          <div className="pt-6">
            <ImagePreview
              imagePreview={imagePreview}
              format={format}
              onFormatChange={handleFormatChange}
              onDelete={handleDelete}
            />
            <motion.div
              onClick={handleConvert}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-amber-900 text-amber-100 rounded-lg font-semibold w-[200px]"
            >
              Convert Image
            </motion.div>
          </div>

          <div>
            <Progress progress={conversionProgress} color="#facc15" />
            <ConvertedImage
              convertedImage={convertedImage}
              format={format}
              onDelete={handleDeleteConverted}
               conversionTime={conversionTime}
            />
          </div>
        </div>
      </section>

      <Details />
      <Tool />
    </>
  );
};

export default Home;
