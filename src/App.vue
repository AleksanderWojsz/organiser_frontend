<script setup>

import { RouterLink , useRoute } from 'vue-router';
import { RouterView } from "vue-router";
import NavigationBar from "@/components/NavigationBar.vue";
import { ref, onMounted } from "vue";
import axios from 'axios'

const user_id = 1;
const tasks_data = ref(undefined);

// Runs at the start
onMounted(async () => {
    try {
        const response = await axios.get("http://localhost:8000/get_full_data_for_user/" + user_id)
        tasks_data.value = response.data
        // user_name.value = response.data.find(item => {return item.user_id === user_id}).name
    } catch (error) {
        console.log("Error fetching full data", error)
    }
})

</script>

<template>

  <NavigationBar></NavigationBar>
  <RouterView v-bind:tasks_data="tasks_data" v-bind:user_id="user_id"></RouterView>

</template>

