import React, { useState, FormEvent, ReactElement } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import { PageLayout } from "@/components/layouts/PageLayout";
import { NextPageWithLayout } from "@/pages/_app";

const define = {
  title: "제목30",
  category: "cate1",
  creator: "han",
  content: "practice next",
  password: "123",
};

const requestPost = async (form: Record<string, HTMLInputElement>) => {
  const values = _.keys(define).reduce((acc, cur) => {
    acc[cur] = form[cur].value;
    return acc;
  }, {} as Record<string, string>);

  const response = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify(values),
  });

  const data = await response.json();

  return data.isSuccess;
};

const Page: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const isSuccess = await requestPost(event.currentTarget);
      if (isSuccess) {
        router.push("/post");
      } else {
        alert("fail");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const inputs = _.entries(define).map(([key, value]) => {
    return (
      <div key={key} className="flex flex-row">
        <label htmlFor={key} className="w-20 block">
          {key}
        </label>
        <input
          className="border-2 w-56"
          type="text"
          name={key}
          defaultValue={value}
        />
      </div>
    );
  });

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      {inputs}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-5 border-2 border-[#fff]"
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout title="게시글 생성하기">
      <div>{page}</div>
    </PageLayout>
  );
};

export default Page;
