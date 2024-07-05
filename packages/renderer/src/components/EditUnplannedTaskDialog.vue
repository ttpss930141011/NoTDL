<template>
  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card
      min-width="400"
      :prepend-icon="task?.icon"
      title="Edit Task"
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
        <TaskInputForm ref="taskInputFormRef" />
      </v-card-item>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          block
          color="primary"
          @click="handleUpdateTask"
        >
          Update Task
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import {nextTick, ref, toRaw} from 'vue';
import type {Task} from '#shared/task';
import TaskInputForm from '/@/components/TaskInputForm.vue';
import {tasks} from '#preload';

const dialog = ref(false);
const task = ref<Task | null>(null);
const taskInputFormRef = ref<InstanceType<typeof TaskInputForm> | null>(null);

const openDialog = async (selectedTask: Task) => {
  dialog.value = true;
  task.value = selectedTask;
  await nextTick();
  taskInputFormRef.value?.acceptParams({task: selectedTask});
};

const handleUpdateTask = async () => {
  const updatedTask = taskInputFormRef?.value?.formProps.task as Task;
  if (!updatedTask) return;
  await tasks.updateTaskReq(toRaw(updatedTask));
  dialog.value = false;
};

defineExpose({openDialog});
</script>

<style scoped></style>
