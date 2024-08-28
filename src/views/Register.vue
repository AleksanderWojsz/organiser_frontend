<script setup>

import {ref} from "vue";
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { useRouter } from 'vue-router';
const router = useRouter();
const email = ref("");
const password = ref("")
const errorMessage = ref("")

async function register() {
    try {
        await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        await router.push("/feed");
    } catch (error) {
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage.value = "Invalid email format";
                break;
            case 'auth/wrong-password':
                errorMessage.value = "Incorrect password";
                break;
            case 'auth/invalid-credential':
                errorMessage.value = "Invalid credentials";
                break;
            case 'auth/too-many-requests':
                errorMessage.value = "Too many attempts";
                break;
            case 'auth/weak-password':
                errorMessage.value = "Password should be of length at least six";
                break;
            default:
                errorMessage.value = error.code;
                break;
        }
    }
}

async function signInWithGoogle() {
    await signInWithPopup(getAuth(), new GoogleAuthProvider())
    await router.push("/feed");
}

</script>

<template>
<div class="login-box shadow-xl p-10 rounded-xl">
    <form class="flex flex-col space-y-3 items-center">
        <p class="text-2xl">Create an Account</p>
        <input class="border border-gray-100 rounded-md p-1 " type="email" placeholder="Email" v-model="email">
        <input class="border border-gray-100 rounded-md p-1" type="password" placeholder="Password" v-model="password">
        <p class="text-red-400"> {{errorMessage}} </p>
        <button type="button" class="button-shadow bg-green-50 hover:bg-green-100" v-on:click="register">Submit</button>
    </form>
    <div class="flex flex-col space-y-3 items-center">
        <div class="line mt-5"></div>
        <div v-on:click="signInWithGoogle" style="cursor: pointer" class="flex flex-row space-x-3 items-center">
            <p> Sign In With </p>
            <img src="/src/assets/google.png" class="logo">
        </div>
        <div class="line mt-5"></div>
        <button type="button" v-on:click="router.push('/')">Sign In</button>
    </div>
</div>
</template>

<style scoped>

.line {
    width: 75%;
    height: 1px;
    background-color: #b6b3b3;
}

.logo {
    height: 30px;
    width: auto;
}


.login-box {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}


</style>