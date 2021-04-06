<template>
    <span>{{ productId }}</span>
    <span>{{ productCount }}</span>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
    props: ['cartitem'],
    setup(props) {
        const itemDetails = props.cartitem.split(":");
        const productId = ref(itemDetails[0])
        const productCount = ref(itemDetails[1])

        return { productId, productCount }
    }
}
</script>

<style>

</style>