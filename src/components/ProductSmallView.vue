<template>
    <span class="product__img">
        <img width="200" :src="require('../assets/img/' + product.productImg)" />
    </span>
    <span class="product__name">{{ product.productName }}</span>
    <span class="product__price">DKK {{ product.productPrice }},-</span>
    <span class="product__cta">
        <button class="addToCart" @click="addToCart(product.id)">&raquo; Add to cart</button>
    </span>
</template>

<script>
export default {
    props: ['product'],
    setup(props, context) {
        const product = props.product

        const addToCart = (productId) => {
            context.emit('sendToCart', productId)
        }

        return { product, addToCart }
    }
}
</script>

<style>

</style>