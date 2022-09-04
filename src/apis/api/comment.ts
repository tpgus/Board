import { axiosAPI } from "../config";

interface CommentsType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
export const comments = {
  getCommentsOfPost: async (postId: number) => {
    const response = await axiosAPI.get<CommentsType[]>(
      `/posts/${postId}/comments`
    );
    return response.data;
  },
};
