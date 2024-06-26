<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="end"
      :offset="[20, 250]"
    >
      <template #activator="{props}">
        <v-btn
          density="compact"
          icon="mdi-plus"
          v-bind="props"
        ></v-btn>
      </template>

      <v-card min-width="400">
        <v-list>
          <v-list-item
            prepend-icon="mdi-calendar-check"
            title="New Task"
          >
            <template #append>
              <v-btn
                variant="text"
                icon="mdi-close"
                @click="handleMenuClose"
              />
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <AddTaskForm ref="addTaskFormRef" />
          </v-list-item>
          <v-slide-y-transition>
            <v-list-item height="250">
              <v-list-subheader>Suggestions</v-list-subheader>
              <v-list-item
                v-for="task in suggestionTasks"
                :key="task.id"
                @click="handleCreateSuggestedTask(task)"
              >
                <v-card
                  :prepend-icon="task.icon"
                  class="mx-auto mt-1 mb-1"
                  :title="task.title"
                  max-width="344"
                  hover
                />
              </v-list-item>
            </v-list-item>
          </v-slide-y-transition>
        </v-list>

        <v-card-actions>
          <v-btn
            block
            color="primary"
            variant="tonal"
            @click="handleCreateTask"
          >
            Create Task
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import AddTaskForm from '/@/components/CreateTaskForm.vue';
import type {SuggestionTask} from '#shared/task';

const suggestionTasks = ref<SuggestionTask[]>([
  {
    id: '1',
    title: 'Reply email',
    icon: 'mdi-email',
  },
  {
    id: '2',
    title: 'Workout',
    icon: 'mdi-dumbbell',
  },
  {
    id: '3',
    title: 'Buy groceries',
    icon: 'mdi-cart',
  },
]);

const menu = ref(false);
const addTaskFormRef = ref<InstanceType<typeof AddTaskForm> | null>(null);

const handleCreateTask = () => {
  console.log(`create task: ${addTaskFormRef.value?.newTask.title}`);
  addTaskFormRef.value?.createTask();
  menu.value = false;
};

const handleCreateSuggestedTask = (task: SuggestionTask) => {
  addTaskFormRef.value?.updateNewTask({title: task.title});
  console.log(`select suggested task: ${task.title}`);
};

const handleMenuClose = () => {
  menu.value = false;
  addTaskFormRef.value?.resetNewTask();
};
</script>
<style scoped></style>
