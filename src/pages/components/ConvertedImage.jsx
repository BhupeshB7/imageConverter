import React from "react";
import DeleteButton from "./DeleteButton";
const ConvertedImage = ({ convertedImage, format, onDelete,conversionTime }) =>
  convertedImage && (
    <div>
      <img
        src={convertedImage}
        alt="Converted"
        className="w-[250px] h-[300px] rounded-lg shadow-lg mt-4"
      />
      <div className="flex justify-between items-center w-full mt-4 mb-2 gap-3">
        <a
          href={convertedImage}
          download={`converted-image.${format}`}
          className="mt-4 inline-block px-6 py-3 bg-amber-800 text-amber-100 rounded-lg font-semibold"
        >
          Download
        </a>
        <button className="mt-4 text-red-500 text-xl" onClick={onDelete}>
          <DeleteButton onClick={onDelete} />
        </button>
        <p className="text-md text-amber-200">
          Total time taken: {conversionTime} seconds
        </p>
      </div>
    </div>
  );

export default ConvertedImage;
