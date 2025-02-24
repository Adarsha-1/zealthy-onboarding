import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

export const createUser = (email, password) => {
    return axios.post(`${BASE_URL}/api/user`, {email, password});
};

export const updateUser = (userId, userData) => {
    return axios.patch(`${BASE_URL}/api/user/${userId}`, userData);
};

export const getConfig = () => {
    return axios.get(`${BASE_URL}/api/config`);
};

export const updateConfig = (configData) => {
    return axios.patch(`${BASE_URL}/api/config`, configData);
};

export const getUsers = () => {
    return axios.get(`${BASE_URL}/api/users`);
};