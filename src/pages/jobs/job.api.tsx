import axios, { AxiosResponse } from "axios";
import { Job } from "../../data/job";
import { BaseResponse } from "../../data/base-response";
import { BaseParam } from "../../data/base-param";
import HttpClient from "../../services/api";

export const GetJobs = async (pageSize: number, pageIndex: number) => {
    const queries: BaseParam = {
        pageIndex: pageIndex,
        pageSize: pageSize,
    };
    try {
        const data: AxiosResponse<BaseResponse<Job[]>> = await HttpClient.get("/jobs", { params: queries });
        return data.data;

    } catch (error) {
        return ConvertToBaseError<Job[]>(error);
    }
}

export const GetJob = async (id: number) => {
    try {
        const data: AxiosResponse<BaseResponse<Job>> = await HttpClient.get(`/jobs/${id}`);
        return data.data;

    } catch (error) {
        return ConvertToBaseError<Job>(error);
    }
}

export const AddJob = async (job: Job) => {
    try {
        const data: AxiosResponse<BaseResponse<Job>> = await HttpClient.post(`/jobs`, job);
        return data.data;

    } catch (error) {
        return ConvertToBaseError<Job>(error);
    }
}

export const DeleteJob = async (id: number) => {
    try {
        const data: AxiosResponse<BaseResponse<boolean>> = await HttpClient.delete(`/jobs/${id}`);
        return data.data;

    } catch (error) {
        return ConvertToBaseError<boolean>(error);
    }
}

export async function editPageDataLoader(params: { id: string }) {
    const { id } = params;
    return await GetJob(Number(id));
}

export function ConvertToBaseError<T>(error: any): BaseResponse<T> {
    if (axios.isAxiosError(error) && error.response) {
        if (error.response?.data === '') {
            const newErrorRes: BaseResponse<T> = {
                isSuccess: false,
                errorMessage: error.message
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