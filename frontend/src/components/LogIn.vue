<template>
  <div>
    <form 
      v-if="user"
      class="form-inline">
      <span class="mr-sm-2"><user-icon style="height: 1em" /> {{ user.email }}</span>
      <button 
        class="btn btn-outline-success my-2 my-sm-0" 
        type="submit" 
        @click.prevent="logout">Log Out</button>
    </form>

    <form 
      v-else
      class="form-inline">
      <input 
        v-model="email" 
        type="text" 
        placeholder="example@example.com" 
        autocomplete="username" 
        class="form-control mr-2" 
        aria-label="Username" 
        required>
      <input 
        v-model="pass1" 
        type="password" 
        class="form-control mr-2" 
        placeholder="password"
        autocomplete="current-password" 
        aria-label="Password" 
        required>
      <button 
        class="btn btn-outline-success my-2 my-sm-0 mr-1" 
        type="submit" 
        @click.prevent="login(credentials)">Log In</button>
      <router-link 
        to="/register" 
        class="btn btn-outline-success my-2 my-sm-0">Register</router-link>
    </form>
  </div>
</template>

<script>
import { UserIcon } from 'vue-feather-icons'
import login from '../mixins/login'
import logout from '../mixins/logout'

export default {
  name: 'LogIn',
  components: {
    UserIcon
  },
  mixins: [
    login,
    logout
  ],
  data () {
    return {
      email: '',
      pass1: '',
      user: null
    }
  },
  computed: {
    credentials: function () {
      return {
        email: this.email,
        password: this.pass1
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
