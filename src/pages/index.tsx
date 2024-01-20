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
          <Link href="/about">ssg page</Link>
        </li>
        <li className="py-3">
          <Link href="/post/new">게시글 생성</Link>
        </li>
        <li className="py-3">
          <Link href="/post">게시글 목록</Link>
        </li>
      </ul>
    </div>
  );
}
