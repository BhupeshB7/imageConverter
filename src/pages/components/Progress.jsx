import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const Progress = ({ progress, color }) => (
  progress > 0 && (
    <ProgressBar
      completed={progress}
      className="mt-4"
      bgColor={color}
    />
  )
);

export default Progress;
