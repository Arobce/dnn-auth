# DNN Kinde Custom Pages

Minimal repository used to reproduce and diagnose Kinde Custom Pages sync.

## Contents

- `kinde.json` — Kinde source configuration.
- `kindeSrc/root.tsx` — the `<html>` document shell (head, CSRF, required CSS/JS, `data-kinde-root`).
- `kindeSrc/styles/styles.ts` — page CSS plus the `--kinde-*` custom properties that theme the widget.
- `kindeSrc/layouts/default.tsx` — page layout wrapper.
- `kindeSrc/components/widget.tsx` — the DNN card that hosts `getKindeWidget()`.
- `kindeSrc/environment/pages/(kinde)/(default)/page.tsx` — the deployable page; `(default)` is the
  fallback template Kinde uses for every route without its own directory (login, register, MFA, …).

Note: custom pages only execute on a custom domain. On `*.kinde.com` Kinde serves its own
hosted pages and this code is never run.

## Check

```bash
npm ci
npm run typecheck
```

There are no production secrets or environment credentials in this repository.
