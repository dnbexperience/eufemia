---
name: 🐛 Bug report
labels: ':bug: Bug'
about: Create a report to help us improve
---

## 🐛 Bug Report

A clear and concise description of what the bug is.

## To Reproduce

Steps to reproduce the behavior:

🍀 Use [this starter](https://eufemia.dnb.no/issue) to reproduce the issue.

## Expected behavior

A clear and concise description of what you expected to happen.

## Run `npx envinfo`

Paste the results here:

```bash

```

## Eufemia Version

**Browser JS:** Type `Eufemia.version` in your browser console.

**Browser CSS:** Type `window.getComputedStyle(document.body).getPropertyValue('--eufemia-version')` in your browser console.

**Node.js:** Use import or require to find out what Eufemia version is imported:

```js
// NB: Use "require" if needed
import { version } from '@dnb/eufemia/shared/Eufemia'
console.log('Eufemia version:', version)
```
