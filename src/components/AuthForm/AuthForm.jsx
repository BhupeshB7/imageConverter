import React, { useState } from "react";
import PasswordInput from "./PasswordInput.jsx";
import SocialLogin from "./SocialLogin.jsx";
import MobileInput from "../MobileInput.jsx";
import authService from "../../utils/appwriteConfig.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignUp = async () => {
    if (!username || !email || !password || !phone) {
      toast.error("Please fill all the fields.");
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      toast.error("Username can only contain letters and numbers.");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.error("Invalid email address.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    if (phone.length < 10) {
      toast.error("Mobile number must be at least 10 digits long.");
      return;
    }

    setLoading(true);
    try {
      let phoneNumber = `${countryCode}${phone}`;
      if (!/^\+\d{1,14}$/.test(phoneNumber)) {
        toast.error(
          "Phone number must start with a '+' and be no longer than 15 digits."
        );
        return;
      }

      const userAccount = await authService.createAccount({
        email,
        password,
        name: username,
        phone: phoneNumber,
      });

      if (userAccount) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        toast.success(
          "Sign up successful! Check your email for the verification link."
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(
        `Error during signup: ${error.message || "An unknown error occurred"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-center h-[100%] xs:w-[90%] w-[350px] m-auto p-3 rounded-md bg-[rgb(31,31,35)] register-shadow">
      <h2 className="text-md md:text-lg font-bold text-zinc-400">
        <span className="text-zinc-100 text-lg md:text-xl">Welcome,</span>
        Register to continue
      </h2>
      <div className="w-[90%]">
        <div className="mt-3">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-400 pb-1"
          >
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            name="username"
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400 pb-1"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <PasswordInput password={password} setPassword={setPassword} />
        <MobileInput
          phone={phone}
          setPhone={setPhone}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
        />
      </div>
      <button
        className="mb-1 px-12 py-2 rounded-full bg-zinc-950 text-white flex items-center justify-center"
        onClick={handleSignUp}
        disabled={loading}
      >
        {loading ? <span className="loader"></span> : "Sign Up"}
      </button>
      <SocialLogin />
      <p className="text-center text-sm text-zinc-500 pt-2">
        Already have an account?{" "}
        <Link to="/sign-in" className="text-zinc-200">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
