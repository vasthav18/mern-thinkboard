import axios from "axios";


// Prefer an explicit build-time API URL (Vite env var). If not provided,
// fall back to same-origin /api (useful when backend is served from the same host)
const VITE_API_URL = import.meta.env.VITE_API_URL;

const BASE_URL = VITE_API_URL ? VITE_API_URL.replace(/\/$/, '') : (import.meta.env.MODE === "development" ? "http://localhost:5001" : "");

const api = axios.create({
    baseURL: BASE_URL ? `${BASE_URL}/api` : '/api',
});

export default api;