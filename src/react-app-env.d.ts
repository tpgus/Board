/// <reference types="react-scripts" />

declare interface PostType {
  id: number;
  userId: number;
  title: string;
  body: string;
}

declare interface CommentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

declare interface ModalMessageType {
  title: string;
  message: string;
}
