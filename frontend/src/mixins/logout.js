export default {
  methods: {
    logout: async function () {
      await this.$feathers.logout()
      this.$router.push('/')
    }
  }
}
