import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import _ from "lodash";

const define = {
  title: "제목30",
  category: "cate1",
  creator: "han",
  content: "practice next",
};

const requestPost = async (form: Record<string, HTMLInputElement>) => {
  const values = _.keys(define).reduce((acc, cur) => {
    acc[cur] = form[cur].value;
    return acc;
  }, {} as Record<string, string>);

  const response = await fetch("/api/post/new", {
    method: "POST",
    body: JSON.stringify(values),
  });

  const data = await response.json();

  return data.isSuccess;
};

export default function PostNewPage() {
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
        router.push("/");
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
      <div key={key} className="border-2">
        <input type="text" name={key} defaultValue={value} />
      </div>
    );
  });

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      {inputs}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
