import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { Pagination } from "@/components/Pagination";
import { Post } from "@/types/Post";
import { PageLayout } from "@/components/layouts/PageLayout";

import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";

interface Props {
  list: Post[];
  totalCount: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 5;

export const getServerSideProps = (async ({ query }) => {
  const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = query;

  const url = `${process.env.API_BASE_URL}/post?page=${page}&size=${size}`;
  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      list: data.content,
      totalCount: data.elementsCount,
    },
  };
}) satisfies GetServerSideProps<Props>;

const Page: NextPageWithLayout<Props> = ({ list, totalCount }) => {
  const router = useRouter();
  const page = Number(router.query.page ?? DEFAULT_PAGE);
  const size = Number(router.query.size ?? DEFAULT_SIZE);

  const goToPage = (targetPage: number) => {
    router.push({
      pathname: "/post",
      query: { page: targetPage, size },
    });
  };

  return (
    <div>
      {list.map((post) => {
        return (
          <Link
            href={`/post/${post.postId}`}
            key={post.postId}
            className="p-5 border-2 block"
          >
            <div className="font-bold text-lg mb-3">{post.title}</div>
            <div>{post.textContent}</div>
            <div>{post.creator}</div>
            <div>{post.category}</div>
            <div>{post.viewCount}</div>
          </Link>
        );
      })}
      <Pagination
        totalCount={totalCount}
        currentPage={page ?? 1}
        pageSize={size}
        onClick={goToPage}
      />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout title="게시글 목록">
      <div>{page}</div>
    </PageLayout>
  );
};

export default Page;
