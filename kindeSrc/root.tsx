"use server";

import {
  getKindeCSRF,
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getSVGFaviconUrl,
  type KindePageEvent,
} from "@kinde/infrastructure";
import React from "react";

import { getStyles } from "./styles/styles";

interface RootProps extends KindePageEvent {
  children: React.ReactNode;
}

export const Root = ({
  children,
  context,
  request,
}: RootProps): React.JSX.Element => {
  const { content } = context.widget;

  // Support both the newer `pageTitle` property and the older
  // `page_title` property so the browser title does not render empty.
  const pageTitle =
    content.pageTitle ??
    (content as { page_title?: string }).page_title ??
    "";

  return (
    <html
      dir={request.locale.isRtl ? "rtl" : "ltr"}
      lang={request.locale.lang}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="robots" content="noindex" />
        <meta name="csrf-token" content={getKindeCSRF()} />
        <meta name="color-scheme" content="light" />

        <title data-page-title>Roshan Hardcoded Test</title>

        <link
          href={getSVGFaviconUrl()}
          rel="icon"
          type="image/svg+xml"
        />

        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}

        <style>{getStyles()}</style>
      </head>

      <body>
        <div data-kinde-root="true">{children}</div>
      </body>
    </html>
  );
};