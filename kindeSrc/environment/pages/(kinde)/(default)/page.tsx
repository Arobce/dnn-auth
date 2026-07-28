'use server';

import {
  getKindeCSRF,
  getKindeNonce,
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeWidget,
  getSVGFaviconUrl,
  type KindePageEvent,
} from '@kinde/infrastructure';
import React from 'react';
import { renderToString } from 'react-dom/server.browser';

const styles = `
  :root {
    color-scheme: light;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #f4f7f5;
    color: #17211b;
  }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; background: #f4f7f5; }
  .dnn-auth {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 32px 20px;
  }
  .dnn-auth__card {
    width: min(100%, 460px);
    padding: 40px;
    border: 1px solid #dce5df;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 0 24px 70px rgba(25, 54, 37, 0.10);
  }
  .dnn-auth__brand {
    margin: 0 0 28px;
    color: #315f42;
    font-size: 15px;
    font-weight: 750;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .dnn-auth__title {
    margin: 0;
    font-size: clamp(30px, 7vw, 42px);
    line-height: 1.05;
    letter-spacing: -0.04em;
  }
  .dnn-auth__copy {
    margin: 14px 0 28px;
    color: #5b6b61;
    font-size: 15px;
    line-height: 1.6;
  }
  .dnn-auth__products {
    margin: 28px 0 0;
    color: #718078;
    font-size: 12px;
    line-height: 1.6;
  }
`;

const DefaultPage: React.FC<KindePageEvent> = ({ context, request }) => {
  const title = request.route?.flow === 'register' ? 'Create DNN account' : 'Sign in to DNN';

  return (
    <html dir={request.locale.isRtl ? 'rtl' : 'ltr'} lang={request.locale.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="noindex" name="robots" />
        <meta content={getKindeCSRF()} name="csrf-token" />
        <meta content="light" name="color-scheme" />
        <title>{context.widget.content.pageTitle}</title>
        <link href={getSVGFaviconUrl()} rel="icon" type="image/svg+xml" />
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
        <style nonce={getKindeNonce()}>{styles}</style>
      </head>
      <body>
        <main className="dnn-auth" data-kinde-root="true">
          <section className="dnn-auth__card">
            <p className="dnn-auth__brand">DNN · dnn.cc</p>
            <h1 className="dnn-auth__title">{title}</h1>
            <p className="dnn-auth__copy">Sign in with Google or email to continue.</p>
            {getKindeWidget()}
            <p className="dnn-auth__products">
              gerber.tools · pcb.market · mpn.cc · bomprice.cc
            </p>
          </section>
        </main>
      </body>
    </html>
  );
};

export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await DefaultPage(event);
  return renderToString(page);
}
