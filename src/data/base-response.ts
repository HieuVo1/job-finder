export interface BaseResponse<T> {
    data: T;
    isSuccess: boolean;
    errorMessage: string;
}