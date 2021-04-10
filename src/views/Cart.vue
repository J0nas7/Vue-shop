<template>
    <div class="cartContainer">
        <div class="cartSum">
            <span class="head">Order summary</span>
            <span class="content">
                <span class="price">Price: <span>DKK {{ totalPrice }},-</span></span>
                <button class="checkout" disabled>&raquo; Proceed to checkout</button>
            </span>
        </div>
        <div v-if="cartItems.length">
            <div class="cartItem" v-for="cartItem in cartItems" :key="cartItem.id">
                <Cart :cartitem="cartItem" :showProductView="'ok'" @addToTotalPrice="totalPricePlus" />
            </div>
        </div>
        <div v-else>Loading...</div>
    </div>

  <div v-if="!cartID">You don't have an active card.<br><span @click="goShop" class="blueLink crsPnt">Go to the frontpage</span> and start shopping ;)</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { projectFirestore, timestamp } from '../firebase/config'

import Cart from '../components/Cart.vue'

export default {
    components: { Cart },
    setup() {
        const router = useRouter()
        let cartID = null
        let totalPrice = ref(null)

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

        const totalPricePlus = (plusPrice) => {
            totalPrice.value = totalPrice.value + plusPrice
        }

        if (localStorage.getItem("cartID")) {
            cartID = localStorage.getItem("cartID")
            startCart()
        }

        const goShop = () => {
            router.push({ name: 'ProductList' })
        }

        return { cartID, goShop, cartItems, totalPricePlus, totalPrice }
    }
}
</script>

<style>

</style>