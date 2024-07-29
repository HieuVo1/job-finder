import { AxiosResponse } from "axios";
import { BaseResponse } from "../../data/base-response";
import HttpClient, { ConvertToBaseError, IdentityHttpClient } from "../../services/api";
import { UserData } from "../register/Register.api";
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
      "/users"
    );
    return data.data;
  } catch (error) {
    return ConvertToBaseError<UserData>(error);
  }
};
