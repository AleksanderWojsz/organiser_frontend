<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from 'vue'
import NavigationBar from "@/components/NavigationBar.vue";

const auth0 = useAuth0();
const { loginWithRedirect, logout } = useAuth0();
const isAuthenticated = ref(auth0.isAuthenticated);
const isLoading = ref(auth0.isLoading);
const user = ref(auth0.user);

const login = () => {
    loginWithRedirect();
}

const logOut = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
}

const user_id = 1;

</script>

<template>
    <button v-if="!isAuthenticated && !isLoading" @click="login">Log in</button>
    <button v-if="isAuthenticated && !isLoading" @click="logOut">Log out</button>

    <div v-if="isAuthenticated && !isLoading">
        <p>Unikalne id: {{user.sub}}</p>
    </div>


    <NavigationBar></NavigationBar>
    <RouterView v-bind:user_id="user_id"></RouterView>
</template>
