import Link from "next/link";

const nav = [
  {
    title: "홈",
    to: "/",
  },
  {
    title: "게시글 생성",
    to: "/post/new",
  },
  {
    title: "게시글 목록",
    to: "/post",
  },
];

export const NavBar = () => {
  return (
    <ul className="bg-red-100 w-[15vw] pt-10 pl-5">
      {nav.map(({ title, to }) => {
        return (
          <li key={title}>
            <Link className="block py-3" href={to}>
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
