# DNN Kinde Custom Pages

Minimal repository used to reproduce and diagnose Kinde Custom Pages sync.

## Contents

- `kinde.json` — Kinde source configuration.
- `kindeSrc/environment/pages/(kinde)/(default)/page.tsx` — the single deployable page.

## Check

```bash
npm ci
npm run typecheck
```

There are no production secrets or environment credentials in this repository.
