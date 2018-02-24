<template>
  <div class="mt-3">
    <h1>Register</h1>
    <form>
      <div class="form-group">
        <label for="email">Email address</label>
        <input 
          id="email" 
          v-model="email"
          type="email" 
          class="form-control" 
          aria-describedby="emailHelp" 
          placeholder="Enter email">
        <small 
          id="emailHelp" 
          class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="password1">Password</label>
        <input 
          id="password1" 
          v-model="pass1"
          type="password" 
          class="form-control" 
          placeholder="Password" >
        <small 
          v-if="!passwordLongEnough"
          id="password1Help" 
          class="form-text text-muted">
          Your password needs to be at least 8 characters!</small>
      </div>
      <div class="form-group">
        <label for="password2">Password again</label>
        <input 
          id="password2" 
          v-model="pass2"  
          type="password"
          class="form-control" 
          placeholder="Password" 
          aria-describedby="password2Help" 
          autocomplete="new-password">
        <small 
          id="password2Help" 
          class="form-text text-muted">Confirm your password. {{ passwordsMatch ? '' : 'Passwords don\'t match!' }}</small>
      </div>
      <button 
        :disabled="!formValid" 
        type="submit" 
        class="btn btn-primary" 
        @click.prevent="register(credentials)">Submit</button>
    </form>
  </div>
</template>

<script>
import register from '../mixins/register'
import login from '../mixins/login'
export default {
  name: 'Register',
  mixins: [
    register,
    login
  ],
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
      return {
        email: this.email,
        password: this.pass1
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
