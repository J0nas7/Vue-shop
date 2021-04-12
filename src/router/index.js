import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import Cart from '../views/Cart.vue'
import Admin from '../views/Admin.vue'
import CRUD from '../views/Crud.vue'
import { projectAuth } from '../firebase/config'

// Auth guard
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  //console.log('current user in auth guard', user)
  if (!user) {
    next({ name: 'ProductList'})
  } else {
    next()
  }
}

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (user) {
    next({ name: 'CRUD'})
  } else {
    next()
  }
}

const domain = ''//'/js-elective/4th-handin'
const routes = [
  {
    path: domain+'/',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: domain+'/cart',
    name: 'CartPage',
    component: Cart
  },
  {
    path: domain+'/admin',
    name: 'AdminArea',
    component: Admin,
    beforeEnter: requireNoAuth
  },
  {
    path: domain+'/crud',
    name: 'CRUD',
    component: CRUD,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
