<template>
    <div v-if="!createNew && !updateProd">
        <Searchbar @search="performSearch" />
        <CrudR :searchText="searchTerm" @toggleNewModule="createNew = !createNew" @showUpdateModule="showUpdate" />
    </div>
    <div v-if="createNew">
        <CrudC @toggleNewModule="createNew = !createNew" />
    </div>
    <div v-if="updateProd">
        <CrudU :product="updateProd" @hideUpdate="hideUpdate" />
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Searchbar from '../components/Searchbar.vue'
import CrudR from '../components/CrudR.vue'
import CrudC from '../components/CrudC.vue'
import CrudU from '../components/CrudU.vue'
import useCollection from '../composables/useCollection'
import useStorage from '../composables/useStorage'

export default {
    components: { Searchbar, CrudR, CrudC, CrudU },
    setup() {
        const createNew = ref(false)
        const updateProd = ref(false)
        const searchTerm = ref('')

        const performSearch = (search) => {
            searchTerm.value = search.value
            console.log("SEARCHTERM", searchTerm.value)
        }

        const showUpdate = (doc) => {
            updateProd.value = doc
        }

        const hideUpdate = () => {
            updateProd.value = false
        }

        return { performSearch, createNew, searchTerm, updateProd, showUpdate, hideUpdate }
    }
}
</script>

<style>

</style>