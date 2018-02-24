<template>
  <span class="badge badge-pill badge-dark mr-1">{{ genre.Name }}</span>
</template>

<script>
export default {
  name: 'GenreBadge',
  props: {
    genre: { 
      type: Object,
      default: () => ''
    }
  }
}
</script>
