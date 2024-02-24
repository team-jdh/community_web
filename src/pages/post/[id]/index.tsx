import { ReactElement, useState } from "react";
import { GetServerSideProps } from "next";
import _ from "lodash";

import { PostDetail, toPostDetail } from "@/types/Post";
import { PageLayout } from "@/components/layouts/PageLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { redirectTo } from "@/util/serverSideRedirect";
import { useRouter } from "next/router";
import { deletePost, editPost, getToken } from "@/apiActions/post";
import { PostForm } from "@/types/PostForm";
import { PostDetailResponse } from "@/types/api/postDetail";
import { getChildrenCommentList, postChildComment } from "@/apiActions/comment";
import { Comment, toComment } from "@/types/comment";
import { CommentForm } from "@/types/commentForm";

interface Props {
  post: PostDetail;
}

export const getServerSideProps = (async ({ params }) => {
  if (params?.id) {
    const res = await fetch(`${process.env.API_BASE_URL}/post/${params.id}`);
    const data: PostDetailResponse = await res.json();
    const isSuccess = data.postId && data.title;

    if (isSuccess) {
      return { props: { post: toPostDetail(data) } };
    }
  }

  return redirectTo("/post");
}) satisfies GetServerSideProps<Props>;

const Page: NextPageWithLayout<Props> = ({ post }) => {
  const [postDetail, setPostDetail] = useState<PostDetail>(post);
  const [commentList, setCommentList] = useState<Record<string, Comment[]>>({});

  const router = useRouter();
  const { id } = router.query;

  const handleClickDelete = async () => {
    const pw = prompt("비밀번호를 입력해주세요");
    if (!_.isNil(pw) && typeof id === "string") {
      const { token } = await getToken(id, pw);
      if (token) {
        const result = await deletePost(id, token);
        if (result) {
          router.push("/post");
        }
      } else {
        alert("유효하지 않은 비밀번호입니다.");
      }
    }
  };

  const handleClickEdit = async () => {
    const pw = prompt("비밀번호를 입력해주세요");
    if (!_.isNil(pw) && typeof id === "string") {
      const { token } = await getToken(id, pw);

      if (token) {
        const newPost: Omit<PostForm, "password"> = {
          title: "33223",
          content: "aaa",
          creator: "ss",
          category: "question",
        };

        const result = await editPost(id, newPost, token);
        setPostDetail(result);
      } else {
        alert("유효하지 않은 비밀번호입니다.");
      }
    }
  };

  const handleClickChildrenComment = async (
    postId: string,
    commentId: number
  ) => {
    const response = await getChildrenCommentList(Number(postId), commentId);

    setCommentList({
      ...commentList,
      [commentId]: response.map(toComment),
    });
  };

  const createChildComment = async (postId: string, commentId: number) => {
    const form: CommentForm = {
      content: "comment dummy",
      creator: "david",
      password: "1234",
      parentId: commentId,
    };

    await postChildComment(Number(postId), commentId, form);
    await handleClickChildrenComment(postId, commentId);
  };

  return (
    <>
      <section className="my-10 flex flex-row">
        <button className="py-2 px-5 mr-2 border-2" onClick={handleClickEdit}>
          수정
        </button>

        <button className="py-2 px-5 border-2" onClick={handleClickDelete}>
          삭제
        </button>
      </section>
      <section>
        <div className="font-bold text-lg mb-3">{postDetail.title}</div>
        <div>{postDetail.textContent}</div>
        <div>{postDetail.creator}</div>
        <div>{postDetail.category}</div>
        <div>{postDetail.viewCount}</div>
      </section>
      <section className="border-2 mt-10 w-[80%]">
        <div className="mt-5 ml-10">댓글</div>
        {post.comments.map((comment) => {
          return (
            <div className="border-2 m-10 relative" key={comment.commentId}>
              <div>{comment.commentId}</div>
              <div>{comment.content}</div>
              {Number(comment.commentCount) > 0 && (
                <button
                  className="py-1 px-10 border-2"
                  onClick={() => {
                    if (typeof id === "string") {
                      handleClickChildrenComment(id, comment.commentId);
                    }
                  }}
                >
                  {comment.commentCount}
                </button>
              )}
              {commentList[comment.commentId]?.map((child) => {
                return (
                  <div className="border-2 m-10" key={child.commentId}>
                    <div>{child.commentId}</div>
                    <div>{child.content}</div>
                  </div>
                );
              })}
              <button
                className="absolute top-0 right-0 py-2 px-10 border-2"
                onClick={() => {
                  if (typeof id === "string") {
                    createChildComment(id, comment.commentId);
                  }
                }}
              >
                대댓글 쓰기
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout title="게시글 상세">
      <div>{page}</div>
    </PageLayout>
  );
};

export default Page;
