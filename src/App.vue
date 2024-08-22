<script setup>

import { RouterLink , useRoute } from 'vue-router';
import { RouterView } from "vue-router";
import NavigationBar from "@/components/NavigationBar.vue";
import {ref} from "vue";

const user_id = 1;
const user_name = ref("Alek");

</script>

<template>

  <NavigationBar></NavigationBar>
  <RouterView v-bind:user_name="user_name" v-bind:user_id="user_id"></RouterView>

</template>

