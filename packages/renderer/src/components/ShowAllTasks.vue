<!-- ShowAllTasks.vue -->
<template>
  <v-timeline
    side="end"
    align="center"
  >
    <v-timeline-item
      v-for="task in selectedDateTasks"
      :key="task.id"
      fill-dot
      min-width="500"
    >
      <v-card
        variant="text"
        :subtitle="task.created_at!.toDateString()"
      >
        <v-fab
          class="me-4"
          variant="tonal"
          icon="mdi-delete"
          absolute
          offset
          color="error"
          density="comfortable"
          @click="deleteTaskById(task.id)"
        ></v-fab>
        <v-card-title class="d-flex justify-space-between">
          <p>{{ task.title }}</p>
        </v-card-title>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import {useGlobalStore} from '/@/store/global';
import {storeToRefs} from 'pinia';
import {onBeforeMount} from 'vue';

const globalStore = useGlobalStore();
const {getSelectedDateTasks, deleteTaskById} = globalStore;
const {selectedDateTasks} = storeToRefs(globalStore);

onBeforeMount(() => {
  getSelectedDateTasks();
});
</script>
