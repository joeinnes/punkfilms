<template>
  <div>
    <form class="form-inline" v-if="loggedInUser">
      <span class="mr-sm-2"><user-icon style="height: 1em" /> {{ loggedInUser }}</span>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click.prevent="logout">Log Out</button>
    </form>

    <form class="form-inline" v-else>
      <input class="form-control mr-2" type="text" placeholder="example@example.com" aria-label="Username" v-model="formUser" required>
      <input class="form-control mr-2" type="password" placeholder="password" aria-label="Password" v-model="formPass" required>
      <button class="btn btn-outline-success my-2 my-sm-0 mr-1" type="submit" @click.prevent="login(formUser, formPass)">Log In</button>
      <router-link to="/register" class="btn btn-outline-success my-2 my-sm-0">Register</router-link>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { UserIcon } from 'vue-feather-icons'
import axios from 'axios'
import login from '../services/login'
import logout from '../services/logout'

export default {
  name: 'LogIn',
  data () {
    return {
      formUser: '',
      formPass: ''
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'getUsername'
    })
  },
  methods: {
    login,
    logout
  },
  components: {
    UserIcon
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
