import { axiosInstance } from "../config";

export const commentAPI = {
  getCommentsOfPost: async (postId: number) => {
    const response = await axiosInstance.get<CommentType[]>(
      `/posts/${postId}/comments`
    );
    return response.data;
  },
};
