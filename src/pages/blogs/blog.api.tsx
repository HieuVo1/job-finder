import { AxiosResponse } from "axios";
import { BaseResponse } from "../../data/base-response";
import HttpClient from "../../services/api";
import { ConvertToBaseError } from "../jobs/job.api";
import { PaginatedResult } from "../../data/paginated-result";
import { Blog } from "../../data/blog";
import { ListRequest } from "../../data/list-request";

export const getAllBlogAsync = async (
  requestParams: ListRequest,
  tags: string,
  title: string
) => {
  try {
    const data: AxiosResponse<BaseResponse<PaginatedResult<Blog>>> =
      await HttpClient.get(`http://localhost:5074/api/blogs`, {
        params: {
          ...requestParams,
          tags,
          title,
        },
      });
    return data.data;
  } catch (error) {
    return ConvertToBaseError<PaginatedResult<Blog>>(error);
  }
};

export const getBlogByIdAsync = async (blogId: number) => {
  try {
    const data: AxiosResponse<BaseResponse<Blog>> = await HttpClient.get(
      `http://localhost:5074/api/blogs/${blogId}`
    );
    return data.data;
  } catch (error) {
    return ConvertToBaseError<Blog>(error);
  }
};

export const getBlogTagsAsync = async () => {
  try {
    const data: AxiosResponse<BaseResponse<string[]>> = await HttpClient.get(
      `http://localhost:5074/api/blogs/get-tags`
    );
    return data.data;
  } catch (error) {
    return ConvertToBaseError<string[]>(error);
  }
};

export const AddBlogAsync = async (blog: Blog) => {
  try {
    const data: AxiosResponse<BaseResponse<Blog>> = await HttpClient.post(
      `http://localhost:5074/api/blogs`,
      blog
    );
    return data.data;
  } catch (error) {
    return ConvertToBaseError<Blog>(error);
  }
};
