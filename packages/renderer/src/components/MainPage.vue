<template>
  <div class="d-flex flex-row align-center px-2 py-2 h-100">
    <div class="d-flex flex-column w-25 h-100">
      <div class="spacer"></div>
      <div class="bottom-left" />
    </div>
    <ShowAllTasks ref="showAllTasksRef" />
    <div class="d-flex flex-column w-25 h-100">
      <div class="top-right" />
      <div class="spacer"></div>
    </div>
  </div>
  <CreateTaskDialog ref="createTaskDialogRef" />
</template>

<script setup lang="ts">
import {ref} from 'vue';
import ShowAllTasks from '/@/components/ShowAllTasks.vue';
import CreateTaskDialog from '/src/components/CreateTaskDialog.vue';

// Define the type for the ShowAllTasks component instance
const showAllTasksRef = ref<InstanceType<typeof ShowAllTasks> | null>(null);
const createTaskDialogRef = ref<InstanceType<typeof CreateTaskDialog> | null>(null);
</script>
<style scoped>
.spacer {
  flex: 1;
}

.bottom-left {
  width: 100%;
  height: 400px;
  background-image: url('../assets/bottom-left.png');
  background-repeat: no-repeat;
  background-position: 40%;
  z-index: 1;
  opacity: 0.8;
}

.top-right {
  width: 100%;
  height: 500px;
  background-image: url('../assets/top-right.png');
  background-size: 700px;
  background-repeat: no-repeat;
  background-position: 78% 20%;
  z-index: 1;
  opacity: 0.8;
}
</style>
