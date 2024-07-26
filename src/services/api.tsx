import axios from "axios";
import TokenService from "./TokenService";

const baseApi = "https://localhost:7093/api";

const HttpClient = axios.create({
    baseURL: baseApi,
});

export const setHttpClientHeader = () => {
    const token = TokenService.getToken()?.token;
    HttpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const clearHttpClientHeader = () => {
    HttpClient.defaults.headers.common.Authorization = '';
}

setHttpClientHeader();

export default HttpClient