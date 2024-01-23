import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import "@/styles/globals.css";

import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import type { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
