<!-- ShowAllTasks.vue -->
<template>
  <v-timeline
    side="end"
    align="start"
  >
    <v-timeline-item
      v-for="task in todoList"
      :key="task.id"
      fill-dot
    >
      <v-card>
        <v-card-title class="text-h6">
          {{ task.title }}
        </v-card-title>
        <v-card-text class="bg-white text--primary">
          {{ task.created_at }}
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from 'vue';
import type {Task} from '/@/types/task';
import {getAllTasksReq} from '#preload';

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

onBeforeMount(() => {
  fetchTaskTitles();
});

// Expose the fetchTaskTitles function
defineExpose({fetchTaskTitles});
</script>
