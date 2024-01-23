import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

export const PageLayout: FC<Props> = ({ children, title }) => {
  return (
    <section className="mt-10 mx-10">
      <div className="mb-10 text-4xl">{title}</div>
      <section>{children}</section>
    </section>
  );
};
