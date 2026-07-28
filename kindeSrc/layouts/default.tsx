"use server";

import React from "react";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export const DefaultLayout = ({
  children,
}: DefaultLayoutProps): React.JSX.Element => (
  <main className="dnn-auth" id="main">
    {children}
  </main>
);
