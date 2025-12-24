import axios from 'axios';
import {store} from '../store';
import { logout } from "../features/auth/authSlice";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // token temizle
            store.dispatch(logout()); // yoksa manuel temizle

            // login'e gönder
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;
