import axios from 'axios'
import config from '../config'
import store from '../store/store'
import router from '../router/index'

export default function login (email, password) {
  axios.post(`${config.API}/authentication`, {
    'email': email,
    'password': password,
    'strategy': 'local'
  })
    .then((response) => {
      if (!response.data || !response.data.accessToken) {
        throw response
      }
      const jwt = response.data.accessToken
      const user = email
      store.commit('setUserAndToken', {
        username: user,
        token: jwt,
      })
      this.$router.push('/films')
    })
    .catch((err) => console.error(err))
}