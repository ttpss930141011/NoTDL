<template>
  <v-app-bar
    height="75"
    extension-height="64"
    :color="color"
    :elevation="0"
  >
    <slot name="drawerTrigger" />
    <v-app-bar-title>{{ titleHeader }}</v-app-bar-title>
    <v-spacer />
    <slot name="themeTrigger" />
    <template #extension>
      <WeekSwiper ref="weekSwiperRef" />
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import WeekSwiper from '/@/components/WeekSwiper.vue';
import {computed, ref} from 'vue';

defineProps({
  drawer: Boolean,
  color: String,
});

const weekSwiperRef = ref<InstanceType<typeof WeekSwiper> | null>(null);
const titleHeader = computed(() => weekSwiperRef.value?.headerTitle);
</script>
<style scoped></style>
