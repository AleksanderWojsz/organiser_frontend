<script setup>
    import { ref } from "vue";

    defineProps({
        addTask: Function,
        closeAddTaskPopUp: Function,
    })

    const description = ref("")
    const for_whom = ref("")

</script>

<template>
    <div class="popup">
      <div class="popup-inner">

        <form>
          <label for="description">Description:</label>
          <input v-model="description" type="text" id="description"><br>
          <label for="for-whom">For whom:</label>
          <input v-model="for_whom" type="text" id="for-whom"><br>
        </form>

        <button v-on:click="addTask(description,for_whom,1,1)">Add</button><br>
        <button v-on:click="closeAddTaskPopUp">Close</button>
      </div>
    </div>
</template>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner {
        background: #FFFF;
        padding: 32px;
    }

}
</style>