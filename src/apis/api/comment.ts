import { axiosAPI } from "../config";

export const commentAPI = {
  getCommentsOfPost: async (postId: number) => {
    const response = await axiosAPI.get<CommentType[]>(
      `/posts/${postId}/comments`
    );
    return response.data;
  },
};
