<!-- CreateForm.vue -->
<template>
  <v-sheet
    class="mx-auto"
    width="300"
  >
    <v-form @submit.prevent>
      <v-text-field
        v-model="taskTitle"
        :rules="taskTitleRules"
        label="New Task"
      ></v-text-field>

      <v-btn
        class="mt-2"
        color="primary"
        @click="handleSubmit"
      >
        Add
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const taskTitle = ref('');
const taskTitleRules = ref([(v: string) => !!v || 'Task title is required']);

const emit = defineEmits(['task-added']);

const handleSubmit = async () => {
  try {
    await window.tasksApi.createTaskReq({title: taskTitle.value});
    taskTitle.value = '';
    emit('task-added');
  } catch (error) {
    console.error('error', error);
  }
};
</script>

<style scoped></style>
