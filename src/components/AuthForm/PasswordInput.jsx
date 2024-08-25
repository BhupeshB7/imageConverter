// src/components/AuthForm/PasswordInput.js
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="mt-3">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-400 pb-1"
        >
          Password
        </label>
        <div className="flex flex-col items-center justify-center relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            className="absolute right-2 top-1 p-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible className="text-zinc-300" /> : <AiOutlineEye className="text-zinc-300" />}
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
