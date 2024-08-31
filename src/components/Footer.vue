<template>
<div class="footer">
    <div class="line line1"></div>
        <a href="https://github.com/AleksanderWojsz?tab=repositories" target="_blank">
            <img src="/src/assets/github-mark.png" class="logo" />
        </a>
        <a href="https://linkedin.com" target="_blank">
            <img src="/src/assets/LI-In-Bug.png" class="logo" />
        </a>
        <a href="/app-debug.apk" download="organiser.apk">
            <img src="/src/assets/android.svg" class="logo" />
        </a>
    <div class="line line2"></div>
</div>
</template>

<style scoped>
.footer {
  display: flex;
  align-items: center;
}

.line {
  flex-grow: 1;
  height: 1px;
  background-color: black;
}

.logo {
  width: 35px;
  height: auto;
  margin: 15px
}

.line1 {
  margin-left: 15%;
}

.line2 {
  margin-right: 15%;
}

</style>
<script setup lang="ts">
</script>
