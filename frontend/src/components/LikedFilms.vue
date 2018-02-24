<template>
  <div class="mx-4 mx-md-3 mx-lg-2 mx-xl-1">
    <h2>Liked Films</h2>
    <ul class="mt-3">
      <li 
        v-for="film in likedFilms"  
        :key="film.id">{{ film.Title }} <delete-icon
          :id="film.id"
          style="height: 1em" /></li>
    </ul>
    <h2>Disliked Films</h2>
    <ul class="mt-3">
      <li 
        v-for="film in dislikedFilms" 
        :key="film.id">{{ film.Title }} <delete-icon 
          :id="film.id"
          style="height: 1em" /></li>
    </ul>
    <h2>Seen Films</h2>
    <ul class="mt-3">
      <li 
        v-for="film in seenFilms" 
        :key="film.id">{{ film.Title }} <delete-icon 
          :id="film.id"
          style="height: 1em" /></li>
    </ul>
  </div>
</template>

<script>
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
  created: async function () {
    this.likedFilms = await this.$feathers.service('like').find({
    })
    console.log(this.likedFilms.data)
  },
  methods: {
  }

}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>

</style>
