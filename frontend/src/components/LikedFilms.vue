<template>
  <div class="mx-4 mx-md-3 mx-lg-2 mx-xl-1">
    <h2>Liked Films</h2>
    <ul class="mt-3">
      <li 
        v-for="film in likedFilms"  
        :key="film.id">{{ film.Title }} <delete-icon
          :id="film.id"
          style="height: 1em" 
          @click="unlike" /></li>
    </ul>
    <h2>Disliked Films</h2>
    <ul class="mt-3">
      <li 
        v-for="film in dislikedFilms" 
        :key="film.id">{{ film.Title }} <delete-icon 
          :id="film.id"
          style="height: 1em"
          @click="undislike" /></li>
    </ul>
    <h2>Seen Films</h2>
    <ul class="mt-3">
      <li 
        v-for="film in seenFilms" 
        :key="film.id">{{ film.Title }} <delete-icon 
          :id="film.id"
          style="height: 1em"
          @click="unsee" /></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DeleteIcon } from 'vue-feather-icons'

export default {
  name: 'LikedFilms',  components: {
    DeleteIcon
  },
  data () {
    return {
      likedFilms: [],
      dislikedFilms: [],
      seenFilms: [],
      likesId: ''
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'getUsername'
    })
  },
  created () {
  },
  methods: {
  }

}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>

</style>
