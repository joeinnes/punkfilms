import Vue from 'vue'
import App from './App'

import vueConfig from 'vue-config'
import vueFeathers from 'vue-feathers'

import store from '@/store/store'
import router from './router/index'
import config from './config'
import feathers from './feathers'

Vue.use(vueFeathers, feathers)
Vue.use(vueConfig, config)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
