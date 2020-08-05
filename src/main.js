import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'

import router from './router'
import store from './store'
import translations from './i18n'

import {componentRegistry} from './components'

Vue.config.productionTip = false

componentRegistry()

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: translations
})

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
