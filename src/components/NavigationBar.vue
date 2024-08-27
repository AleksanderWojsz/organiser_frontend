<script setup>

import InviteToFamilyPopUp from "@/components/InviteToFamilyPopUp.vue";
import {ref} from "vue";

defineProps({
    user_id: String,
    logOut: Function,
})

const show_popup = ref(false);

function closeInviteToFamilyPopUp() {
    show_popup.value = false;
}

</script>

<template>
<nav class="relative container rounded-xl mx-auto p-2 m-2 bg-amber-400 flex justify-between items-center w-[100vw]">
    <RouterLink to="/" class="flex items-center space-x-1">
        <img src="/src/assets/logo.jpg" class="h-[3rem]" alt="Logo">
        <span class="text-black text-3xl font-handwriting">Organiser</span>
    </RouterLink>
    <div class="hidden md:flex space-x-6">
        <RouterLink to="/tasks" class="button-shadow bg-amber-50 hover:bg-amber-50">Tasks</RouterLink>
        <RouterLink to="/list" class="button-shadow bg-amber-50 hover:bg-amber-50">List</RouterLink>
        <RouterLink to="/chat" class="button-shadow bg-amber-50 hover:bg-amber-50">Chat</RouterLink>
    </div>
    <div class="hidden md:flex items-center space-x-6">
        <div>
            <button v-on:click="show_popup = true" class="button-shadow bg-amber-400 hover:bg-yellow-600 text-black">Invite to family</button>
            <InviteToFamilyPopUp v-if="show_popup" v-bind:user_id="user_id" v-bind:close-invite-to-family-pop-up="closeInviteToFamilyPopUp"></InviteToFamilyPopUp>
        </div>
        <button @click="logOut" class="button-shadow bg-red-500 hover:bg-red-700">Log out</button>
    </div>
</nav>
</template>



<style scoped>

.button-shadow {
    display: inline-block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 1);
    border: 1px solid rgba(0, 0, 0, 1);
    transition: box-shadow 0.3s, border-color 0.3s;
}

.button-shadow:hover {
    box-shadow: 1px 1px 0 rgba(0, 0, 0, 1);
    border-color: rgba(0, 0, 0, 1);
}

</style>

