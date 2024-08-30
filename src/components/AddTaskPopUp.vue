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
<div v-on:click.self="closeAddTaskPopUp" class="popup fade-in-fast"> <!-- .self means that it will not run when popup-inner is clicked -->
    <div class="popup-inner space-y-6">

        <textarea placeholder="Description" v-model="description" type="text" id="description" cols="30" class="border rounded-md"></textarea>

        <div>
            <label for="for-whom-select-form">For whom: </label>
            <select v-model="for_whom" id="for-whom-select-form" class="border rounded p-1">
                <option v-for="family_member in family_members" v-bind:value="family_member.user_id">
                    {{family_member.user_id === user_id ? "You" : family_member.name}}
                </option>
            </select>
        </div>

        <div class="flex justify-between">
            <button class="button-shadow bg-amber-100 hover:bg-amber-200" v-on:click="closeAddTaskPopUp">Close</button>
            <button class="button-shadow bg-green-300 hover:bg-green-400" v-on:click="addTask(for_whom, user_id, description, `wczoraj`)">Add</button>
        </div>

    </div>
</div>
</template>

<style scoped>

.popup {
    position: fixed;
    z-index: 3;
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
}

</style>