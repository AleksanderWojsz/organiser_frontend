<script setup>

import Register from "@/views/Register.vue";
import SignIn from "@/views/SignIn.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import {onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const is_logged_in = ref(false)
const user_id = ref("");
const user_email = ref("");
const user_name = ref("");
const loading = ref(true);

let auth;
onMounted(() => {
    auth = getAuth() // object managing authentication
    onAuthStateChanged(auth, (user) => { // listens for changes in authentication
        if (user) { // User is signed in
            is_logged_in.value = true;
            user_id.value = user.uid;
            user_email.value = user.email;
            user_name.value = user.email;
        } else { // User is signed out
            is_logged_in.value = false;
            user_id.value = ""
            user_email.value = ""
            user_name.value = ""
        }
        loading.value = false;
    })
});


</script>

<template>
<div v-if="!loading">

    <div v-if="!is_logged_in">
        <Register></Register>
        <hr>
        <SignIn></SignIn>
    </div>
    <div v-else>
        <NavigationBar v-bind:user_id="user_id"></NavigationBar>
    </div>
    <RouterView></RouterView>

</div>
</template>
