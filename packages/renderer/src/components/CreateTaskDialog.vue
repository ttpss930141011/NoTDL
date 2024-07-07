<template>
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
        <TaskInputForm ref="taskInputFormRef" />
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
</template>
<script setup lang="ts">
import {ref} from 'vue';
import TaskInputForm from '/@/components/TaskInputForm.vue';
import {tasks} from '#preload';
import {useGlobalStore} from '/@/store/global';
import {storeToRefs} from 'pinia';
import {TaskType} from '#shared/enum';

const globalStore = useGlobalStore();
const {getSelectedDateTasks, preUpdateTaskPriorities} = globalStore;

const {selectedDayString} = storeToRefs(globalStore);

const dialog = ref(false);
const taskInputFormRef = ref<InstanceType<typeof TaskInputForm> | null>(null);
const openDialog = () => (dialog.value = true);

const handleCreateTask = async () => {
  const newTask = taskInputFormRef?.value?.formProps.task;
  if (!newTask) return;
  try {
    // Step 1: Create a new task
    const task = await tasks.createSelectedDateTaskReq(
      {
        title: newTask.title || 'New Task',
        icon: newTask.icon || 'mdi-calendar-check',
        color: newTask.color || '#ffa2a2',
        taskType: TaskType.TODAY,
        mentalLoad: newTask.mental_load || 0,
      },
      selectedDayString.value,
    );
    await getSelectedDateTasks();
    dialog.value = false;
    await preUpdateTaskPriorities(task);
  } catch (error) {
    console.error('error creating task', error);
  }
};

defineExpose({
  openDialog,
});
</script>

<style scoped></style>
