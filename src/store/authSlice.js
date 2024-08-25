import { createSlice } from "@reduxjs/toolkit";

// Utility function to load user data from localStorage
const loadUserData = () => {
  const savedUser = localStorage.getItem("userData");
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    const now = new Date().getTime();
    if (now < parsedUser.expiry) {
      return parsedUser.userData;
    }
    localStorage.removeItem("userData");
  }
  return null;
};

const saveUserData = (userData) => {
  const expiry = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; 
  localStorage.setItem("userData", JSON.stringify({ userData, expiry }));
};

// Initial state using the loadUserData function
const initialState = {
  status: !!loadUserData(),
  userData: loadUserData(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      saveUserData(action.payload);
    },
    logout: (state) => {
      state.status = false
      state.userData = null;
      localStorage.removeItem("userData"); 
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
