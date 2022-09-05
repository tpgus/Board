import { axiosInstance } from "../config";
import { setStorage } from "../../utils/storageUtil";

export const postAPI = {
  getAllPosts: async () => {
    const response = await axiosInstance.get<PostType[]>(`/posts`);
    setStorage("post", {
      initialPosts: response.data,
      filteredPosts: response.data,
      status: "completed",
    });
    return response.data;
  },
};

/*-----------------------*/
//독립적으로 쓸 때,
// export async function getAllPosts() {
//   const response = await axios.get<Post[]>(`${BASE_URL}/posts`);
//   return response.data;
// }
/* --------------------- */

/*
export interface AxiosRequestConfig<T = any> {
    url?: string;
    method?: Method;
    baseURL?: string;
    data?: T;
    headers?: Record<string, string>;
    params?: any;
    ...
}

export interface AxiosResponse<T = never>  {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: AxiosRequestConfig<T>;
    request?: any;
}
*/
