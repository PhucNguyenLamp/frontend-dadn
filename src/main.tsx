import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import { ThemeProviderWrapper } from "./contexts/ThemeContext"; // Import
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProviderWrapper>
        <RouterProvider router={router} />
      </ThemeProviderWrapper>
    </AuthProvider>
  </StrictMode>
);
