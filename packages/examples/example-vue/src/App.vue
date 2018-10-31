<template lang="html">
  <div id="app" class="dnb-style">
    <h1>{{ header }}</h1>
    <dnb-button :text="header" @on_click="onClick"></dnb-button>
    <dnb-input @on_change="onChange" value="My Input Value" placeholder="My Placeholder"></dnb-input>

    <!-- <dnb-button
      ref="button"
      text="Custom Element with icon"
      icon="chevron-right"
      @click="handleClick"
      v-on:click="onClick"
    ></dnb-button>
    <dnb-icon-with-all-icons
      icon="bell"
      size="80"
    ></dnb-icon-with-all-icons>
    <dnb-input
      ref="input"
      placeholder="Type someting ..."
    ></dnb-input> -->

  </div>
</template>

<script>
import Vue from 'vue'

// You have to choose to wehter use web-components or vuera (React) components
/* Import dnb from 'dnb-ui-lib/components/web-components' // optional, import "dnb-ui-lib/components/web-components" to enable Web Components */

/* import 'dnb-ui-lib/style' // Import the global DNB stylesheet */
/* import 'dnb-ui-lib/components/style' // Import all components */

import 'dnb-ui-lib/components/style'
import 'dnb-ui-lib/style/theme'
import dnb, { Button, Input } from 'dnb-ui-lib/components/vue'

const components = dnb.getComponents(Vue)

// Make sure we add Vue to the config to add all ignoredElements
// In case we use web-components
/* dnb.setIgnoredPatterns(Vue) */

export default {
  name: 'app',
  data: () => ({
    header: 'React Components in Vue'
    /* header: 'Web Components in Vue' */
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
  // only a use case if we use web-components
  /* mounted() {
    this.$refs.button.addEvent('on_click', this.handleClick)
    this.$refs.input.addEvent('on_change', this.handleChange)
  }, */
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
    font-weight: 300;
  }
</style>
