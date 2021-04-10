<template>
    <div class="productView" v-if="productDetails.productImg">
        <ProductSmallView :product="productDetails" :mini="mini" />
    </div>
    <div class="cartitem">
        <span class="pName">{{ productCount }}x {{ productDetails.productName }} </span>
        <span class="pPrice">
            <span>Price: {{ countPrice }}</span>
            <small> ({{ productDetails.productPrice }}/each)</small>
        </span>
        <span class="pCounter">
            <button @click="adjustCount('plus')" class="plus">+</button>
            <button @click="adjustCount('minus')" class="minus">-</button>
        </span>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import ProductSmallView from '../components/ProductSmallView.vue'
import { projectFirestore, timestamp } from '../firebase/config'

export default {
    props: ['cartitem', 'showProductView'],
    emits: ['addToTotalPrice'],
    components: { ProductSmallView },
    setup(props, context) {
        const showProductView = props.showProductView ? true : false
        const mini = showProductView ? 'n' : 'y'
        const productId = props.cartitem.productID
        const productCount = props.cartitem.counter
        const productDetails = ref({})
        const countPrice = ref({})

        projectFirestore.collection('products').doc(productId).get()
            .then((doc) => {
                productDetails.value = { ...doc.data(), id: doc.id }
                countPrice.value = doc.data().productPrice * productCount
                sendPrice(countPrice.value)
            });

        const sendPrice = (thePrice) => {
            context.emit('addToTotalPrice', thePrice)
        }

        const adjustCount = (action) => {
            const newCount = (action == "plus" ? (productCount + 1) : (productCount - 1))
            projectFirestore.collection("cartItems").doc(props.cartitem.id).update({ // Update cartItem
                counter: newCount
            })
        }

        return { productId, productCount, productDetails, countPrice, adjustCount, showProductView, mini }
    }
}
</script>

<style>

</style>