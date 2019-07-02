<template lang="html">
  <div id="app">
    <div
      class="dnb-core-style dnb-spacing dnb-section dnb-section--spacing"
    >
      <h1 class="dnb-h1">{{ header }}</h1>
      <dnb-button
        text="DNB Button with Icon"
        icon="add"
        icon_position="left"
        @on_click="onClick"
      ></dnb-button>
      <br />
      <dnb-input
        :value="header"
        label="Label:"
        placeholder="My Placeholder"
        @on_change="handleChange"
      ></dnb-input>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

// import styles for realtime mono repo development
/* import 'dnb-ui-lib/style/components'
import 'dnb-ui-lib/style/themes/open-banking' */

/* import dnb from 'dnb-ui-lib/vue' */
import dnb from 'dnb-ui-lib/vue'

// Bind the components
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
    handleChange: e => {
      const value = e.value || (e.target && e.target.value)
      console.log('handleChange', value)
    }
  },
  components
}
</script>

<style lang="css">
body {
  background-color: var(--color-white);
}
.dnb-section {
  padding-left: 2rem;
}
</style>
