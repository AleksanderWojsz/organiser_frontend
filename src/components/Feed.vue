<script setup>

import {onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import router from "@/router/index.js";

const is_logged_in = ref(false)
const user_id = ref("");

let auth;
onMounted(() => {
    auth = getAuth() // object managing authentication
    onAuthStateChanged(auth, (user) => { // listens for changes in authentication
        if (user) { // User is signed in
            is_logged_in.value = true;
            user_id.value = user.uid;
        } else { // User is signed out
            is_logged_in.value = false;
            user_id.value = ""
        }
    })
});

async function handleSignOut() {
    await signOut(auth);
    await router.push("/");
}

</script>

<template>
Feed {{user_id}}
<button v-if="is_logged_in" @click="handleSignOut">Sign out</button>


</template>
