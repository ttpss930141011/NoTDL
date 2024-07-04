<template>
  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card
      min-width="400"
      :prepend-icon="task?.icon"
      :title="task?.title"
    >
      <template #append>
        <v-btn
          icon="mdi-close"
          size="small"
          variant="text"
          density="compact"
          @click="dialog = false"
        ></v-btn>
      </template>

      <v-divider></v-divider>
      <v-card-item>
        <v-container>
          <v-row
            align="center"
            justify="center"
          >
            <v-col cols="auto">
              <v-btn
                prepend-icon="mdi-check"
                color="success"
                size="large"
                @click="handleCompleteTask"
              >
                Complete
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                prepend-icon="mdi-pencil"
                color="info"
                size="large"
              >
                Edit
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                prepend-icon="mdi-delete"
                color="red"
                size="large"
                @click="handleDeleteTask"
              >
                Delete
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-item>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import {useGlobalStore} from '/@/store/global';
import {ref, toRaw} from 'vue';
import type {Task} from '#shared/task';

const globalStore = useGlobalStore();
const {updateTask, deleteTaskById} = globalStore;

const dialog = ref(false);
const task = ref<Task | null>(null);

const openDialog = (selectedTask: Task) => {
  dialog.value = true;
  task.value = selectedTask;
};
const handleCompleteTask = async () => {
  if (!task.value) return;
  try {
    await updateTask({...toRaw(task.value), is_completed: true});
  } catch (error) {
    console.error(error);
  } finally {
    dialog.value = false;
  }
};

const handleDeleteTask = async () => {
  if (!task.value) return;
  try {
    await deleteTaskById(task.value.id);
  } catch (error) {
    console.error(error);
  } finally {
    dialog.value = false;
  }
};
defineExpose({openDialog});
</script>

<style scoped></style>
