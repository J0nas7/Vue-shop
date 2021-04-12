<template>
    <div v-if="loginWndw">
        <form @submit.prevent="handleLogin">
            <div><input type="text" v-model="email" placeholder="E-mail"></div>
            <div><input type="password" v-model="password" placeholder="********"></div>
            <div><button class="loginBtn">Login</button></div>
            <div class="error">{{ errorLogin }}</div>
            <div>Don't have an admin account? <span class="blueLink" @click="loginWndw = false">Create one here</span></div>
        </form>
    </div>
    <div v-else>
        <form @submit.prevent="handleCreate">
            <div><input type="text" v-model="newEmail" placeholder="E-mail"></div>
            <div><input type="password" v-model="newPassword" placeholder="********"></div>
            <div><input type="text" v-model="adminCode" placeholder="Admin kode"></div>
            <div><button class="loginBtn">Create</button></div>
            <div class="error">{{ error }}</div>
            <div>Already have an admin account? <span class="blueLink" @click="loginWndw = true">Login here</span></div>
        </form>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignup from '../composables/useSignup'
import useLogin from '../composables/useLogin'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { error, signup } = useSignup()
        const { errorLogin, login } = useLogin()
        const router = useRouter()

        const loginWndw = ref(true)
        const email = ref('')
        const password = ref('')
        const newEmail = ref('')
        const newPassword = ref('')
        const adminCode = ref('')

        const handleCreate = async () => {
            await signup(email.value, password.value)
            if (!error.value) {
                console.log("created")
                router.push({ name: 'CRUD' })
            }
        }

        const handleLogin = async () => {
            await login(email.value, password.value)
            if (!errorLogin.value) {
                console.log("logged in")
                router.push({ name: 'CRUD' })
            }
        }

        return { loginWndw, email, password, newEmail, newPassword, adminCode, handleCreate, handleLogin, error, errorLogin }
    }
}
</script>

<style>

</style>