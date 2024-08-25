import React, { useState, useEffect } from "react";
import authService from "../../utils/appwriteConfig";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

const SocialLogin = () => {
  const dispatch = useDispatch();
  const handleGoogleLogin = async () => {
    try {
      // Step 1: Delete any existing sessions
      await authService.deleteCurrentSession();
      console.log("Existing session deleted");

      // Step 2: Start the Google login process
      const response = await authService.loginWithGoogle();

      // Step 3: Fetch user details after login
      if (response) {
        const userDetails = await authService.getCurrentUser();
        console.log("User Details", userDetails);
        if (userDetails) {
          dispatch(login(userDetails));
        }
        toast.success(" successful!");
        navigate("/");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error(
        `Error during login: ${error.message || "An unknown error occurred"}`
      );
    }
  };
  useEffect(() => {
    // Fetch user details on component mount to check if the user is authenticated
    const fetchUserDetails = async () => {
      try {
        const userDetails = await authService.getCurrentUser();
        console.log("User Details after redirect", userDetails);
        dispatch(login(userDetails));
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };
  }, []);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center relative mt-5 w-[135%] -ml-11">
        <hr className="border-zinc-400 w-full" />
        <span className="absolute bg-[rgb(31,31,35)] px-2 text-zinc-500">
          Or
        </span>
      </div>
      <div
        onClick={handleGoogleLogin}
        className="mt-5 flex items-center justify-center rounded-lg border border-[#575757] px-4 py-2 text-sm font-medium text-zinc-300 shadow-sm bg-zinc-900 hover:bg-zinc-800 gap-5 cursor-pointer w-[230px]"
      >
        <img
          alt="google_icon"
          className="w-6 h-6"
          src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
        />
        <p>Google</p>
      </div>
    </div>
  );
};

export default SocialLogin;
