<template>
    <form @submit.prevent="handleCreate">
        <div><input type="text" v-model="productName" placeholder="Product name"></div>
        <div><input type="text" v-model="productDesc" placeholder="Product short description"></div>
        <div><input type="text" v-model="productPrice" placeholder="Product price"></div>
        <div>
            <span>Product image:</span><br>
            <input type="file" accept="image/*" @change="changeImage">
        </div>
        <div><input type="text" v-model="productHighlight" placeholder="Highlight? y or n"></div>
        <div><button>Create product</button></div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '../composables/useStorage'
import useCollection from '../composables/useCollection'

export default {
    emits: ['toggleNewModule'],
    setup(props, context) {
        const productName = ref('')
        const productDesc = ref('')
        const productPrice = ref('')
        const productHighlight = ref('')

        const file = ref(null)
        const types = ['image/png', 'image/jpeg']
        const changeImage = (e) => {
            let image = e.target.files[0];
            
            if (image && types.includes(image.type)) {
                file.value = image
            } else {
                file.value = null
                alert("Please select an image file (png or jpg)")
            }
        }

        const { filePath, url, uploadImage } = useStorage()
        const { error, addDoc } = useCollection('products')
        const handleCreate = async () => {
            console.log("New product")
            console.log(productName.value)
            const product = {
                productName: productName.value,
                productDesc: productDesc.value,
                productPrice: productPrice.value,
                productHighlight: productHighlight.value == 'y' ? true : false
            }

            if (file.value) {
                await uploadImage(file.value)
                product.imageUrl = url.value
                product.filePath = filePath.value
                await addDoc(product)
                if (!error.value) {
                    context.emit("toggleNewModule")
                    productName.value = ''
                    productDesc.value = ''
                    productPrice.value = ''
                    productHighlight.value = ''
                    url.value = ''
                    filePath.value = ''
                } else {
                    alert("Creation failed! Please try again.")
                }
            } else {
                alert("Please select a product image")
            }
        }

        return { productName, productDesc, productPrice, productHighlight, changeImage, handleCreate }
    }
}
</script>

<style>

</style>