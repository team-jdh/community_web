export type PostEditForm = Omit<PostForm, "password">;

export interface PostForm {
  title: string;
  content: string;
  creator: string;
  category: string;
  password: string;
}
