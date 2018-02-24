import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ListFilms from '@/components/ListFilms'
import LikedFilms from '@/components/LikedFilms'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/films',
      name: 'Film List',
      component: ListFilms
    }, {
      path: '/liked-films',
      name: 'Liked Films',
      component: LikedFilms
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})