import axios from "axios";

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

// Request interceptor: attach token as s-token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["s-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       if (isTokenExpired(token)) {
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//         throw new axios.Cancel("Token expired");
//       }
//       config.headers["s-token"] = token;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// ); 

// Response interceptor: handle 401/403


instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;