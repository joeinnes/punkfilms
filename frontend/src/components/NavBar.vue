<template>
  <nav class="navbar navbar-light bg-light">
    <h1><router-link 
      to="/" 
      class="navbar-brand"><film-icon style="height: 1em" /> PunkFilms</router-link></h1>
    <div class="mr-auto links mt-1">
      <router-link to="/films">Films</router-link>
      <router-link to="/liked-films">Liked Films</router-link>
    </div>
    <LogIn />
  </nav>
</template>

<script>
import LogIn from './LogIn.vue'
import { FilmIcon } from 'vue-feather-icons'

export default {
  name: 'NavBar',
  components: {
    LogIn, 
    FilmIcon
  }
}
</script>
