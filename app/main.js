
/* global TNS_ENV */

import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('Gradient', () => require('nativescript-gradient').Gradient)

// Creating Vue Application using App.vue as component for the whole app.
new Vue({
  render: h => h('frame', [h(App)])
}).$start()
