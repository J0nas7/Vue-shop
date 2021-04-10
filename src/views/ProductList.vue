<template>
  <Searchbar @search="performSearch" />
  <span class="productsLength" v-if="formattedDocuments">{{ formattedDocuments.length }} products</span>
  <div v-if="documents" class="products">
    <div class="product" :class="{ 'product--highlighted' : doc.productHighlight }" v-for="doc in formattedDocuments" :key="doc.id">
        <ProductSmallView @sendToCart="addToCart" :product="doc" />
    </div>
  </div>
  <div class="cart">
        <strong>Shopping Cart ({{ cartItems.length }})</strong>
        <div class="cartItems" v-if="cartItems.length">
            <div class="cartItem" v-for="cartItem in cartItems" :key="cartItem.id">
                <Cart :cartitem="cartItem" @addToTotalPrice="totalPricePlus" />
            </div>
            <span class="totalPrice">Total price:<br><strong>DKK {{ totalPrice }},-</strong></span>
            <button @click="goToCart" class="cta_cart">Go to cart</button>
        </div>
        <div v-else>Loading...</div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import ProductSmallView from '../components/ProductSmallView.vue'
import Searchbar from '../components/Searchbar.vue'
import Cart from '../components/Cart.vue'
import getCollection from '../composables/getCollection'
import { computed } from '@vue/runtime-core'
import { projectFirestore, timestamp } from '../firebase/config'

export default {
    components: { ProductSmallView, Searchbar, Cart },
    setup() {
        const router = useRouter()

        const { error, documents } = getCollection('products')

        const searchTerm = ref('')

        const formattedDocuments = computed(() => {
            if (documents.value) {
                return documents.value.filter(doc => {
                    return doc.productName.includes(searchTerm.value)
                })
            }
        })

        const performSearch = (search) => {
            searchTerm.value = search.value
            console.log("SEARCHTERM", searchTerm.value)
        }

        let cartID = null
        const addToCart = (productId) => {
            if (localStorage.getItem("cartID")) {
                cartID = localStorage.getItem("cartID")
                console.log("CartID", cartID)
                console.log("ProductID", productId)
                checkCartItem(productId, cartID)
            } else {
                createCart(productId)
            }
        }

        const createCartItem = (productId) => {
            if (cartID) {
                projectFirestore.collection("cartItems").add({
                    createdAt: timestamp(),
                    cartID: cartID,
                    productID: productId,
                    counter: 1
                })
            }
        }

        const updateCounter = (docId, newCount) => {
            if (cartID) {
                if (newCount > 0) {
                    projectFirestore.collection("cartItems").doc(docId).update({ // Update cartItem
                        counter: newCount
                    })
                }
            }
        }

        const checkCartItem = (productId, cartID) => {
            if (localStorage.getItem("cartID")) {
                cartID = localStorage.getItem("cartID")
                let query = projectFirestore.collection("cartItems")
                    .where('cartID', '==', cartID)
                    .where('productID', '==', productId)
                    .limit(1)
                query.get().then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        createCartItem(productId)
                    } else {
                        updateCounter(querySnapshot.docs[0].id, (querySnapshot.docs[0].data().counter + 1))
                    }
                });
            }
        }

        const createCart = (productId) => {
            projectFirestore.collection("carts").add({
                createdAt: timestamp()
            })
            .then(function(docRef) {
                const docId = docRef.id
                localStorage.setItem("cartID", docId)
                cartID = docId
                startCart()
                addToCart(productId)
            });
        }
        
        const cartItems = ref([])
        const startCart = () => {
            projectFirestore.collection('cartItems')
                .where('cartID', '==', cartID)/*.get()
                .then((querySnapshot) => {*/
                .onSnapshot((snap) => {
                    cartItems.value = []
                    totalPrice.value = 0
                    setTimeout(() => {
                        cartItems.value = []
                        snap.docs.forEach((doc) => {
                            doc.data().createdAt && cartItems.value.push({ ...doc.data(), id: doc.id })
                        });
                    }, 1000)
                });
        }

        if (localStorage.getItem("cartID")) {
            cartID = localStorage.getItem("cartID")
            startCart()
        }

        const totalPrice = ref(0)
        const totalPricePlus = (plusPrice) => {
            totalPrice.value = totalPrice.value + plusPrice
        }

        const goToCart = () => {
            router.push({ name: 'CartPage' })
        }

        return { searchTerm, performSearch, error, documents, formattedDocuments, addToCart, cartItems, totalPricePlus, totalPrice, cartID, goToCart }
    }
}
</script>

<style>

</style>