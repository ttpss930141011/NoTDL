<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        min-width="600"
        prepend-icon="mdi-calendar-check"
        title="New Task"
      >
        <v-card-text>
          <CreateTaskForm
            ref="addTaskFormRef"
            :task-type="TaskType.TODAY"
          />
        </v-card-text>
        <template #actions>
          <v-btn
            block
            variant="tonal"
            color="primary"
            class="ms-auto"
            text="Create Task"
            @click="handleCreateTask"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
  <v-fab
    color="success"
    icon="mdi-plus"
    location="bottom end"
    size="64"
    absolute
    app
    appear
    @click="openDialog"
  ></v-fab>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {TaskType} from '#shared/enum';
import CreateTaskForm from '/@/components/CreateTaskForm.vue';

const dialog = ref(false);
const addTaskFormRef = ref<InstanceType<typeof CreateTaskForm> | null>(null);
const openDialog = () => (dialog.value = true);

const handleCreateTask = () => {
  dialog.value = false;
  addTaskFormRef?.value?.createTask();
};

defineExpose({
  openDialog,
});
</script>

<style scoped></style>
