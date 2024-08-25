import React from "react";

const FileUploader = ({ onFileChange }) => (
  <div className="w-full flex flex-col items-center">
    <label className="text-amber-100 mb-2">Choose a file to upload:</label>
    <input
      type="file"
      onChange={onFileChange}
      className="home_image_input"
      accept="image/*"
    />
  </div>
);

export default FileUploader;
