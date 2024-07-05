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
            <TaskInputForm ref="taskInputFormRef" />
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
            @click="handleCreateUnplannedTask"
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
import TaskInputForm from '/@/components/TaskInputForm.vue';
import type {SuggestionTask} from '#shared/task';
import {tasks} from '#preload';
import {useGlobalStore} from '/@/store/global';
import {TaskType} from '#shared/enum';

const {getUnplannedTasks} = useGlobalStore();

const suggestionTasks = ref<SuggestionTask[]>([
  {
    id: '1',
    title: 'Reply email',
    icon: 'mdi-email',
    mental_load: 3,
  },
  {
    id: '2',
    title: 'Workout',
    icon: 'mdi-dumbbell',
    mental_load: 5,
  },
  {
    id: '3',
    title: 'Buy groceries',
    icon: 'mdi-cart',
    mental_load: 2,
  },
]);

const menu = ref(false);
const taskInputFormRef = ref<InstanceType<typeof TaskInputForm> | null>(null);

/**
 * Handle creating a new task
 * Add the new task to the task list
 *
 * */
const handleCreateUnplannedTask = async () => {
  try {
    const newTask = taskInputFormRef?.value?.formProps.task;
    if (!newTask) return;
    const data = await tasks.createUnplannedTaskReq({
      title: newTask.title || 'New Task',
      icon: newTask.icon || 'mdi-calendar-check',
      color: newTask.color || '#ffa2a2',
      taskType: TaskType.UNPLANNED,
      mentalLoad: newTask.mental_load || 0,
    });
    console.log('coming from create task dialog', data);
    await getUnplannedTasks();
  } catch (error) {
    console.error('error creating task', error);
  } finally {
    menu.value = false;
  }
};

const handleCreateSuggestedTask = (task: SuggestionTask) => {
  taskInputFormRef.value?.acceptParams({
    task: {
      title: task.title,
      icon: task.icon,
      mental_load: task.mental_load,
    },
  });
  console.log(`select suggested task: ${task.title}`);
};

const handleMenuClose = () => {
  menu.value = false;
  taskInputFormRef.value?.acceptParams({
    task: {},
  });
};
</script>
<style scoped></style>
