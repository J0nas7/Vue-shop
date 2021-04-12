<template>
    <form @submit.prevent="handleUpdate">
        <div><input type="text" v-model="editName" placeholder="Product name"></div>
        <div><input type="text" v-model="editDesc" placeholder="Product short description"></div>
        <div><input type="text" v-model="editPrice" placeholder="Product price"></div>
        <div>
            <span>Update image:</span><br>
            <small>Leave empty to keep existing ({{ editImg }})</small><br>
            <input type="file" accept="image/*" @change="editImage">
        </div>
        <div><input type="text" v-model="editHighlight" placeholder="Highlight? y or n"></div>
        <div><button>Save changes</button></div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useCollection from '../composables/useCollection'
import useStorage from '../composables/useStorage'

export default {
    props: ['product'],
    emits: ['hideUpdate'],
    setup(props, context) {
        const { error, updateDoc } = useCollection('products')
        const { filePath, url, uploadImage } = useStorage()

        const editName = ref('')
        const editDesc = ref('')
        const editPrice = ref('')
        const editHighlight = ref('')
        
        const editImg = ref('')
        const file = ref(null)
        const types = ['image/png', 'image/jpeg']

        const product = ref(null)
        product.value = props.product
        editName.value = product.value.productName
        editDesc.value = product.value.productDesc
        editPrice.value = product.value.productPrice
        editHighlight.value = product.value.productHighlight ? 'y' : 'n'
        editImg.value = product.value.filePath
        file.value = null

        const editImage = (e) => {
            let image = e.target.files[0]
            if (image && types.includes(image.type)) {
                file.value = image
            } else {
                file.value = null
                alert("Please select an image file (png or jpg)")
            }
        }

        const handleUpdate = async () => {
            console.log("Update product")
            const updates = {
                productName: editName.value,
                productDesc: editDesc.value,
                productPrice: editPrice.value,
                productHighlight: editHighlight.value == 'y' ? true : false
            }

            if (file.value) {
                await uploadImage(fileUpdate.value)
                updates.imageUrl = url.value
                updates.filePath = filePath.value
            }

            await updateDoc(product.value.id, updates)
            if (!error.value) {
                product.value = false
                editName.value = ''
                editDesc.value = ''
                editPrice.value = ''
                editHighlight.value = ''
                url.value = ''
                filePath.value = ''
                file.value = null
                context.emit('hideUpdate')
            } else {
                alert("Update failed!")
                console.log(error.value)
            }
        }

        return { editName, editDesc, editPrice, editHighlight, editImg, editImage, handleUpdate }
    }
}
</script>

<style>

</style>