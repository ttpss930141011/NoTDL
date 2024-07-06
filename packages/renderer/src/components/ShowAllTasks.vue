<!-- ShowAllTasks.vue -->
<template>
  <v-sheet
    :elevation="8"
    height="100%"
    width="50%"
    rounded="xl"
    :style="{zIndex: 1}"
    class="overflow-auto custom-scrollbar"
  >
    <v-card
      class="h-100"
      prepend-icon="mdi-calendar"
      rounded="xl"
    >
      <template #title>
        <h3>Tasks</h3>
      </template>
      <template #append>
        <v-btn
          icon="mdi-refresh"
          variant="tonal"
          density="comfortable"
          @click="() => getSelectedDateTasks()"
        >
        </v-btn>
      </template>
      <v-card
        v-for="task in selectedDateTasks"
        :key="task.id"
        variant="text"
        :subtitle="task.created_at!.toDateString()"
        border="md"
        rounded="xl"
        class="ma-3"
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
    </v-card>
  </v-sheet>
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
