import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import api from "../api/axios";
import {jwtDecode} from "jwt-decode";

export default function LoginButton() {
  const navigate = useNavigate();
  const handleSuccess = async (tokenResponse) => {
    const { credential } = tokenResponse;
    await api.post(
      "/auth/google/token",
      { credential },
      { headers: { "Content-Type": "application/json" } }
    );
    localStorage.setItem("credential", credential);
    navigate("/");
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
