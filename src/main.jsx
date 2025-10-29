import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";

if (import.meta.env.DEV) {
  const { makeServer } = await import("./services/mockServer");
  makeServer({ environment: "development" });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
