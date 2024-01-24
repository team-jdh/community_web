import { ReactElement } from "react";
import { GetServerSideProps } from "next";

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

const Page: NextPageWithLayout<Props> = ({ post }) => {
  return (
    <div>
      <div className="font-bold text-lg mb-3">{post.title}</div>
      <div>{post.textContent}</div>
      <div>{post.creator}</div>
      <div>{post.category}</div>
      <div>{post.viewCount}</div>
    </div>
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
