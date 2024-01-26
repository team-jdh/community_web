import { PostEditForm } from "@/types/PostForm";

export const editPost = async (
  id: string,
  post: PostEditForm,
  token: string
) => {
  const response = await fetch(`/api/post/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  const data = await response.json();
  return data.post;
};

export const deletePost = async (id: string, token: string) => {
  const response = await fetch(`/api/post/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data.isSuccess;
};

export const getToken = async (postId: string, password: string) => {
  const response = await fetch("/api/post/auth", {
    method: "POST",
    body: JSON.stringify({ postId, password }),
  });

  const data = await response.json();
  return data.token;
};
