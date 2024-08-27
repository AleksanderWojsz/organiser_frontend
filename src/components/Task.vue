<script setup>

const props = defineProps({
    task: Object,
    user_id: Number,
    deleteTaskFunction: Function,
    display_done_button: Boolean,
})

</script>

<template>


<div class="card">
    <div class="container space-y-2">
        <p> {{task.description}} </p>
<!--        <p> Deadline: {{ task.deadline }} </p>-->
        <hr>
        <p> From: {{ task.from_whom_name }} </p>
        <button v-if="display_done_button" v-on:click="deleteTaskFunction(task.task_id)" class="button-shadow bg-green-200 hover:bg-green-400">Done</button> <br>
    </div>
</div>

</template>
