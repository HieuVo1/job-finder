import { AxiosResponse } from "axios";
import { ListRequest } from "../data/list-request";
import { BaseResponse } from "../data/base-response";
import { PaginatedResult } from "../data/paginated-result";
import { Blog } from "../data/blog";
import HttpClient, { ConvertToBaseError } from "./api";


export const getAllBlogAsync = async (
  requestParams: ListRequest,
  tags: string,
  title: string
) => {
  try {
    const data: AxiosResponse<BaseResponse<PaginatedResult<Blog>>> =
      await HttpClient.get(`/blogs`, {
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
      `/blogs/${blogId}`
    );
    return data.data;
  } catch (error) {
    return ConvertToBaseError<Blog>(error);
  }
};

export const getBlogTagsAsync = async () => {
  try {
    const data: AxiosResponse<BaseResponse<string[]>> = await HttpClient.get(
      `/blogs/get-tags`
    );
    return data.data;
  } catch (error) {
    return ConvertToBaseError<string[]>(error);
  }
};

export const AddBlogAsync = async (blog: Blog) => {
  try {
    const data: AxiosResponse<BaseResponse<Blog>> = await HttpClient.post(
      `/blogs`,
      blog
    );
    return data.data;
  } catch (error) {
    return ConvertToBaseError<Blog>(error);
  }
};
