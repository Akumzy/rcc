import React, { ReactNode } from "react";
import Head from "next/head";
type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "RCC Demo by Akuma" }: Props) => (
  <div className="w-full flex flex-col fixed h-full flex-wrap">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    {children}
  </div>
);

export default Layout;
