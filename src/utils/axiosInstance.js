import axios from "axios";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";


const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// Request interceptor: attaching token from zustand
instance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers["s-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) return Promise.reject(error);

    const { status } = error.response;
    const { logout } = useAuthStore.getState(); 

    if (status === 401) {
      toast.error("Session expired, logging you out...");
      logout();

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else if (status === 403) {
      toast.warn("Sorry, you're not allowed to perform this kind of operation");
    } else if (status === 402) {
      toast.warn("This account is not allowed, please contact your admin");
    }

    return Promise.reject(error);
  }
);

export default instance;
