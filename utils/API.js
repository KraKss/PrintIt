import axios from 'axios';

export const API = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_API_ROUTE,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 5000,
});

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers['Authorization'];
    }
};

export const fetcher = url => API.get(url).then(res => res.data);

export default {API, fetcher, setAuthToken};
