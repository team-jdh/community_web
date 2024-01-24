import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import _ from "lodash";

import { Post } from "@/types/Post";
import { PageLayout } from "@/components/layouts/PageLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { redirectTo } from "@/util/serverSideRedirect";

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

const deletePost = async (pw: string) => {
  const response = await fetch("/api/post", {
    method: "DELETE",
    body: JSON.stringify({ pw }),
  });

  const data = await response.json();
  return data.isSuccess;
};

const Page: NextPageWithLayout<Props> = ({ post }) => {
  const askPassword = async () => {
    const pw = prompt("비밀번호를 입력해주세요");

    if (!_.isNil(pw)) {
      const isSuccess = await deletePost(pw);
      const message = isSuccess ? "삭제 성공" : "삭제 실패";
      alert(message);
    }
  };

  return (
    <>
      <section className="my-10 flex flex-row">
        <button className="py-2 px-5 mr-2 border-2">수정</button>

        <button className="py-2 px-5 border-2" onClick={askPassword}>
          삭제
        </button>
      </section>
      <section>
        <div className="font-bold text-lg mb-3">{post.title}</div>
        <div>{post.textContent}</div>
        <div>{post.creator}</div>
        <div>{post.category}</div>
        <div>{post.viewCount}</div>
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
