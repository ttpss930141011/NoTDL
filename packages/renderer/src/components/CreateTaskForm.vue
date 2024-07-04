<template>
  <v-text-field
    v-model="newTask.title"
    label="What are you working on?"
    variant="solo"
  >
    <template #append-inner>
      <v-fade-transition>
        <v-btn
          v-show="newTask.title"
          :icon="panel === 'task-panel' ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          variant="text"
          @click="togglePanel"
        ></v-btn>
      </v-fade-transition>
    </template>
  </v-text-field>
  <v-expansion-panels
    v-model="panel"
    variant="accordion"
    hide-actions
  >
    <v-expansion-panel value="task-panel">
      <v-expansion-panel-text>
        <div class="text-caption">Mental Load</div>
        <v-slider
          v-model="newTask.mentalLoad"
          :max="10"
          :ticks="tickLabels"
          show-ticks="always"
          step="1"
          tick-size="4"
        ></v-slider>
      </v-expansion-panel-text>
      <!--      <v-expansion-panel-text>-->
      <!--        <div class="text-caption">Task Type</div>-->
      <!--        <v-btn-toggle-->
      <!--          v-model="newTask.taskType"-->
      <!--          density="comfortable"-->
      <!--          color="primary"-->
      <!--          mandatory-->
      <!--          class="w-100"-->
      <!--          divided-->
      <!--          border-->
      <!--        >-->
      <!--          <v-btn-->
      <!--            class="w-50"-->
      <!--            icon="mdi-format-align-left"-->
      <!--          >-->
      <!--            Unplanned-->
      <!--          </v-btn>-->
      <!--          <v-btn-->
      <!--            class="w-50"-->
      <!--            icon="mdi-format-align-center"-->
      <!--          >-->
      <!--            Today-->
      <!--          </v-btn>-->
      <!--        </v-btn-toggle>-->
      <!--      </v-expansion-panel-text>-->
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup lang="ts">
import {reactive, ref, watch} from 'vue';
import type {NewTask, Task} from '#shared/task';
import {debounce} from 'lodash';
import {TaskType} from '#shared/enum';

const props = withDefaults(defineProps<{taskType?: NewTask['taskType']}>(), {
  taskType: TaskType.UNPLANNED,
});

const panel = ref<string | null>(null);

const newTask = reactive<NewTask>({
  title: '',
  icon: '',
  color: '#EF9A9A',
  taskType: props.taskType,
  mentalLoad: 0,
});

const tickLabels = ref(Array.from({length: 11}, (_, i) => i.toString()));
const togglePanel = () => {
  panel.value = panel.value === 'task-panel' ? null : 'task-panel';
};

// simulate fetching mental load by task
// TODO: replace with real getMentalLoadByTitle API
const getMentalLoadByTitle = async (title: string): Promise<number> => {
  console.log(`fetch mental load by task: ${title}`);
  // wait for 1 second and return a random number
  return await new Promise<number>(resolve =>
    setTimeout(() => resolve(Math.floor(Math.random() * 11)), 1000),
  );
};

const updateMentalLoad = debounce(async (title: Task['title']) => {
  const data = await getMentalLoadByTitle(title);
  console.log(`update mental load: ${data}`);
  newTask.mentalLoad = data;
}, 1000);

const updateNewTask = (task: Partial<NewTask>) => {
  Object.assign(newTask, task);
};

const resetNewTask = () => {
  newTask.title = '';
  newTask.icon = '';
  newTask.taskType = TaskType.UNPLANNED;
  newTask.mentalLoad = 0;
};

// if title is empty, close the panel
// fetch mental load by task
watch(
  () => newTask.title,
  newTitle => {
    if (!newTitle) panel.value = '';
    updateMentalLoad(newTitle);
  },
);

defineExpose({
  newTask,
  updateNewTask,
  resetNewTask,
});
</script>

<style scoped></style>
