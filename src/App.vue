<script setup>

import { RouterLink , useRoute } from 'vue-router';
import { RouterView } from "vue-router";

</script>

<template>

  <ul class="flex">
    <li class="mr-6">
      <RouterLink to="/plans" class="text-blue-500 hover:text-blue-800">Plans</RouterLink>
    </li>
    <li class="mr-6">
      <RouterLink to="/list" class="text-blue-500 hover:text-blue-800">List</RouterLink>
    </li>
    <li class="mr-6">
      <RouterLink to="/chat" class="text-blue-500 hover:text-blue-800">Chat</RouterLink>
    </li>
  </ul>


  <RouterView></RouterView>

</template>

