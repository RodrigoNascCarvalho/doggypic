
/* global TNS_ENV */

import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import permissions from 'nativescript-permissions'

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('Gradient', () => require('nativescript-gradient').Gradient)

permissions.requestPermission([
  'android.permission.INTERNET',
  'android.permission.READ_EXTERNAL_STORAGE',
  'android.permission.WRITE_EXTERNAL_STORAGE'
], 'I need these permissions')
  .then(function (res) {
    console.log('Permissions granted!')
  })
  .catch(function () {
    console.log('No permissions - plan B time!')
  })

// Creating Vue Application using App.vue as component for the whole app.
new Vue({
  render: h => h('frame', [h(App)])
}).$start()
