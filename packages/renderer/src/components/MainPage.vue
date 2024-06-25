<template>
  <div class="d-flex flex-column align-center rounded-xl">
    <h2>Main component</h2>
    <ShowAllTasks ref="showAllTasksRef" />
    <CreateTaskDialog ref="createTaskDialogRef" />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import ShowAllTasks from '/@/components/ShowAllTasks.vue';
import CreateTaskDialog from '/src/components/CreateTaskDialog.vue';

// Define the type for the ShowAllTasks component instance
const showAllTasksRef = ref<InstanceType<typeof ShowAllTasks> | null>(null);
const createTaskDialogRef = ref<InstanceType<typeof CreateTaskDialog> | null>(null);
</script>

<style scoped></style>
