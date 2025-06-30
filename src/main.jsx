import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App.jsx";
import TokenContextProvider from "./Context/TokenContext.jsx";
import { GenderProvider } from "./Context/GenderContext.jsx";
import { Toaster } from "react-hot-toast";
import { PhotoProvider } from "./Context/photoContext.jsx";

createRoot(document.getElementById("root")).render(
  <TokenContextProvider>
    <GenderProvider>
      <PhotoProvider>
        <StrictMode>
          <App />
          <Toaster />
        </StrictMode>
      </PhotoProvider>
    </GenderProvider>
  </TokenContextProvider>
);
