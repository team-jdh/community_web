import { FC, PropsWithChildren } from "react";
import { NavBar } from "../Navbar";

export const GlobalLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="flex flex-row h-[100vh]">
      <NavBar />
      <main className="flex flex-1 flex-col">{children}</main>
    </section>
  );
};
