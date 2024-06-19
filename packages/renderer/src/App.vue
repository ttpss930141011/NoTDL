<template>
  <v-responsive
    class="border rounded"
    height="100%"
  >
    <v-app :theme="theme">
      <v-app-bar
        height="50"
        extension-height="64"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-app-bar-title>{{ titleHeader }}</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        />

        <template #extension>
          <WeekSwiper ref="weekSwiperRef" />
        </template>
      </v-app-bar>

      <v-main>
        <Main />
      </v-main>
    </v-app>
  </v-responsive>
</template>
<script setup>
import {computed, ref} from 'vue';
import Main from '/@/components/MainPage.vue';
import WeekSwiper from '/@/components/WeekSwiper.vue';

const theme = ref('light');
const weekSwiperRef = ref(null);
const titleHeader = computed(() => weekSwiperRef.value?.headerTitle);

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}
</script>
