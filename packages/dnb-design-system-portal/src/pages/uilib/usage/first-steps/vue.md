---
header: 'UI Library'
title: 'Vue'
draft: false
status: 'wip'
order: 6
---

# Vue JS

## How to

With Vue, You could use the included [Web Components](/uilib/usage/first-steps/web-components) support to get the HTML Elements in place. But it's much more powerful to simply use the build in feature, powered by [Vuera](https://github.com/akxcv/vuera).

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

And the Syntax would look like:

```html
<template lang="html">
  <div id="app" class="dnb-style">
    <dnb-button text="Button" @on_click="myClickHandler"></dnb-button>
  </div>
</template>
```

## Setup

Beside `vue`, You may also install, `dnb-ui-lib`, `react` and `react-dom`.

```json
"dependencies": {
  "dnb-ui-lib": "*",
  "react": "^16",
  "react-dom": "^16",
  "vue": "^2"
},
...
```
