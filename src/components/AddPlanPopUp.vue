<script setup>
    import { ref } from "vue";

    const props = defineProps({
        addTask: Function,
        closeAddTaskPopUp: Function,
        user_id: String,
        family_members: [],
    })

    const description = ref("")
    const for_whom = ref(props.user_id) // v-model is used in select, so this will be value selected by default

</script>

<template>
    <div class="popup">
      <div class="popup-inner">

        <form>
            <label for="description">Description:</label>
            <input v-model="description" type="text" id="description"><br>
            <label for="for-whom-select-form">For whom:</label>
            <select v-model="for_whom" id="for-whom-select-form">
                <option v-for="family_member in family_members" v-bind:value="family_member.user_id">
                    {{family_member.user_id === user_id ? "You" : family_member.name}}
                </option>
            </select>
        </form>

        <button v-on:click="addTask(for_whom, user_id, description, `wczoraj`)">Add</button><br>
        <button v-on:click="closeAddTaskPopUp">Close</button>
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