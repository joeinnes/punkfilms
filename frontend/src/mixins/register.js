export default {
  methods: {
    register: async function (credentials) {
      await this.$feathers.service('users').create(credentials)
        .then(this.login(credentials))
        .catch((err) => console.error(`There was an error registering you: ${err}. This username may not be available, or you may have already registered with this email address.`))			
    }
  }
}
