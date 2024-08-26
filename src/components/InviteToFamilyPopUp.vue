<script setup>

import { ref } from "vue";
import axios from "axios";

const props = defineProps({
    closeInviteToFamilyPopUp: Function,
    user_id: String,
})

const email = ref("")

async function addInvitation() {
    await axios.post("https://organiser-backend.onrender.com/add_invitation", {
        "who_invited": props.user_id,
        "invited_email": email.value,
    })

    props.closeInviteToFamilyPopUp()
}

</script>

<template>
    <div class="popup">
      <div class="popup-inner">
        <form>
            <label for="email">This person's email:</label>
            <input v-model="email" type="email" id="email"><br>
            <button v-on:click.prevent="addInvitation">Send</button><br>
            <button v-on:click.prevent="closeInviteToFamilyPopUp">Close</button>
        </form>
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
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner {
        background: #FFFF;
        padding: 32px;
    }

}
</style>