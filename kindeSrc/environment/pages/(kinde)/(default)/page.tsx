"use server";

import { type KindePageEvent } from "@kinde/infrastructure";
import React from "react";
import { renderToString } from "react-dom/server.browser";
import { Widget } from "../../../../components/widget";
import { DefaultLayout } from "../../../../layouts/default";
import { Root } from "../../../../root";

const DefaultPage: React.FC<KindePageEvent> = ({ context, request }) => {
  // Prefer Kinde's localized copy; fall back to a flow-derived heading so the
  // card is never headless if the widget content has not been translated.
  const heading =
    context.widget.content.heading ||
    (request.route.flow === "register" ? "Create DNN account" : "Sign in to DNN");

  return (
    <Root context={context} request={request}>
      <DefaultLayout>
        <Widget heading={heading} />
      </DefaultLayout>
    </Root>
  );
};

// Page Component
export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await DefaultPage(event);
  return renderToString(page);
}
