import axios, { AxiosResponse } from "axios";
import { BaseParam } from "../data/base-param";
import { BaseResponse } from "../data/base-response";
import { Job } from "../data/job";
import HttpClient, { ConvertToBaseError } from "./api";

export const GetJobsAsync = async (pageSize: number, pageIndex: number) => {
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

export const GetJobByIdAsync = async (id: number) => {
    try {
        const data: AxiosResponse<BaseResponse<Job>> = await HttpClient.get(`/jobs/${id}`);
        return data.data;

    } catch (error) {
        return ConvertToBaseError<Job>(error);
    }
}

export const AddJobAsync = async (job: Job) => {
    try {
        const data: AxiosResponse<BaseResponse<Job>> = await HttpClient.post(`/jobs`, job);
        return data.data;

    } catch (error) {
        return ConvertToBaseError<Job>(error);
    }
}

export const DeleteJobAsync = async (id: number) => {
    try {
        const data: AxiosResponse<BaseResponse<boolean>> = await HttpClient.delete(`/jobs/${id}`);
        return data.data;

    } catch (error) {
        return ConvertToBaseError<boolean>(error);
    }
}

export const UpdateJobAsync = async (job: Job) => {
    try {
        const data: AxiosResponse<BaseResponse<Job>> = await HttpClient.patch(`/jobs`, job);
        return data.data;

    } catch (error) {
        return ConvertToBaseError<Job>(error);
    }
}

