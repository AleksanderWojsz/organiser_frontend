<script setup>
import Task from "@/components/Task.vue";
import { onMounted, ref, watch } from 'vue';
import AddPlanPopUp from "@/components/AddPlanPopUp.vue";
import axios from "axios";

const props = defineProps({
    user_id: String,
})

const show_spinner = ref(false)
const show_add_task_popup = ref(false)
const family_members = ref([])
const whose_tasks = ref("")
const displayed_tasks = ref([])
const tasks_data = ref([]);

function addTask(for_whom, from_whom, description, deadline) {

    show_spinner.value = true;
    const new_task = {
        for_whom: for_whom,
        from_whom: from_whom,
        description: description,
        deadline: deadline
    }

    axios.post("http://localhost:8000/add_task", new_task).then(() => {
        return refreshData()
    })

    closeAddTaskPopUp();
    show_spinner.value = false;
}

function deleteTask(task_id) {
    show_spinner.value = true;
    axios.delete("http://localhost:8000/delete_task/" + task_id).then(() => {
        return refreshData()
    })
    show_spinner.value = false;
}

function closeAddTaskPopUp() {
    show_add_task_popup.value = false;
}

// Update tasks list on a change
watch([tasks_data, whose_tasks], () => {
    const member = tasks_data.value.find(item => {return item.user_id === whose_tasks.value})
    if (member) {
        displayed_tasks.value = member.tasks;
    } else {
        displayed_tasks.value = []
    }
}, {deep: true});

// Runs at the start
onMounted(async () => {
    await refreshData();

        // Update family members list
        for (const family_member of tasks_data.value) {
            family_members.value.push({
                "user_id": family_member.user_id,
                "name": family_member.name,
            });
        }

        // Set default value on family members list
        whose_tasks.value = props.user_id

})

async function refreshData() {
    show_spinner.value = true;
    const response = await axios.get("http://localhost:8000/get_full_data_for_user/" + props.user_id)
    tasks_data.value = response.data
    show_spinner.value = false;
}


</script>

<template>

    <div v-if="show_spinner" class="spinner"></div>
    <div v-else>
        <button class="border-4 border-emerald-700" v-on:click="show_add_task_popup = true">Add task</button>
        <AddPlanPopUp v-bind:family_members="family_members" v-bind:user_id="user_id" v-bind:addTask="addTask" v-if="show_add_task_popup" v-bind:closeAddTaskPopUp="closeAddTaskPopUp"></AddPlanPopUp><br>

        <label for="family-members">Whose tasks:</label>
        <select v-model="whose_tasks" id="family-members">
            <option v-for="family_member in family_members" v-bind:value="family_member.user_id">{{family_member.user_id === user_id ? "Yours" : family_member.name}}</option>
        </select>

        <div v-for="task in displayed_tasks">
            <Task v-bind:user_id="user_id" v-bind:task="task" v-bind:deleteTaskFunction="deleteTask"></Task>
        </div>
    </div>

</template>
