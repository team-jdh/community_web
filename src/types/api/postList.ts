export interface PostListResponse {
  elementsCount: number;
  content: PostResponse[];
}

export interface PostResponse {
  postId: number;
  title: string;
  content: string;
  category: string;
  creator: string;
  viewCount: number;
  commentCount: number;
  createdAt: string;
}
