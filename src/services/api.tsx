import axios from "axios";
import TokenService from "./TokenService";
import { BaseResponse } from "../data/base-response";

const baseApi = "https://localhost:7093/api";
const identityApi = "https://localhost:7093/api";

export const IdentityHttpClient = axios.create({
    baseURL: identityApi,
});

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


export function ConvertToBaseError<T>(error: any): BaseResponse<T> {
    if (axios.isAxiosError(error) && error.response) {
        if (error.response?.data === '') {
            const newErrorRes: BaseResponse<T> = {
                isSuccess: false,
                errorMessage: error.message,
            }
            return newErrorRes;
        }

        return error.response?.data as BaseResponse<T>;
    }
    else {
        const newErrorRes: BaseResponse<T> = {
            isSuccess: false,
            errorMessage: error
        }
        return newErrorRes;
    }
}