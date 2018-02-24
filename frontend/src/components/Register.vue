<template>
  <div class="mt-3">
    <h1>Register</h1>
    <form>
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="password1">Password</label>
        <input type="password" class="form-control" id="password1" placeholder="Password" v-model="pass1">
        <small id="password1Help" class="form-text text-muted" v-if="!passwordLongEnough">Your password needs to be at least 8 characters!</small>
      </div>
      <div class="form-group">
        <label for="password2">Password again</label>
        <input type="password" class="form-control" id="password2" placeholder="Password" aria-describedby="password2Help" v-model="pass2">
        <small id="password2Help" class="form-text text-muted">Confirm your password. {{ passwordsMatch ? '' : 'Passwords don\'t match!' }}</small>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="!formValid" @click.prevent="register(this.credentials)">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      pass1: '',
      pass2: ''
    }
  },
  computed: {
    passwordsMatch: function () {
      return this.pass1 === this.pass2
    },
    emailContainsAt: function () {
      return this.email.indexOf('@') > -1
    },
    passwordLongEnough: function () {
      return this.pass1.length >= 8
    },
    formValid: function () {
      return this.passwordsMatch && this.emailContainsAt && this.passwordLongEnough
    },
    credentials: function () {
      return this.formValid ? { email: this.email, password: this.pass1 } : null
    }
  },
  methods: {
    register: async (credentials) => {
      await this.$services('users').create(credentials)
      await this.login(credentials)
    },
    login: async (credentials) => {
      try {
        if (!credentials) {
          feathers.authenticate()
        } else {
          const payload = Object.assign({ strategy: 'local' }, credentials)
          await this.$feathers
            .authenticate(payload)
          this.$router.push('/films')
        }
      } catch (e) {
        console.error(e)
      }
    }     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
