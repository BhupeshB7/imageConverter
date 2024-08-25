import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const DeleteButton = ({ onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="ml-4 px-4 py-2 text-red-500 rounded-lg font-semibold flex items-center"
  >
    <FaTrashAlt className="mr-2" />
  </motion.button>
);

export default DeleteButton;
