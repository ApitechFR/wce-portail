import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Auth mode: 'keycloak' ou 'none'
const authMode = import.meta.env.VITE_AUTH_MODE;

// Token keycloak (si mode keycloak)
let keycloakAccessToken: string | null = null;

export const setKeycloakToken = (token: string | null) => {
  keycloakAccessToken = token;
};

api.interceptors.request.use(
  config => {
    if (authMode === 'keycloak' && keycloakAccessToken) {
      config.headers.Authorization = `Bearer ${keycloakAccessToken}`;
    } else if (authMode === 'none') {
      const localToken = localStorage.getItem('auth');
      if (localToken) {
        config.headers.Authorization = `Bearer ${localToken}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
