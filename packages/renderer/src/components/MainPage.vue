<template>
  <div class="d-flex flex-column align-center">
    <h2>Main component</h2>
    <CreateTaskForm @task-added="handleTaskAdded" />
    <ShowAllTasks ref="showAllTasksComponent" />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import CreateTaskForm from '/@/components/CreateTaskForm.vue';
import ShowAllTasks from '/@/components/ShowAllTasks.vue';

// Define the type for the ShowAllTasks component instance
const showAllTasksComponent = ref<InstanceType<typeof ShowAllTasks> | null>(null);

const handleTaskAdded = async () => {
  if (showAllTasksComponent.value) {
    await showAllTasksComponent.value.fetchTaskTitles();
  }
};
</script>

<style scoped></style>
