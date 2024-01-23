import { PageLayout } from "@/components/layouts/PageLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}</div>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout title="게시글 상세">
      <div>{page}</div>
    </PageLayout>
  );
};

export default Page;
