<script setup>

import Footer from "@/components/Footer.vue";

</script>

<template>

    <div class="allButFooter">
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
