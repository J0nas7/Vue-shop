<template>
    <span class="product__img" v-if="theImg">
        <img :width="imgSize" :src="theImg" />
    </span>
    <span class="product__name" v-if="!mini">{{ product.productName }}</span>
    <span class="product__desc" v-if="!mini">{{ product.productDesc }}</span>
    <span class="product__price" v-if="!mini">DKK {{ product.productPrice }},-</span>
    <span class="product__cta" v-if="!mini">
        <button class="addToCart" @click="addToCart(product.id)">&raquo; Add to cart</button>
    </span>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    props: ['product', 'mini'],
    emits: ["sendToCart"],
    setup(props, context) {
        const mini = props.mini == 'y' ? true : false
        const imgSize = mini ? 70 : 200
        const product = props.product
        let theImg = ref('')

        if (product.imageUrl) {
            theImg = product.imageUrl
        } else {
            //theImg = require('../assets/img/' + product.productImg)
        }

        const addToCart = (productId) => {
            context.emit('sendToCart', productId)
        }

        return { product, addToCart, imgSize, mini, theImg }
    }
}
</script>

<style>

</style>