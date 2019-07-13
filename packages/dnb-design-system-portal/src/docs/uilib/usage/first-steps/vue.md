---
title: 'Vue'
draft: false
order: 6
---

# Vue JS

## How to

With Vue, you could use the included [Web Components](/uilib/usage/first-steps/web-components) support to get the HTML elements in place. But it's much more powerful to simply use the build in feature (bindings), powered by [Vuera](https://github.com/akxcv/vuera).

```js
import Vue from 'vue'

// get Vuera upp and runnning
import dnb, { Button } from 'dnb-ui-lib/components/vue'

export default {
  name: 'app',
  data: () => ({...}),
  methods: {myClickHandler: () => {}, ...},
  // now we have our components we want to use
  components: dnb.getComponents(Vue)
}
```

And the syntax would look like:

```html
<template lang="html">
  <div id="app" class="dnb-spacing">
    <dnb-button text="Button" @on_click="myClickHandler"></dnb-button>
  </div>
</template>
```

## Setup

Besides `vue` and `vuera`, you may also install, `dnb-ui-lib`, `react` and `react-dom`.

**NB:** Make sure You add `vuera` to Your Package dependencies. Even if You not use it directly in Your Application.

```json
"dependencies": {
  "dnb-ui-lib": "*",
  "react": "^16",
  "react-dom": "^16",
  "vue": "^2",
  "vuera": "^2"
},
...
```

## Build

If You run this app inside the mono repo Eufemia, then make sure You build the `dnb-ui-lib` first. To do so, go to the `dnb-ui-lib` directory and run `yarn build`. This is because we consume the package content directly like: import `dnb-ui-lib/components` and not from the `src` folder, like: `dnb-ui-lib/src/components`.
