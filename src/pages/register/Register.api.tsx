import axios, { AxiosResponse } from "axios";
import { BaseResponse } from "../../data/base-response";
import HttpClient from "../../services/api";
export interface UserData {
  id: number;
  username: string;
  email: string;
  address: string;
  fullName: string;
  role: Roles;
}

export enum Roles {
  Default,
  Admin,
}

export interface RegisterPayload {
  username: string;
  password: string;
  fullname?: string;
  email?: string;
}

export const registerAsync = async (request: RegisterPayload) => {
  try {
    const data: AxiosResponse<BaseResponse<UserData>> = await HttpClient.post(
      "/users/register",
      request
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response?.data as BaseResponse<UserData>;
    }
  }
};
