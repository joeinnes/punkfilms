// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'

import vueConfig from 'vue-config'
import vueFeathers from 'vue-feathers'

import hooks from 'feathers-hooks'
import authentication from 'feathers-authentication/client'
import store from '@/store/store'
import router from './router'
import config from './config'

const socket = io(config.API)
const feathers = Feathers()
.configure(socketio(socket))
.configure(hooks())
.configure(authentication({storage: window.localStorage}))

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
