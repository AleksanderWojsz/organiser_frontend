<script setup>
defineProps({
    task: Object,
    user_id: String,
    deleteTaskFunction: Function,
    display_done_button: Boolean,
})
</script>

<template>
<div class="card w-full md:w-1/2 mx-2">
    <div class="pr-14 space-y-2">
        <p> {{task.description}} </p>
        <hr>
        <p> From: {{ task.from_whom_name }} </p>
        <button v-if="display_done_button" v-on:click="deleteTaskFunction(task.task_id)" class="button-shadow bg-green-200 hover:bg-green-400">Done</button> <br>
    </div>
</div>
</template>

<style scoped>
.card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 10px;
    padding: 2rem;
    word-wrap: break-word;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);
    background-color: #fffbeb;
}
</style>
