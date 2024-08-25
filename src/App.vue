<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import {ref, watchEffect} from 'vue'
import NavigationBar from "@/components/NavigationBar.vue";
import axios from "axios";
import router from "@/router/index.js";

const auth0 = useAuth0();
const { loginWithRedirect, logout } = useAuth0();
const isAuthenticated = ref(auth0.isAuthenticated);
const isLoading = ref(auth0.isLoading);
const user = ref(auth0.user);
const hasFamily = ref(false);

const login = () => {
    loginWithRedirect();
}

const logOut = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
}

async function checkFamily() {
    const response = await axios.get("http://localhost:8000/does_user_have_family/" + user.value.sub)
    hasFamily.value = response.data;
}

watchEffect(() => {
    if (isAuthenticated.value && !isLoading.value) {
        checkFamily();
    }
});

async function create_new_family_and_add_user_to_it(user_id, user_name, user_email) {
    await axios.post("http://localhost:8000/create_new_family_and_add_user_to_it", {
        "user_id": user_id,
        "name": user_name,
        "email": user_email,
    })

    hasFamily.value = true;
}

</script>

<template>
    <button v-if="!isAuthenticated && !isLoading" @click="login">Log in</button>
    <button v-if="isAuthenticated && !isLoading" @click="logOut">Log out</button>

    <div v-if="isAuthenticated && !isLoading">
        <p>Unikalne id: {{user.sub}}</p>

        <div v-if="hasFamily">
            <NavigationBar></NavigationBar>
            <RouterView v-bind:user_id="user.sub"></RouterView> <!-- RouterView is where new page is injected -->
        </div>
        <div v-else>
            <button v-on:click="create_new_family_and_add_user_to_it(user.sub, user.name, user.email)">Create new family</button><br>
        </div>
    </div>

</template>
