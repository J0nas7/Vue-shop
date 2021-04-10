<template>
  <div id="app" class="container">
    <div class="topbar">
      <h1>Skillema-dinga-du vue-shop</h1>
      <button @click="goToAdmin" id="admin">Admin</button>
    </div>
    <router-view/>
    <div class="clrBth"></div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const goToAdmin = () => {
      router.push({ name: 'AdminArea' })
    }

    return { goToAdmin }
  }
}
</script>
