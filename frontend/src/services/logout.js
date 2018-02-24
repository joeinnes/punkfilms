export default function logout () {
    this.$store.commit('logOut')
    this.$router.push('/')
    return
}