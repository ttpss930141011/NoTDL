<!-- ShowAllTasks.vue -->
<template>
  <v-sheet
    :elevation="8"
    height="100%"
    width="50%"
    rounded="xl"
    :style="{zIndex: 1}"
    class="overflow-auto custom-scrollbar flex-1-0"
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
          @click="getAllTasks"
        >
        </v-btn>
      </template>
      <VueDraggable
        v-model="selectedDateTasks"
        group="tasks"
        class="h-100"
        ghost-class="tasks"
        :animation="200"
        @update="onSelectedTaskUpdate"
        @add="onSelectedTaskAdd"
      >
        <TransitionGroup
          type="transition"
          name="tasks"
        >
          <v-card
            v-for="task in selectedDateTasks"
            :key="task.id"
            variant="text"
            border="md"
            rounded="xl"
            class="ma-3"
            append-icon="mdi-delete"
            :title="task.title"
          >
            <template #append>
              <v-btn
                variant="text"
                icon="mdi-delete"
                color="red"
                @click="() => handleDeleteTask(task.id)"
              />
              <v-checkbox-btn class="pe-2"></v-checkbox-btn>
            </template>
          </v-card>
        </TransitionGroup>
      </VueDraggable>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import {useGlobalStore} from '/@/store/global';
import {storeToRefs} from 'pinia';
import {onBeforeMount} from 'vue';
import type {SortableEvent} from 'vue-draggable-plus';
import {VueDraggable} from 'vue-draggable-plus';

const globalStore = useGlobalStore();
const {getAllTasks, deleteTaskById, updateTask, updateTaskPriorities} = globalStore;
const {selectedDateTasks} = storeToRefs(globalStore);

const onSelectedTaskUpdate = async () => {
  const newPrioritiesTasks = selectedDateTasks.value.map((task, index) => ({
    ...task,
    priority: index + 1,
  }));
  await updateTaskPriorities(newPrioritiesTasks);
};

const onSelectedTaskAdd = async (event: SortableEvent) => {
  const newIndex = event.newIndex;
  if (!newIndex && newIndex !== 0) return;
  const newTask = selectedDateTasks.value[newIndex];
  await updateTask({...newTask, is_unplanned: false, priority: newIndex + 1});
  console.log('onGoingTasksAdd:', newTask);
};

const handleDeleteTask = async (taskId: string) => {
  await deleteTaskById(taskId);
  await getAllTasks();
};

onBeforeMount(() => {
  getAllTasks();
});
</script>
<style scoped>
.tasks-enter-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.tasks-enter-from,
.tasks-leave-to {
  opacity: 0;
  transform: scaleY(0.01);
}

.tasks-leave-active {
  position: absolute;
}
</style>
