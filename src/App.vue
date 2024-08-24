<script setup>

import { RouterLink , useRoute } from 'vue-router';
import { RouterView } from "vue-router";
import NavigationBar from "@/components/NavigationBar.vue";
import { ref, onMounted } from "vue";

const user_id = 1;

</script>

<template>

  <NavigationBar></NavigationBar>
  <RouterView v-bind:user_id="user_id"></RouterView>

</template>

