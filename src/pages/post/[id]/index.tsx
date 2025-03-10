import { ReactElement, useState } from "react";
import { GetServerSideProps } from "next";
import _ from "lodash";

import { Post } from "@/types/Post";
import { PageLayout } from "@/components/layouts/PageLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { redirectTo } from "@/util/serverSideRedirect";
import { useRouter } from "next/router";
import { deletePost, editPost, getToken } from "@/apiActions/post";
import { PostForm } from "@/types/PostForm";

interface Props {
  post: Post;
}

export const getServerSideProps = (async ({ params }) => {
  if (params?.id) {
    const res = await fetch(`${process.env.API_BASE_URL}/post/${params.id}`);
    const data = await res.json();
    const isSuccess = data.postId && data.title;

    if (isSuccess) {
      return { props: { post: data } };
    }
  }

  return redirectTo("/post");
}) satisfies GetServerSideProps<Props>;

const Page: NextPageWithLayout<Props> = ({ post }) => {
  const [postDetail, setPostDetail] = useState(post);
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
          category: "gddomin",
        };

        const result = await editPost(id, newPost, token);
        setPostDetail(result);
      } else {
        alert("유효하지 않은 비밀번호입니다.");
      }
    }
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
