<template>
  <Searchbar @search="performSearch" />
  <span class="productsLength">{{ formattedDocuments.length }} products</span>
  <div v-if="documents" class="products">
    <div class="product" v-for="doc in formattedDocuments" :key="doc.id">
        <ProductSmallView :product="doc" />
    </div>
  </div>
  <Cart />
</template>

<script>
import { ref } from '@vue/reactivity'
import ProductSmallView from '../components/ProductSmallView.vue'
import Searchbar from '../components/Searchbar.vue'
import Cart from '../components/Cart.vue'
import getCollection from '../composables/getCollection'
import { computed } from '@vue/runtime-core'

export default {
    components: { ProductSmallView, Searchbar, Cart },
    setup() {
        const { error, documents } = getCollection('products')

        const formattedDocuments = computed(() => {
            if (documents.value) {
                return documents.value.filter(doc => {
                    return doc.productName.includes(searchTerm.value)
                })
            }
        })

        const searchTerm = ref('')

        const performSearch = (search) => {
            searchTerm.value = search.value
            console.log("SEARCHTERM", searchTerm.value)
        }

        return { searchTerm, performSearch, error, documents, formattedDocuments }
    }
}
</script>

<style>

</style>