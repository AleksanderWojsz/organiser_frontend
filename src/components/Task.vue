<script setup>

defineProps({
  task: Object,
  deleteTaskFunction: Function
})

</script>

<template>
    <div class="task border-4 border-sky-500">
        {{ task.description }} <br>
        {{ task.for_whom }} <br>
        {{ task.from_whom }} <br>
        {{ task.id }} <br>
      <button v-on:click="deleteTaskFunction(task.id)" class="bg-blue-500 hover:bg-blue-700 text-white">Done</button> <br>
    </div>
</template>
