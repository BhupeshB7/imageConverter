import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </StrictMode>
);
