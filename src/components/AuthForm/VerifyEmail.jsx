import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "../../utils/appwriteConfig.js";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    const verifyEmail = async () => {
      try {
        await authService.verifyEmail(userId, secret);
        toast.success("Email verified successfully! You can now log in.");
        navigate("/sign-in");
      } catch (error) {
        console.error("Error verifying email:", error);
        toast.error("Verification failed. Please try again.");
        navigate("/sign-up");
      }
    };

    if (userId && secret) {
      verifyEmail();
    } else {
      toast.error("Invalid verification link.");
      navigate("/sign-up");
    }
  }, [searchParams, navigate]);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
};

export default VerifyEmail;
