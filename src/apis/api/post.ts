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
