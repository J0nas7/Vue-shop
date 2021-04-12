<template>
    <button @click="toggleNew">Create new product</button>
    <table v-if="formattedDocuments">
        <tr v-for="doc in formattedDocuments" :key="doc.id">
            <td>{{ doc.productName }}</td>
            <td>
                <button @click="toggleUpdate(doc)">EDIT</button>
                <button @click="deleteProd(doc)">DELETE</button>
            </td>
        </tr>
    </table>
</template>

<script>
import { computed } from '@vue/runtime-core'
import getCollection from '../composables/getCollection'
import useStorage from '../composables/useStorage'
import useCollection from '../composables/useCollection'
import { projectFirestore } from '../firebase/config'

export default {
    props: ['searchText'],
    emits: ['toggleNewModule', 'showUpdateModule'],
    setup(props, context) {
        const { documents } = getCollection('products')
        const { deleteDoc } = useCollection('products')
        const { deleteImage } = useStorage()

        const formattedDocuments = computed(() => {
            if (documents.value) {
                return documents.value.filter(doc => {
                    return doc.productName.includes(props.searchText)
                })
            }
        })

        const toggleNew = () => {
            context.emit("toggleNewModule")
        }

        const toggleUpdate = (doc) => {
            context.emit("showUpdateModule", doc)
        }

        // Delete product
        const deleteProd = async (document) => {
            console.log(document)
            if (confirm("Are you sure you want to delete")) {
                console.log("DELETE")
                console.log(document.id)
                console.log(document.filePath)
                await deleteImage(document.filePath)
                await deleteDoc(document.id)

                const cItems = projectFirestore.collection('cartItems').where('productID', '==', document.id)
                cItems.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });
            }
        }

        return { formattedDocuments, toggleNew, toggleUpdate, deleteProd }
    }
}
</script>

<style>

</style>