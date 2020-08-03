import Vue from 'vue'
import App from './App.vue'

import router from './router'
import {componentRegistry} from './components'

Vue.config.productionTip = false

componentRegistry()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
