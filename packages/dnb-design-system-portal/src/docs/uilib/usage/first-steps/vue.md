# Vue JS

## How to

With Vue, you could use the included [Web Components](/uilib/usage/first-steps/web-components) support to get the HTML elements in place. But it's much more powerful to simply use the build in feature (bindings), powered by [Vuera](https://github.com/akxcv/vuera).

```js
import Vue from 'vue'

// get Vuera upp and runnning
import dnb, { Button } from '@dnb/eufemia/components/vue'

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

Besides `vue` and `vuera`, you may also install, `@dnb/eufemia`, `react` and `react-dom`.

**NB:** Make sure You add `vuera` to Your Package dependencies. Even if You not use it directly in Your Application.

```json
"dependencies": {
  "@dnb/eufemia": "*",
  "react": "^16",
  "react-dom": "^16",
  "vue": "^2",
  "vuera": "^2"
},
...
```

## Example

Have a look at [this VUE example app](https://github.com/dnbexperience/eufemia-examples/tree/main/packages/example-vue).
