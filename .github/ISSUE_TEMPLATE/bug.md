---
name: 🐛 Bug report
labels: ':bug: Bug'
about: Create a report to help us improve
---

## 🐛 Bug Report

A clear and concise description of what the bug is.

## To Reproduce

Steps to reproduce the behavior:

🍀 Use [this starter](https://eufemia.dnb.no/web/contribute/reproduce-a-bug) to reproduce the issue.

## Expected behavior

A clear and concise description of what you expected to happen.

## Run `npx envinfo`

Paste the results here:

```bash

```

## Eufemia Version

### Browser – JS

To check the JS version used on the current page, type in your browser console:

```js
Eufemia.version
```

To view both the JS and CSS versions, along with all Eufemia versions currently rendered on the page:

```js
Eufemia.versions
```

### Browser – CSS

To check the CSS version used on the current page, run in your browser console:

```js
window
  .getComputedStyle(document.body)
  .getPropertyValue('--eufemia-version')
```

### Node.js

To find out which Eufemia version is imported in Node.js:

```js
// Use "require" instead of "import" if needed
import { version } from '@dnb/eufemia/shared/Eufemia'

console.log('Eufemia version:', version)
```
