/**
 * To showcase the usage of the dnb-ui-lib in Vue
 *
 */

import Vue from 'vue'
import App from './App.vue'

// Custom Eufemia import, instead of effecting the body reset with 'dnb-ui-lib/style'
import 'dnb-ui-lib/style/basis'
import 'dnb-ui-lib/style/components'
// import 'dnb-ui-lib/style/themes/ui' // use other theme insteaad

// Use other theme
import 'dnb-ui-lib/style/themes/open-banking'

App.vm = new Vue({
  el: '#app',
  data: {
    header: 'header'
  },
  render: h => h(App)
})
