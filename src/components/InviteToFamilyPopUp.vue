<script setup>

import { ref } from "vue";
import axios from "axios";

const props = defineProps({
    closeInviteToFamilyPopUp: Function,
    user_id: String,
})

const email = ref("")

async function addInvitation() {
    props.closeInviteToFamilyPopUp()

    await axios.post("http://localhost:8000/add_invitation", {
        "who_invited": props.user_id,
        "invited_email": email.value,
    })
}

</script>

<template>
<div v-on:click.self="closeInviteToFamilyPopUp" class="popup fade-in-fast">
    <div class="popup-inner">
        <input class="mb-6 border rounded-md w-full" v-model="email" placeholder="This person's email" type="email" id="email"><br>

        <div class="flex justify-between">
            <button class="button-shadow bg-amber-100 hover:bg-amber-200" v-on:click.prevent="closeInviteToFamilyPopUp">Close</button>
            <button class="button-shadow bg-green-300 hover:bg-green-400" v-on:click.prevent="addInvitation">Send</button>
        </div>
    </div>
</div>
</template>

<style scoped>

.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-inner {
    background: #FFFF;
    padding: 32px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 50%;
}

</style>