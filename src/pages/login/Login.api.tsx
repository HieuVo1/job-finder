import { AxiosResponse } from "axios";
import { BaseResponse } from "../../data/base-response";
import HttpClient, { IdentityHttpClient } from "../../services/api";
import { UserData } from "../register/Register.api";
import { ConvertToBaseError } from "../jobs/job.api";
export interface TokenInfo {
  token?: string;
  expireIn?: number;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export const loginAsync = async (loginPayload: LoginPayload) => {
  try {
    const data: AxiosResponse<BaseResponse<TokenInfo>> =
      await IdentityHttpClient.post("/users/login", loginPayload);
    return data.data;
  } catch (error) {
    return ConvertToBaseError<TokenInfo>(error);
  }
};

export const GetUserById = async () => {
  try {
    const data: AxiosResponse<BaseResponse<UserData>> = await HttpClient.get(
      "/users/get-by-id"
    );
    return data.data;
  } catch (error) {
    return ConvertToBaseError<UserData>(error);
  }
};
