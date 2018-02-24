export default {
  methods: {
    logout: async function () {
      await this.$feathers.logout()
      this.user = null
      this.$router.push('/')
    }
  }
}
