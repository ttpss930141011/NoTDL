<!-- ShowAllTasks.vue -->
<template>
  <v-timeline
    side="end"
    align="center"
  >
    <v-timeline-item
      v-for="task in todoList"
      :key="task.id"
      fill-dot
      min-width="500"
    >
      <v-card
        variant="text"
        :subtitle="task.created_at.toDateString()"
      >
        <v-fab
          class="me-4"
          variant="tonal"
          icon="mdi-delete"
          absolute
          offset
          color="error"
          density="comfortable"
          @click="deleteTask(task.id)"
        ></v-fab>
        <v-card-title class="d-flex justify-space-between">
          <p>{{ task.title }}</p>
        </v-card-title>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from 'vue';
import type {Task} from '/@/types/task';
import {getAllTasksReq, deleteTaskReq} from '#preload';

const todoList = ref<Task[]>([]);

const fetchTaskTitles = async () => {
  try {
    const tasksArr = await getAllTasksReq();
    console.log('tasksArr', tasksArr);
    todoList.value = tasksArr;
  } catch (error) {
    console.error('error', error);
  }
};
const deleteTask = async (id: string) => {
  try {
    await deleteTaskReq(id);
    fetchTaskTitles();
  } catch (error) {
    console.error('error', error);
  }
};
onBeforeMount(() => {
  fetchTaskTitles();
});

// Expose the fetchTaskTitles function
defineExpose({fetchTaskTitles});
</script>
