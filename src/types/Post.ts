import { PostResponse } from "./api/post";

export interface Post {
  postId: number;
  title: string;
  textContent: string;
  category: string;
  creator: string;
  viewCount: number;
  createdAt: string;
}

export const toPost = (postResponse: PostResponse) => {
  return {
    postId: postResponse.postId,
    title: postResponse.title,
    textContent: postResponse.content,
    category: postResponse.category,
    creator: postResponse.creator,
    viewCount: postResponse.viewCount,
    createdAt: postResponse.createdAt,
  };
};
