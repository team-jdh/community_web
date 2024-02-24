export interface CommentResponse {
  commentId: number;
  content: string;
  creator: string;
  createdAt: string;
  childrenCommentCount: number;
  postId: number;
}
