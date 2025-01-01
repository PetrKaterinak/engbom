import axios from 'axios';

window.axios = axios;

const baseUrl = import.meta.env.VITE_APP_URL + '/api';

let myAxios = window.axios.create({
    baseURL: baseUrl,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

myAxios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

myAxios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = '';
            window.location.replace('/login');
        }
        return Promise.reject(error);
    }
);

window.http = myAxios;