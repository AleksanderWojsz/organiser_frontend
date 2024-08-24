<script setup>
import Task from "@/components/Task.vue";
import { onMounted, ref, watch, watchEffect } from 'vue';
import AddPlanPopUp from "@/components/AddPlanPopUp.vue";

const props = defineProps({
    user_id: Number,
    tasks_data: Array,
})

const show_add_task_popup = ref(false)
const family_members = ref([])
const whose_tasks = ref("")
const filtered_tasks = ref([])

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

watch([props.tasks_data, whose_tasks], () => {
    filtered_tasks.value = props.tasks_data.find(item => {return item.name === whose_tasks.value}).tasks
}, {deep: true});


// After reading data
watchEffect(() => {

    // console.log(props.tasks_data)

    if (props.tasks_data !== undefined) {
        // Update family members list
        var names = []
        for (const family_member of props.tasks_data) {
            names.push(family_member.name);
        }
        family_members.value = names

        // Set default value on family members list
        whose_tasks.value = props.tasks_data.find(item => {return item.user_id === props.user_id}).name
    }
})






</script>

<template>

    <button class="border-4 border-emerald-700" v-on:click="show_add_task_popup = true">Add task</button>
    <AddPlanPopUp v-bind:addTask="addTask" v-if="show_add_task_popup" v-bind:closeAddTaskPopUp="closeAddTaskPopUp"></AddPlanPopUp><br>

    <label for="family-members">Whose tasks:</label>
    <select v-model="whose_tasks" id="family-members">
        <option v-for="family_member in family_members" v-bind:value="family_member">{{family_member}}</option>
    </select>

    <div v-for="task in filtered_tasks">
        <Task v-bind:task="task"  :key="task.id" v-bind:deleteTaskFunction="deleteTask"></Task>
    </div>
</template>
