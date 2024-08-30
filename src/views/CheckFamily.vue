<script setup>

import {watchEffect} from 'vue'
import axios from "axios";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
const router = useRouter();

const hasFamily = ref(false);
const invitations = ref([])
const show_spinner = ref(false)

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
            user_name.value = user.displayName !== null ? user.displayName : user.email;
        } else { // User is signed out
            is_logged_in.value = false;
        }
    })
});

// After user is logged in, checks if he is in family and if not, if he has any invitations
watchEffect(async () => {
    if (is_logged_in.value) {
        show_spinner.value = true;
        const response = await axios.get("https://organiser-backend.onrender.com/does_user_have_family/" + user_id.value);
        hasFamily.value = response.data;

        if (hasFamily.value) {
            // await router.push("/home");
            await router.push({ path: '/tasks', query: { user_id: user_id.value } });
        } else {
            const response = await axios.get("https://organiser-backend.onrender.com/get_invitations/" + user_email.value);
            invitations.value = response.data;
            show_spinner.value = false;
        }
    }
});

async function create_new_family_and_add_user_to_it(user_id, user_name, user_email) {
    show_spinner.value = true;
    await axios.post("https://organiser-backend.onrender.com/create_new_family_and_add_user_to_it", {
        "user_id": user_id,
        "name": user_name,
        "email": user_email,
    })

    hasFamily.value = true;
    show_spinner.value = false;
    await router.push("/home");
}

async function accept_invitation(user_id, invitation, user_name, user_email) {
    show_spinner.value = true;
    await axios.post("https://organiser-backend.onrender.com/add_user_to_existing_family", {
        "user_id": user_id,
        "family_id": invitation,
        "name": user_name,
        "email": user_email,
    })

    hasFamily.value = true;
    show_spinner.value = false;
    await router.push("/home");
}



</script>

<template>

<div v-if="show_spinner" class="spinner"></div>
<div v-else>
    <div v-if="!hasFamily" class="fade-in join-family bg-white p-10 rounded-xl shadow-lg flex flex-col space-y-3 items-center"> <!-- Using show_spinner so this won't appear during loading -->
        <p>Currently you do not belong to any family.</p>
        <p>You can either</p>
        <button class="button-shadow bg-amber-50" v-on:click="create_new_family_and_add_user_to_it(user_id, user_name, user_email)">Create new family</button><br>
        <p>or wait for an invitation:</p>
        <div v-if="invitations.length > 0" v-for="invitation in invitations">
            <button class="button-shadow bg-amber-50" v-on:click="accept_invitation(user_id, invitation, user_name, user_email)">Accept invitation to family: {{invitation}}</button><br>
        </div>
        <div v-if="invitations.length === 0" class="text-black text-opacity-60"> No invitations </div>
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
