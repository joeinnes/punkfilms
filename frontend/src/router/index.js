import Vue from 'vue'
import store from '@/store/store'
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
      component: ListFilms,
      beforeEnter: isLoggedIn
    }, {
      path: '/liked-films',
      name: 'Liked Films',
      component: LikedFilms,
      beforeEnter: isLoggedIn
    }, {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: isNotLoggedIn
    }
  ]
})

function isLoggedIn (to, from, next) {
  if (!store.getters.getUsername) {
    next(false)
  } else {
    next()
  }
}

function isNotLoggedIn (to, from, next) {
  if (store.getters.getUsername) {
    next(false)
  } else {
    next()
  }
}
