import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorPage/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary fallback="Oops! 404 There was an error.">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);
