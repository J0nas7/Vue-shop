import { ref } from "@vue/reactivity"
import { projectAuth } from '../firebase/config'

const error = ref(null)

const signup = async (email, password) => {
    error.value = null

    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if (!res) {
            throw new Error('Could not complete the signup')
        }
        error.value = null

        return res
    } catch(err) {
        console.log(err.message)
        error.value = err.message
    }
}

const useSignup= () => {
    

    return { error, signup }

}

export default useSignup