import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../store/authSlice";
import authService from "../utils/appwriteConfig";
import SocailLogin from "../components/AuthForm/SocialLogin";
import PasswordInput from "../components/AuthForm/PasswordInput";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      await authService.deleteCurrentSession();

      const session = await authService.login({ email, password });

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData)); // Save user data to Redux store
          toast.success("Login successful!");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(
        `Error during login: ${error.message || "An unknown error occurred"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center justify-center h-[100%] xs:w-[90%] w-[350px] m-auto p-3 rounded-md bg-[rgb(31,31,35)] register-shadow">
      <h2 className="text-md md:text-lg font-bold text-zinc-400 mb-6">
        Login to continue{" "}
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-2 p-2 "
          />
        </div>
        <PasswordInput password={password} setPassword={setPassword} />
      </div>
      <button
        className="mt-5 mb-1 px-12 py-2 rounded-full bg-zinc-950 text-white flex items-center justify-center"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? <span className="loader"></span> : "Login"}
      </button>
      <SocailLogin />
      <p className="text-center text-sm text-zinc-500 pt-2">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-zinc-200">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
