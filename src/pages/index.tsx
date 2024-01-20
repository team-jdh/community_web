import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="m-10">
      <h1 className="text-4xl">Home</h1>
      <div className="mb-10" />
      <ul>
        <li className="py-3">
          <a href="/post/new">게시글 생성</a>
        </li>
        <li className="py-3">
          <a href="/post">게시글 목록</a>
        </li>
      </ul>
    </div>
  );
}
