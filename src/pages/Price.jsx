import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Price = () => {
    const navigate = useNavigate();
  return (
    <motion.div
      className="mt-5 flex flex-col items-center justify-center p-6 bg-[#292928] text-amber-100 border-2 border-dashed border-amber-200 rounded-lg shadow-xl w-[90%] sm:w-[60%] md:w-[40%] lg:w-[35%] xl:w-[30%] m-auto"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Free Plan
      </h2>
      <p className="text-5xl md:text-6xl font-extrabold text-center mb-2">
        $0<span className="text-xl">/month</span>
      </p>
      <p className="text-lg text-center mb-6">
        Get unlimited access to our image converter tools without any hidden fees. Enjoy converting your images at no cost.
      </p>
      <ul className="text-md md:text-lg text-center space-y-2">
        <li>✔ Unlimited JPG to PNG and PNG to JPG conversions</li>
        <li>✔ Batch processing support</li>
        <li>✔ 256-bit SSL encryption for file security</li>
        <li>✔ Automatic file deletion after a few hours</li>
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-6 py-3 bg-amber-200 text-amber-900 rounded-lg font-semibold"
        onClick={() => navigate("/")}
      >
        Get Started for Free
      </motion.button>
    </motion.div>
  );
};

export default Price;
