import { CommentResponse } from "@/types/api/commentList";
import { Comment, toComment } from "@/types/comment";
import { CommentForm } from "@/types/commentForm";

export const getChildrenCommentList = async (
  postId: number,
  commentId: number
): Promise<CommentResponse[]> => {
  const response = await fetch(`/api/post/${postId}/comment/${commentId}`);
  const data = await response.json();

  return data.commentList;
};

export const postChildComment = async (
  postId: number,
  commentId: number,
  form: CommentForm
): Promise<Comment> => {
  const response = await fetch(`/api/post/${postId}/comment`, {
    method: "POST",
    body: JSON.stringify(form),
  });

  const result = await response.json();
  return toComment(result.data);
};
