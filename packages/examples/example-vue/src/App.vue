<template lang="html">
  <div id="app" class="dnb-style">
    <h1>{{ header }}</h1>
    <dnb-button
      text="DNB Button with Icon"
      icon="add"
      icon_position="left"
      @on_click="onClick"
    ></dnb-button>
    <dnb-input
      :value="header"
      placeholder="My Placeholder"
      @on_change="onChange"
    ></dnb-input>
  </div>
</template>

<script>
import Vue from 'vue'

// import styles
import 'dnb-ui-lib/src/style/components'
import 'dnb-ui-lib/src/style/themes/open-banking'

import dnb, { Button, Input } from 'dnb-ui-lib/components/vue'

const components = dnb.getComponents(Vue)

export default {
  name: 'app',
  data: () => ({
    header: 'React Components in Vue'
  }),
  methods: {
    onClick: function(e) {
      console.log('onClick', e)
    },
    handleClick: e => {
      console.log('handleClick', e)
    },
    onChange: e => {
      console.log('onChange', e.value || (e.target && e.target.value))
    },
    handleChange: e => {
      console.log('handleChange', e.value || (e.target && e.target.value))
    }
  },
  components
}
</script>

<style lang="css">
html,
body {
  height: 100%;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
  sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
div.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  font-weight: var(--font-weight-medium);
}
</style>
