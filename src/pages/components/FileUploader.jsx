import React, { useState } from "react";
import { FaCloudDownloadAlt} from "react-icons/fa";

const FileUploader = ({ onFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileChange({ target: { files: e.dataTransfer.files } });
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      className={`w-[100%] flex flex-col items-center justify-center m-auto border-2 ${
        isDragging ? "border-red-500" : "border-dashed border-amber-200"
      } rounded-lg p-4  mt-4 bg-[#5d5f4b]`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
       <FaCloudDownloadAlt className="text-amber-100 text-center m-2 text-5xl md:text-7xl" />
      <label className="text-amber-300 mb-2 text-center m-2">
        Drag & drop a file here, or{" "}
        <br/>
        <div className="text-yellow-100 text-center p-2 mt-3 border border-dashed font-bold">Browse File</div>
      </label>
      <input
        type="file"
        onChange={onFileChange}
        className="home_image_input opacity-0 absolute"
        accept="image/*"
      />
    </div>
  );
};

export default FileUploader;
