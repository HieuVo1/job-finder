import { AxiosResponse } from "axios";
import { BaseResponse } from "../../data/base-response";
import HttpClient from "../../services/api";
import { ConvertToBaseError } from "../jobs/job.api";
import { PaginatedResult } from "../../data/paginated-result";
import { Blog } from "../../data/blog";
import { ListRequest } from "../../data/list-request";

export const getAllBlog = async (requestParams: ListRequest, tags: string, title: string) => {
    try {
        const data: AxiosResponse<BaseResponse<PaginatedResult<Blog>>> = await HttpClient
            .get(`https://localhost:7093/api/blogs?pageIndex=${requestParams.pageIndex}&pageSize=${requestParams.pageSize}&tags=${tags}&title=${title}&sortField=${requestParams.sortField}&sortOrder=${requestParams.sortOrder}`);
        return data.data;

    } catch (error) {
        return ConvertToBaseError<PaginatedResult<Blog>>(error);
    }
};


export const getBlogById = async (blogId: number) => {
    try {
        const data: AxiosResponse<BaseResponse<Blog>> = await HttpClient.get(`https://localhost:7093/api/blogs/${blogId}`);
        return data.data;

    } catch (error) {
        return ConvertToBaseError<Blog>(error);
    }
}

export const getBlogTags = async () => {
    try {
        const data: AxiosResponse<BaseResponse<string[]>> = await HttpClient.get(`https://localhost:7093/api/blogs/get-tags`);
        return data.data;

    } catch (error) {
        return ConvertToBaseError<string[]>(error);
    }
}

