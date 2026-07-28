// Brand tokens for dnn.cc. Kept as plain values so they can be reused by both
// the page chrome and the Kinde widget custom properties below.
const dnn = {
  surface: "#f4f7f5",
  card: "#ffffff",
  border: "#dce5df",
  ink: "#17211b",
  inkMuted: "#5b6b61",
  inkFaint: "#718078",
  brand: "#315f42",
  fontFamily:
    "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
} as const;

export const getStyles = (): string => `
  :root {
    color-scheme: light;

    --kinde-base-font-family: ${dnn.fontFamily};
    --kinde-base-color: ${dnn.ink};
    --kinde-base-background-color: ${dnn.card};

    --kinde-button-border-radius: 10px;
    --kinde-button-primary-background-color: ${dnn.brand};
    --kinde-button-primary-color: #ffffff;
    --kinde-button-primary-border-width: 1px;
    --kinde-button-primary-border-color: ${dnn.brand};

    --kinde-button-secondary-background-color: transparent;
    --kinde-button-secondary-color: ${dnn.ink};
    --kinde-button-secondary-border-width: 1px;
    --kinde-button-secondary-border-color: ${dnn.border};
    --kinde-button-secondary-border-style: solid;

    --kinde-designer-control-select-text-border-radius: 10px;
    --kinde-control-select-text-border-color: ${dnn.border};
    --kinde-control-label-font-weight: 500;

    --kinde-form-spacing-content: 1.25rem;

    font-family: ${dnn.fontFamily};
    background: ${dnn.surface};
    color: ${dnn.ink};
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    min-height: 100vh;
    background: ${dnn.surface};
  }

  .dnn-auth {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 32px 20px;
  }

  .dnn-auth__card {
    width: min(100%, 460px);
    padding: 40px;
    border: 1px solid ${dnn.border};
    border-radius: 20px;
    background: ${dnn.card};
    box-shadow: 0 24px 70px rgba(25, 54, 37, 0.10);
  }

  .dnn-auth__brand {
    margin: 0 0 28px;
    color: ${dnn.brand};
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
    color: ${dnn.inkMuted};
    font-size: 15px;
    line-height: 1.6;
  }

  .dnn-auth__products {
    margin: 28px 0 0;
    color: ${dnn.inkFaint};
    font-size: 12px;
    line-height: 1.6;
  }
`;
