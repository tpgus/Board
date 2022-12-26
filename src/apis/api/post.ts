import { axiosInstance } from "../config";

export const postAPI = {
  getAllPosts: async () => {
    const response = await axiosInstance.get<PostType[]>(`/posts`);
    return response.data;
  },
};
