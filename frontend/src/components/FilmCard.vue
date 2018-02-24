<template>
  <div class="card">
    <img 
      :src="film.image" 
      :alt="film.title"
      class="card-img-top img-fluid">
    <div class="card-body">
      <h5 class="card-title mb-0 pb-0">{{ film.title }}</h5>
      <p class="card-text">
        <GenreBadge 
          v-for="genre in film.genres" 
          :genre="genre" 
          :key="genre.id"/>
      </p>
      <p class="card-text rating mb-1 d-flex justify-content-between">
        <span><star-icon style="height: 1em" /> {{ film.rating }}/10</span> <span>{{ readableDate }}</span>
      </p>
      <p class="card-text">
        {{ film.overview }}
      </p>
      <p class="card-text d-flex justify-content-between">
        <a 
          :href="tmdbLink" 
          target="_blank">Read more</a>
        <a 
          :href="youtubeSearch" 
          target="_blank"><video-icon /></a>
      </p>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <span :class="[liked ? 'liked' : '']"><thumbs-up-icon @click="like" /></span> <thumbs-down-icon :class="[disliked ? 'disliked' : '']"/> <eye-icon :class="[seen ? 'seen' : '']"/>
    </div>
  </div>
</template>

<script>
import GenreBadge from './GenreBadge.vue'
import {
  StarIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  EyeIcon,
  VideoIcon
} from 'vue-feather-icons'

export default {
  name: 'FilmCard',
  components: {
    GenreBadge,
    StarIcon,
    ThumbsUpIcon,
    ThumbsDownIcon,
    EyeIcon,
    VideoIcon
  },
  props: {
    film: {
      type: Object,
      default: () => {}
    }, 
    liked: {
      type: Boolean,
      default: () => false
    },
    disliked: {
      type: Boolean,
      default: () => false
    }, 
    seen: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    like: async function () {
      try { 
        await this.$feathers.service('like').create({
          filmId: this.film.id,
          reaction: 'like'
        })
      } catch (err) {
        console.error(err)
      }
    }
  },
  computed: {
    tmdbLink() {
      return `https://www.themoviedb.org/movie/${this.film.tmdb_id}`
    },
    youtubeSearch() {
      return `https://youtube.com/results?search_query=${
        this.film.title
      }%20trailer`
    },
    readableDate() {
      // Stupid Americans
      const date = new Date (this.film.release_date)
      if (this.$config.format === 'mm/dd/yyyy') {
        return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
      }
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
  },
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.liked {
  color: red;
}
.disliked {
  color: red;
}
.seen {
  color: red;
}
</style>
