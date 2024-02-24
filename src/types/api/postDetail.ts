import { CommentResponse } from "./commentList";

export interface PostDetailResponse {
  postId: number;
  title: string;
  content: string;
  category: string;
  creator: string;
  viewCount: number;
  comments: CommentResponse[];
  createdAt: string;
}
