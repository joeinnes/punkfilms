import axios from 'axios'
import login from './login'
import config from '../config'

export default function register (email, password) {
  axios.post(`${config.API}/users`, {
    'email': email,
    'password': password
  })
    .then(login(email, password))
    .catch((err) => console.error(`There was an error registering you: ${err}. This username may not be available, or you may have already registered with this email address.`))
}
