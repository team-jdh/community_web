import { PostDetailResponse } from "./api/postDetail";
import { PostResponse } from "./api/postList";
import { Comment, toComment } from "./comment";

export interface Post {
  postId: number;
  title: string;
  textContent: string;
  category: string;
  creator: string;
  viewCount: number;
  commentCount: number;
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
    commentCount: postResponse.commentCount,
    createdAt: postResponse.createdAt,
  };
};

export interface PostDetail {
  postId: number;
  title: string;
  textContent: string;
  category: string;
  creator: string;
  viewCount: number;
  comments: Comment[];
  createdAt: string;
}

export const toPostDetail = (response: PostDetailResponse): PostDetail => {
  return {
    postId: response.postId,
    title: response.title,
    textContent: response.content,
    category: response.category,
    creator: response.creator,
    viewCount: response.viewCount,
    comments: response.comments.map(toComment),
    createdAt: response.createdAt,
  };
};
