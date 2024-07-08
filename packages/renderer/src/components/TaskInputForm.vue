<template>
  <v-text-field
    v-model="formProps.task.title"
    label="What are you working on?"
    variant="solo"
  >
    <template #prepend>
      <v-icon
        :icon="formProps.task.icon || 'mdi-calendar-check'"
        density="compact"
        variant="tonal"
        :color="formProps.task.color || 'red'"
      />
    </template>
    <template #append-inner>
      <v-fade-transition>
        <v-btn
          v-show="formProps.task.title"
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
          v-model="formProps.task.mental_load"
          :max="10"
          :ticks="tickLabels"
          class="mx-2"
          color="primary"
          density="compact"
          show-ticks="always"
          thumb-size="16"
          hide-details
          step="1"
          tick-size="4"
        ></v-slider>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue';
import type {Task} from '#shared/task';
import {debounce} from 'lodash';
import {agent} from '#preload';

interface Props {
  task: Partial<Task>;
}

const formProps = ref<Props>({
  task: {},
});

const panel = ref<string | null>(null);

const tickLabels = ref(Array.from({length: 11}, (_, i) => i.toString()));

const acceptParams = (params: Props) => {
  formProps.value = params;
};

const togglePanel = () => {
  panel.value = panel.value === 'task-panel' ? null : 'task-panel';
};

// simulate fetching mental load by task
const getMentalLoadByTitleReq = async (title: string): Promise<number> => {
  console.log('fetching mental load by title:', title);
  return await new Promise<number>(resolve =>
    setTimeout(() => resolve(Math.floor(Math.random() * 11)), 1000),
  );
};

const updateMentalLoadByTitle = debounce(async (title: Task['title']) => {
  if (!title) return;
  const data = await getMentalLoadByTitleReq(title);
  formProps.value.task.mental_load = data;
}, 1000);

const updateIconByTitle = debounce(async (title: Task['title']) => {
  if (!title) {
    formProps.value.task.icon = 'mdi-calendar-check';
    return;
  }
  const {icon} = await agent.getIconByTitleReq(title);
  formProps.value.task.icon = icon;
  console.log('icon:', icon);
}, 1000);

watch(
  () => formProps.value.task.title,
  newTitle => {
    if (!newTitle) {
      panel.value = '';
    } else {
      updateMentalLoadByTitle(newTitle);
      updateIconByTitle(newTitle);
    }
  },
);

defineExpose({
  formProps,
  acceptParams,
  togglePanel,
});
</script>

<style scoped></style>
