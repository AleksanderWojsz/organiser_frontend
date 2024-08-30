<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import axios from "axios";
import Task from "@/components/Task.vue";
import AddPlanPopUp from "@/components/AddTaskPopUp.vue";

const route = useRoute();
const user_id = ref(route.query.user_id);

const show_spinner = ref(false);
const show_add_task_popup = ref(false);
const family_members = ref([]);
const whose_tasks = ref("");
const displayed_tasks = ref([]);
const tasks_data = ref([]);

function addTask(for_whom, from_whom, description, deadline) {
    show_spinner.value = true;
    const new_task = {
        for_whom: for_whom,
        from_whom: from_whom,
        description: description,
        deadline: deadline
    };

    axios.post("https://organiser-backend.onrender.com/add_task", new_task).then(() => {
        return refreshData();
    });

    closeAddTaskPopUp();
    show_spinner.value = false;
}

function deleteTask(task_id) {
    show_spinner.value = true;
    axios.delete("https://organiser-backend.onrender.com/delete_task/" + task_id).then(() => {
        return refreshData();
    });
    show_spinner.value = false;
}

function closeAddTaskPopUp() {
    show_add_task_popup.value = false;
}

watch([tasks_data, whose_tasks], () => {
    const member = tasks_data.value.find(item => item.user_id === whose_tasks.value);
    if (member) {
        displayed_tasks.value = member.tasks;
    } else {
        displayed_tasks.value = [];
    }
}, { deep: true });

onMounted(async () => {
    await refreshData();

    for (const family_member of tasks_data.value) {
        family_members.value.push({
            "user_id": family_member.user_id,
            "name": family_member.name,
        });
    }

    whose_tasks.value = user_id.value;
});

async function refreshData() {
    show_spinner.value = true;
    const response = await axios.get("https://organiser-backend.onrender.com/get_full_data_for_user/" + user_id.value);
    tasks_data.value = response.data;
    show_spinner.value = false;
}



</script>

<template>

<div v-if="show_spinner" class="spinner"></div>
<div v-else class=" mx-auto mt-[140px] fade-in
    sm:w-[90%]
    md:w-[90%]
    lg:w-[80%]
    xl:w-[70%]
    2xl:w-[60%]">

    <button class="button-shadow bg-amber-50 hover:bg-amber-100" v-on:click="show_add_task_popup = true">Add task</button>
    <AddPlanPopUp v-bind:family_members="family_members" v-bind:user_id="user_id" v-bind:addTask="addTask" v-if="show_add_task_popup" v-bind:closeAddTaskPopUp="closeAddTaskPopUp"></AddPlanPopUp><br>

    <div class="flex space-x-3 items-center my-4">
        <label for="family-members" class="" >Whose tasks:</label>
        <select v-model="whose_tasks" id="family-members" class="border rounded p-1">
            <option v-for="family_member in family_members" v-bind:value="family_member.user_id">{{family_member.user_id === user_id ? "Yours" : family_member.name}}</option>
        </select>
    </div>

    <div class="space-y-3 mt-6">
        <div v-for="task in displayed_tasks" >
            <Task v-bind:display_done_button="whose_tasks === user_id" v-bind:user_id="user_id" v-bind:task="task" v-bind:deleteTaskFunction="deleteTask"></Task>
        </div>
    </div>
</div>
</template>
