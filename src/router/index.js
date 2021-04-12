import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import Cart from '../views/Cart.vue'
import Admin from '../views/Admin.vue'
import CRUD from '../views/Crud.vue'

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: Cart
  },
  {
    path: '/admin',
    name: 'AdminArea',
    component: Admin
  },
  {
    path: '/crud',
    name: 'CRUD',
    component: CRUD
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
