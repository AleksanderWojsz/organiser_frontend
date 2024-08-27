<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import {ref, watchEffect} from 'vue'
import NavigationBar from "@/components/NavigationBar.vue";
import axios from "axios";
import Footer from "@/components/Footer.vue";

const auth0 = useAuth0();
const { loginWithRedirect, logout } = useAuth0();
const isAuthenticated = ref(auth0.isAuthenticated);
const isLoading = ref(auth0.isLoading);
const user = ref(auth0.user);
const hasFamily = ref(false);
const invitations = ref([])
const show_spinner = ref(false)

const login = async () => {
    await loginWithRedirect();
}
const logOut = async () => {
    await logout({logoutParams: {returnTo: window.location.origin}});
}

// After user is logged in, checks if he is in family and if not, if he has any invitations
watchEffect(async () => {
    if (isAuthenticated.value && !isLoading.value) {
        show_spinner.value = true;
        console.log(user.value.sub);
        const response = await axios.get("http://localhost:8000/does_user_have_family/" + user.value.sub);
        hasFamily.value = response.data;

        if (response.data === false) {
            const response = await axios.get("http://localhost:8000/get_invitations/" + user.value.email);
            invitations.value = response.data;
        }
        show_spinner.value = false;
    }
});

async function create_new_family_and_add_user_to_it(user_id, user_name, user_email) {
    show_spinner.value = true;
    await axios.post("http://localhost:8000/create_new_family_and_add_user_to_it", {
        "user_id": user_id,
        "name": user_name,
        "email": user_email,
    })

    hasFamily.value = true;
    show_spinner.value = false;
}

async function accept_invitation(user_id, invitation, user_name, user_email) {
    show_spinner.value = true;
    await axios.post("http://localhost:8000/add_user_to_existing_family", {
        "user_id": user_id,
        "family_id": invitation,
        "name": user_name,
        "email": user_email,
    })

    hasFamily.value = true;
    show_spinner.value = false;
}


</script>

<template>
<div class="flex flex-col h-screen justify-between">

    <div v-if="show_spinner || isLoading" class="spinner"></div>

    <button v-if="!isAuthenticated && !isLoading" @click="login">Log in</button>
    <div v-else-if="!isLoading">
        <div v-if="hasFamily">
            <NavigationBar v-bind:user_id="user.sub" v-bind:logOut="logOut"></NavigationBar>
            <RouterView v-bind:user_id="user.sub"></RouterView> <!-- RouterView is where new page is injected -->
        </div>
        <div v-else-if="show_spinner === false"> <!-- Using show_spinner so this won't appear during loading -->
            <button v-on:click="create_new_family_and_add_user_to_it(user.sub, user.name, user.email)">Create new family</button><br>
            <div v-if="invitations.length > 0" v-for="invitation in invitations">
                <button v-on:click="accept_invitation(user.sub, invitation, user.name, user.email)">Accept invitation to family: {{invitation}}</button><br>
            </div>
        </div>
    </div>
    <Footer class="mt-24 mb-1"></Footer>

</div>
</template>
