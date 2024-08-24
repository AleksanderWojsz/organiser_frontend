<script setup>

const props = defineProps({
    task: Object,
    user_id: Number,
    deleteTaskFunction: Function,
})

</script>

<template>
    <div class="task border-4 border-sky-500">
        {{ task.description }} <br>
        {{ task.for_whom }} <br>
        {{ task.from_whom }} <br>
        id-> {{ task.task_id }} <br>
        <button v-if="task.for_whom == props.user_id" v-on:click="deleteTaskFunction(task.task_id)" class="bg-blue-500 hover:bg-blue-700 text-white">Done</button> <br>
    </div>
</template>
