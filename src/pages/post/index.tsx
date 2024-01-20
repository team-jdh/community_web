import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { Pagination } from "@/components/Pagination";
import { Post } from "@/types/Post";

interface Props {
  list: Post[];
  totalCount: number;
}

export const getServerSideProps = (async ({ query }) => {
  const { page = 1, size = 5 } = query;

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

const Post = ({ list, totalCount }: Props) => {
  const router = useRouter();
  const page = Number(router.query.page ?? 1);
  const size = Number(router.query.size ?? 10);

  const goToPage = (targetPage: number) => {
    router.push({
      pathname: "/post",
      query: { page: targetPage, size },
    });
  };

  return (
    <div className="m-10">
      <div className="text-3xl">게시글 목록</div>
      <div className="mb-5" />
      {list.map((post) => {
        return (
          <div key={post.postId} className="p-5 border-2">
            <div className="font-bold text-lg mb-3">{post.title}</div>
            <div>{post.textContent}</div>
            <div>{post.creator}</div>
            <div>{post.category}</div>
            <div>{post.viewCount}</div>
          </div>
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

export default Post;
