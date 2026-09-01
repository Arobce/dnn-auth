"use server";

import React from "react";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export const DefaultLayout = ({
  children,
}: DefaultLayoutProps): React.JSX.Element => (
  <>
    <title data-page-title>{context.widget.content.pageTitle}</title>

  <main className="dnn-auth" id="main">
    {children}
  </main>
  </>
);
