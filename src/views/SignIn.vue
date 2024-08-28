<script setup>

import {ref} from "vue";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { useRouter } from 'vue-router';
const router = useRouter(); 

const email = ref("");
const password = ref("")
const errorMessage = ref("")


async function register() {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value)
    await router.push("/feed");
    console.log("Successfully logged in!");
}

</script>

<template>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p v-if="errorMessage">{{errorMessage}}</p>
    <p><button v-on:click="register">Submit</button></p>

</template>

<style scoped>

</style>