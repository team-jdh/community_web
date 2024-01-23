import { ReactElement } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";

import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return <div>It is Home page</div>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout title="Home">
      <div>{page}</div>
    </PageLayout>
  );
};

export default Page;
