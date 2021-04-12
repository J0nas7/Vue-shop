import { ref } from "@vue/reactivity"
import { projectAuth, projectFirestore } from '../firebase/config'

const errorLogin = ref(null)

const login = async (email, password) => {
    errorLogin.value = null

    try {
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        errorLogin.value = null
        console.log(res)
        return res
    } catch(err) {
        console.log(err.message)
        errorLogin.value = 'Incorrect login credentials'
    }
}

const useLogin = () => {
    return { errorLogin, login }
}

export default useLogin