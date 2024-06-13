<script lang="ts" setup>
import {ref} from 'vue';

const count = ref(0);
</script>

<template>
  <v-btn @click="count++"> count is: {{ count }}</v-btn>
  <br /><br />
  <code>packages/renderer/src/components/ReactiveCounter.vue</code>
</template>
