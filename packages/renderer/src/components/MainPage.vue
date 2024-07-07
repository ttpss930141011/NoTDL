<template>
  <div class="d-flex flex-row align-center px-2 py-2 h-100 w-100">
    <div class="d-flex flex-column w-25 h-100">
      <div class="spacer"></div>
      <div class="bottom-left">
        <v-img
          ref="bottomLeftImgRef"
          class="bottom-left-img"
          src="../assets/new-idea.png"
          @click="createTaskDialogRef?.openDialog"
        />
      </div>
    </div>
    <ShowAllTasks ref="showAllTasksRef" />
    <div class="d-flex flex-column w-25 h-100">
      <v-img
        class="top-right"
        src="../assets/top-right.png"
      ></v-img>

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
  height: 40%;
}

.bottom-left-img {
  width: 100%;
  height: 70%;
  opacity: 0.7;
}

.bottom-left-img:hover {
  opacity: 1;
  cursor: pointer;
}

.top-right {
  width: 100%;
  height: 50px;
  opacity: 0.8;
}
</style>
