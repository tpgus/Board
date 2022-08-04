export interface PostType {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CommentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface ModalMessageType {
  title: string;
  message: string;
}
