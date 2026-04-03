import axios from "axios";

const SESSION_KEY = "veyra_session";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        const session = JSON.parse(raw);
        if (session?.token) {
          config.headers.Authorization = `Bearer ${session.token}`;
        }
      } catch {
        // Bozuk session — sessizce geç
      }
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem(SESSION_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
