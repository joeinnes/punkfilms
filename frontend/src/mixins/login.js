import decode from 'jwt-decode'

export default {
  methods: {
    login: async function (credentials) {
      try {
        if (!credentials) {
          const authResponse = await this.$feathers.authenticate()
          const userId = decode(authResponse.accessToken).userId
          const user = await this.$feathers.service('users').get(userId)
          this.user = user
          this.$router.push('/films')
        } else {
          const payload = Object.assign({ strategy: 'local' }, credentials)
          const authResponse = await this.$feathers
            .authenticate(payload)
          const userId = decode(authResponse.accessToken).userId
          const user = await this.$feathers.service('users').get(userId)
          this.user = user
          this.$router.push('/films')
        }
        console.log(this.$feathers)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
