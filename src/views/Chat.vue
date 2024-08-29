<script setup>

import NavigationBar from "@/components/NavigationBar.vue";
import {useRoute} from "vue-router";
import {ref} from "vue";
const route = useRoute();
const user_id = ref(route.query.user_id);

</script>

<template>
    <NavigationBar v-bind:user_id="user_id"></NavigationBar>
    <div class="flex flex-col items-center mt-[120px]">
        Chat
    </div>
</template>
