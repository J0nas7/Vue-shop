<template>
  <div class="searchbar">
      <form @submit.prevent="">
          <input @keypress="handleSearch" class="searchfield" type="text" placeholder="Search in items..." v-model="searchText" />
      </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup(props, context) {
        const searchText = ref('')

        const handleSearch = () => {
            context.emit('search', searchText)
        }

        return { searchText, handleSearch }
    }
}
</script>

<style>

</style>