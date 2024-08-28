<script setup>

import {ref} from "vue";
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { useRouter } from 'vue-router';
const router = useRouter();
const email = ref("");
const password = ref("")

async function register() {
    await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    await router.push("/feed");
    console.log("Successfully registered!");
}

async function signInWithGoogle() {
    await signInWithPopup(getAuth(), new GoogleAuthProvider())
    await router.push("/feed");
}

</script>

<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p>
        <button v-on:click="register">Submit</button>
    </p>
    <p>
        <button v-on:click="signInWithGoogle">Sign In With Google</button>
    </p>

</template>

<style scoped>

</style>