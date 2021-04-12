import { ref } from "@vue/reactivity"
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
    const error = ref(null)

    const addDoc = async (doc) => {
        error.value = null

        try {
            await projectFirestore.collection(collection).add(doc)
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not create the document'
        }
    }

    const deleteDoc = async (id) => {
        error.value = null

        try {
            await projectFirestore.collection(collection).doc(id).delete()
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not delete the document'
        }
    }

    const updateDoc = async (id, updates) => {
        error.value = null

        try {
            await projectFirestore.collection(collection).doc(id).update(updates)
        } catch(err) {
            console.log(err.message)
            error.value = 'Could not update the document'
        }
    }

    return { error, addDoc, deleteDoc, updateDoc }
}

export default useCollection