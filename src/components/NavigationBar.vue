<script setup>

import InviteToFamilyPopUp from "@/components/InviteToFamilyPopUp.vue";
import {ref} from "vue";

const props = defineProps({
    user_id: String,
})

const show_popup = ref(false);

function closeInviteToFamilyPopUp() {
    show_popup.value = false;
}

</script>

<template>

    <ul class="flex">
        <li class="mr-6">
            <RouterLink to="/tasks" class="text-blue-500 hover:text-blue-800">Tasks</RouterLink>
        </li>
        <li class="mr-6">
            <RouterLink to="/list" class="text-blue-500 hover:text-blue-800">List</RouterLink>
        </li>
        <li class="mr-6">
            <RouterLink to="/chat" class="text-blue-500 hover:text-blue-800">Chat</RouterLink>
        </li>
        <li class="mr-6">
            <button v-on:click="show_popup = true">Invite to family</button>
            <InviteToFamilyPopUp v-if="show_popup" v-bind:user_id="user_id" v-bind:close-invite-to-family-pop-up="closeInviteToFamilyPopUp"></InviteToFamilyPopUp>
        </li>

    </ul>


</template>
