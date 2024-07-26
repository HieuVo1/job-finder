import axios, { AxiosResponse } from "axios";
import { BaseResponse } from "../../data/base-response";
import HttpClient from "../../services/api";
import { UserData } from "../register/Register.api";
import { ConvertToBaseError } from "../jobs/job.api";
export interface TokenInfo {
    token?: string;
    expireIn?: number;
}

export interface SignUpPayload {
    username: string;
    password: string;
}

export const login = async (loginPayload: SignUpPayload) => {
    try {
        const data: AxiosResponse<BaseResponse<TokenInfo>> = await HttpClient.post("/users/login",
            loginPayload
        );
        return data.data;

    } catch (error) {
        return ConvertToBaseError<TokenInfo>(error);
    }
};

export const GetUserById = async () => {
    try {
        const data: AxiosResponse<BaseResponse<UserData>> = await HttpClient.get("/users");
        return data.data;

    } catch (error) {
        return ConvertToBaseError<UserData>(error);
    }
}