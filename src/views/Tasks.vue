<script setup>
import Task from "@/components/Task.vue";
import {ref, watch} from 'vue';
import AddPlanPopUp from "@/components/AddPlanPopUp.vue";

const props = defineProps({
    user_name: String,
    user_id: Number,
})

const show_add_task_popup = ref(false)
const family_members = ref(["Ania", "Tomek", "Alek", "Czarek", "Iza"])
const whose_tasks = ref(props.user_name)
const filtered_tasks = ref([])

const tasks = ref([
  {
    description: "to this and that",
    for_whom: "Alek",
    author: "Ania",
    id: "1",
  },
  {
    description: "do nothing",
    for_whom: "Czarek",
    author: "Tomek",
    id: "2",
  },
]);

function addTask(description, for_whom, author, id) {
    tasks.value.push({description: description, for_whom: for_whom, author: author, id: id});
    closeAddTaskPopUp();
}

function closeAddTaskPopUp() {
    show_add_task_popup.value = false;
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id);
}

watch([tasks, whose_tasks], () => {
    filtered_tasks.value = tasks.value.filter(task => { return task.for_whom === whose_tasks.value })
}, {immediate: true, deep: true});


</script>

<template>

    <button class="border-4 border-emerald-700" v-on:click="show_add_task_popup = true">Add task</button>
    <AddPlanPopUp v-bind:addTask="addTask" v-if="show_add_task_popup" v-bind:closeAddTaskPopUp="closeAddTaskPopUp"></AddPlanPopUp><br>

    <label for="family-members">Whose tasks:</label>
    <select v-model="whose_tasks" id="family-members">
        <option v-for="family_member in family_members" v-bind:value="family_member">{{family_member}}</option>
    </select>

    <div v-for="task in filtered_tasks">
        <Task v-bind:task="task" v-bind:deleteTaskFunction="deleteTask"></Task>
    </div>
</template>
