import React from "react";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";

const formats = ["jpg", "jpeg", "png", "webp", "gif", "bmp", "svg"];

const ImagePreview = ({ imagePreview, format, onFormatChange, onDelete }) =>
  imagePreview && (
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
      <div className="flex justify-between items-center w-full mt-4 mb-2">
        <div className="flex mt-2 w-[300px] flex-wrap justify-center items-center">
          {formats.map((fmt) => (
            <button
              key={fmt}
              onClick={() => onFormatChange(fmt)}
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
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDelete}
         className="p-3 bg-red-300  rounded-full flex justify-center items-center"
        >
          <FaTrashAlt className="text-red-900 text-xl" />
        </motion.div>
      </div>
    </motion.div>
  );

export default ImagePreview;
