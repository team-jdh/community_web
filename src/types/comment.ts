import { CommentResponse } from "./api/commentList";

export interface Comment {
  commentId: number;
  content: string;
  creator: string;
  createdAt: string;
  commentCount: number;
  postId: number;
}

export const toComment = (response: CommentResponse): Comment => {
  return {
    commentId: response.commentId,
    content: response.content,
    creator: response.creator,
    createdAt: response.createdAt,
    commentCount: response.childrenCommentCount,
    postId: response.postId,
  };
};
