import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const scrollToTop = () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

scrollToTop();
window.addEventListener("pageshow", scrollToTop);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
