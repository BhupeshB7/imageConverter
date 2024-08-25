// src/hooks/useAuth.js
import { useState } from 'react';
import { createUser, sendEmailVerification, verifyEmail, loginWithGoogle } from '../utils/appwriteConfig';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async (username, email, password) => {
    setLoading(true);
    try {
      await createUser(email, password, username);
      await sendEmailVerification();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    setLoading(true);
    try {
      await verifyEmail(otp);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    signUp,
    verifyOtp,
    googleLogin,
    loading,
    error,
  };
};

export default useAuth;
