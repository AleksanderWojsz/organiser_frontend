<script setup>

import NavigationBar from "@/components/NavigationBar.vue";
import {onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const is_logged_in = ref(false)
const user_id = ref("");
const user_email = ref("");
const user_name = ref("");

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
    })
});




import {watchEffect} from 'vue'
import axios from "axios";


const hasFamily = ref(false);
const invitations = ref([])
const show_spinner = ref(false)

// After user is logged in, checks if he is in family and if not, if he has any invitations
watchEffect(async () => {
    if (is_logged_in.value) {
        show_spinner.value = true;
        console.log(user_id.value);
        const response = await axios.get("http://localhost:8000/does_user_have_family/" + user_id.value);
        hasFamily.value = response.data;

        if (response.data === false) {
            const response = await axios.get("http://localhost:8000/get_invitations/" + user_email.value);
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

<div v-if="show_spinner" class="spinner"></div>
<div v-else>
    <div v-if="!hasFamily" class="join-family bg-white p-10 rounded-xl shadow-lg flex flex-col space-y-3 items-center"> <!-- Using show_spinner so this won't appear during loading -->
        <p>Currently you do not belong to any family.</p>
        <p>You can either</p>
        <button class="button-shadow bg-amber-50" v-on:click="create_new_family_and_add_user_to_it(user_id, user_name, user_email)">Create new family</button><br>
        <p>or wait for an invitation:</p>
        <div v-if="invitations.length > 0" v-for="invitation in invitations">
            <button class="button-shadow bg-amber-50" v-on:click="accept_invitation(user_id, invitation, user_name, user_email)">Accept invitation to family: {{invitation}}</button><br>
        </div>
        <div v-if="invitations.length === 0" class="text-black text-opacity-60"> No invitations </div>
    </div>
    <div v-else>
        <NavigationBar v-bind:user_id="user_id"></NavigationBar>
    </div>
</div>

</template>

<style scoped>

.join-family {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
