import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    token: ''
  },
  mutations: {
    setUserAndToken (state, payload) {
      state.username = payload.username
      state.token = payload.token
    },
    logOut (state) {
      state.username = ''
      state.token = ''
    }
  },
  getters: {
    getUsername: state => state.username,
    getToken: state => state.token
  }
})
