<template>
  <div class='mx-4 mx-md-3 mx-lg-2 mx-xl-1'>
    <div class='mt-3 card-columns'>
      <FilmCard v-for='film in films'
                :key='film.id'
                :film='film'
                :liked="checkStatus('liked', film.id)"
                :disliked="checkStatus('disliked', film.id)"
                :seen="checkStatus('seen', film.id)"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FilmCard from './FilmCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ListFilms',
  components: {
    FilmCard
  },
  data () {
    return {
      films: [],
      likedFilms: [],
      dislikedFilms: [],
      seenFilms: [],
      likesId: ''
    }
  },
  created () {
    axios
      .get(`${this.$config.API}/film`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      })
      .then(response => {
        if (!response.data) {
          throw response
        }
        this.films = response.data.data
      })
      .catch(err => console.error(err))
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'getUsername',
    })
  },
  methods: {
    checkStatus: function (state, filmId) {
      return (
        this[state + 'Films'].findIndex(el => {
          console.log(`Looking for ${filmId}, found ${el.id}`)
          return el.id === filmId
        }) > -1
      )
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>

</style>
