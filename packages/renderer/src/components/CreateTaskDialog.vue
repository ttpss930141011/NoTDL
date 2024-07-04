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
            ref="createTaskFormRef"
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
import {tasks} from '#preload';
import {useGlobalStore} from '/@/store/global';
import {storeToRefs} from 'pinia';

const globalStore = useGlobalStore();
const {getSelectedDateTasks, preUpdateTaskPriorities} = globalStore;

const {selectedDayString} = storeToRefs(globalStore);

const dialog = ref(false);
const createTaskFormRef = ref<InstanceType<typeof CreateTaskForm> | null>(null);
const openDialog = () => (dialog.value = true);

const handleCreateTask = async () => {
  const newTask = createTaskFormRef?.value?.newTask;
  if (!newTask) return;
  try {
    // Step 1: Create a new task
    const task = await tasks.createSelectedDateTaskReq(
      {
        title: newTask.title,
        icon: newTask.icon,
        color: newTask.color,
        taskType: newTask.taskType,
        mentalLoad: newTask.mentalLoad,
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
