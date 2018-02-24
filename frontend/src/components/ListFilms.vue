<template>
  <div class="mx-4 mx-md-3 mx-lg-2 mx-xl-1">
    <div class="mt-3 card-columns">
      <FilmCard 
        v-for="film in films"
        :key="film.id"
        :film="film"
      />
    </div>
  </div>
</template>

<script>
import FilmCard from './FilmCard.vue'

export default {
  name: 'ListFilms',
  components: {
    FilmCard
  },
  data () {
    return {
      films: []
    }
  },
  created: async function () {
    try {
      const films = await this.$feathers.service('film').find()
      this.films = films.data
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>

</style>
