<template>
  <Searchbar @search="performSearch" />
  <span class="productsLength" v-if="formattedDocuments">{{ formattedDocuments.length }} products</span>
  <div v-if="documents" class="products">
    <div class="product" v-for="doc in formattedDocuments" :key="doc.id">
        <ProductSmallView @sendToCart="addToCart" :product="doc" />
    </div>
  </div>
  <div class="cart">
        <span>Shopping Cart ()</span>
        <!--<div class="cartItems" v-if="cartObj">
            <div class="cartItem" v-for="(item, index) in cartObj" :key="index">
                <Cart :cartitem="item" />
            </div>
        </div>-->
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import ProductSmallView from '../components/ProductSmallView.vue'
import Searchbar from '../components/Searchbar.vue'
import Cart from '../components/Cart.vue'
import getCollection from '../composables/getCollection'
import { computed } from '@vue/runtime-core'
import { projectFirestore, timestamp } from '../firebase/config'

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

        let cartID = null

        const addToCart = (productId) => {
            if (localStorage.getItem("cartID")) {
                cartID = localStorage.getItem("cartID")
                projectFirestore.collection("cartItems").add({
                    createdAt: timestamp(),
                    cartID: cartID,
                    productID: productId
                })
            } else {
                createCart();
            }
        }

        const createCart = () => {
            projectFirestore.collection("carts").add({
                createdAt: timestamp()
            })
            .then(function(docRef) {
                const docId = docRef.id;
                localStorage.setItem("cartID", docId)
            });
        }

        return { searchTerm, performSearch, error, documents, formattedDocuments, addToCart }
    }
}
</script>

<style>

</style>