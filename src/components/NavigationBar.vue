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
<nav class="relative rounded-xl mx-auto p-2 m-2 flex justify-between items-center
      sm:w-[90%]
      md:w-[90%]
      lg:w-[80%]
      xl:w-[70%]
      2xl:w-[60%]">

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
        <button v-on:click="show_popup = true" class="button-shadow bg-amber-300 hover:bg-yellow-500 text-black">Invite to family</button>
        <button @click="logOut" class="button-shadow bg-red-400 hover:bg-red-600">Log out</button>
    </div>

</nav>
<InviteToFamilyPopUp v-if="show_popup" v-bind:user_id="user_id" v-bind:close-invite-to-family-pop-up="closeInviteToFamilyPopUp"></InviteToFamilyPopUp>
<hr>
</template>
