// import axios from "axios";
// import { toast } from "react-toastify";

// function isTokenExpired(token) {
//   if (!token) return true;
//   try {
//     const [, payload] = token.split(".");
//     const decoded = JSON.parse(atob(payload));
//     if (!decoded.exp) return false;
//     return decoded.exp * 1000 < Date.now();
//   } catch {
//     return true;
//   }
// }

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
// });

// // Request interceptor: attach token as s-token
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["s-token"] = token;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );



// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log(error)
//     if (error.response.status === 401) {
//       toast.error("Session expired, logging you out......")
//       localStorage.removeItem("token");

//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 2000);

//     } else if (error.response.status === 403) {
//       toast.warn("Sorry you're not allowed to perform this kind of operation")
//     }
//     else if (error.response.status === 402) {
//       toast.warn("This account is not allowed, please contact your admin")
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default instance;


import axios from "axios";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    if (!decoded.exp) return false;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Request interceptor: attaching token from zustand
instance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState(); // from zustand
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
    const { logout } = useAuthStore.getState(); // logout from zustand

    if (status === 401) {
      toast.error("Session expired, logging you out...");
      logout(); // clear zustand state

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
