<script setup>
import { useRoute } from 'vue-router';
import Footer from "@/components/Footer.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import {onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const route = useRoute();
const user_id = ref("");

onMounted(() => {
    onAuthStateChanged(getAuth(), (user) => { // listens for changes in authentication
        if (user) { // User is signed in
            user_id.value = user.uid;
        }
    })
});

function showNavigationBar() {
    return ['/home', '/tasks', '/list', '/chat'].includes(route.path)
}

</script>


<template>
    <div class="allButFooter">
        <NavigationBar  v-if="showNavigationBar()" v-bind:user_id="user_id"></NavigationBar>
        <RouterView></RouterView>
    </div>
    <div>
        <Footer class="footer"></Footer>
    </div>
</template>


<style scoped>

.allButFooter {
  min-height: calc(100vh - 85px);
}

</style>
