<template>
  <div class="mx-4 mx-md-3 mx-lg-2 mx-xl-1">
    <h2>Liked Films</h2>
    <ul class="mt-3">
      <li v-for="film in likedFilms" :key="film.id">{{ film.Title }} <delete-icon @click="unlike" :id="film.id" style="height: 1em" /></li>
    </ul>
    <h2>Disliked Films</h2>
    <ul class="mt-3">
      <li v-for="film in dislikedFilms" :key="film.id">{{ film.Title }} <delete-icon @click="undislike" :id="film.id" style="height: 1em" /></li>
    </ul>
    <h2>Seen Films</h2>
    <ul class="mt-3">
      <li v-for="film in seenFilms" :key="film.id">{{ film.Title }} <delete-icon @click="unsee" :id="film.id" style="height: 1em" /></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { DeleteIcon } from 'vue-feather-icons'

export default {
  name: 'LikedFilms',
  data () {
    return {
      likedFilms: [],
      dislikedFilms: [],
      seenFilms: [],
      likesId: ''
    }
  },
  created () {
    
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'getUsername'
    })
  },
  methods: {
  },
  components: {
    DeleteIcon
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>

</style>
