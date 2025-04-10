import { API_URL_BASE } from "@/constant/Api";
import { create } from "zustand";
import axios from "axios";
import { AxiosInstance } from "@/constant/Axios.instance";
import Cookies from "js-cookie";

const useStore = create((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  role: null,
  type: "",
  phone: "",
  gender: "",
  username: "",

  register: async (username, phone, gender, role = "user") => {
    try {
      if (!username || !phone || !gender) {
        throw new Error("All fields are required");
      }
      const response = await AxiosInstance.post(`/auth/register`, {
        username,
        phone,
        gender,
        role,
      });
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(error);
    }
  },

  // OTP Verification
  VerifyOtp: async (phone, otp, type = "register") => {
    try {
      if (!phone || !otp) {
        throw new Error("All fields are required");
      }

      const response = await AxiosInstance.post(`/auth/verify-otp`, {
        phone: Number(phone),
        otp,
        type,
      });

      const { token, role, user } = response || {};

      if (!token) {
        throw new Error(response?.message || "Verification failed");
      }

      // Update state
      set({
        isAuthenticated: true,
        token,
        user,
        role,
      });

      Cookies.set("token", token, { expires: 2 });
      Cookies.set("user_role", role, { expires: 2 });
      localStorage.setItem("role_token", token);
      localStorage.setItem("user_role", role);
      localStorage.setItem("user_Data", JSON.stringify(user));

      if (typeof window !== "undefined") {
        if (role === "user") {
          window.location.href = "/user-dashboard/dashboard";
        } else if (user?.doctor_id !== null) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = `/auth/doctor-register/complete-profile?token=${token}&id=${user?.id}`;
        }
      }

      return response;
    } catch (error) {
      console.error("Verification error:", error.message || error);
      throw error; // Throw the error to be caught by the component
    }
  },

  // Resend OTP
  resendOtp: async (phone, type = "register") => {
    try {
      if (!phone) {
        throw new Error("Phone number is required");
      }
      const response = await AxiosInstance.post(`${API_URL_BASE}/auth/resend`, {
        phone,
        type,
      });
      return response;
    } catch (error) {
      console.error("Resend OTP error:", error);
    }
  },

  // Fetch user info (on page load)
  foundMe: async () => {
    const token = localStorage.getItem("role_token");
    if (!token) {
      console.warn("User is not authenticated");
      return;
    }
    try {
      const response = await axios.get(`${API_URL_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { user } = response.data || {};
      if (user) {
        set({
          isAuthenticated: true,
          user,
        });
        localStorage.setItem("user", JSON.stringify(user));
      }
      return response;
    } catch (error) {
      console.error("Fetch user error:", error);
    }
  },

  // Login
  login: async (phone, type = "login") => {
    try {
      if (!phone) {
        throw new Error("Phone number is required");
      }
      const response = await AxiosInstance.post(`${API_URL_BASE}/auth/login`, {
        phone,
        type,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error("Login error:", error);
    }
  },

  // Logout
  logout: () => {
    set({
      isAuthenticated: false,
      token: null,
      user: null,
      role: null,
    });
    Cookies.remove("token");
    localStorage.removeItem("role_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_Data");
    window.location.href = "/login";
  },
}));

export default useStore;
