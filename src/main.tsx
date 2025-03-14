import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import { ThemeProviderWrapper } from "./contexts/ThemeContext"; // Import
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";

// use .env
const clientId = import.meta.env.VITE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <ThemeProviderWrapper>
          <RouterProvider router={router} />
        </ThemeProviderWrapper>
      </AuthProvider>
    </GoogleOAuthProvider>
   </StrictMode>
);
