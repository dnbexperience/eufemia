/**
 * To showcase the usage of the dnb-ui-lib in Vue
 *
 */

import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  data: {
    header: 'header'
  },
  render: h => h(App)
})
