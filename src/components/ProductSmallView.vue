<template>
    <span class="product__img">
        <img width="200" :src="require('../assets/img/' + product.productImg)" />
    </span>
    <span class="product__name">{{ product.productName }}</span>
    <span class="product__price">DKK {{ product.productPrice }},-</span>
    <span class="product__cta">
        <button class="add_to_card">&raquo; Add to cart</button>
    </span>
</template>

<script>
export default {
    props: ['product'],
    setup(props) {
        const product = props.product
        return { product }
    }
}
</script>

<style>

</style>