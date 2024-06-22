<template>
  <v-app :theme="theme">
    <SideBar
      :drawer="drawer"
      :color="color[theme].container"
    >
      <template #drawerTrigger>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </template>
    </SideBar>
    <HeadBar :color="color[theme].container">
      <template #drawerTrigger>
        <v-app-bar-nav-icon
          v-show="!drawer"
          @click="drawer = !drawer"
        />
      </template>
      <template #themeTrigger>
        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        />
      </template>
    </HeadBar>
    <v-main
      :class="clsx('bg-' + color[theme].container)"
      :style="{height: `${mainHeight}px`}"
    >
      <v-container
        :class="clsx('rounded-xl h-100 overflow-auto custom-scrollbar', 'bg-' + color[theme].main)"
        fluid
      >
        <Main />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import {computed, ref} from 'vue';
import Main from '/@/components/MainPage.vue';

import clsx from 'clsx';
import SideBar from '/@/layouts/SideBar.vue';
import HeadBar from '/@/layouts/HeadBar.vue';

const theme = ref('light');
const drawer = ref(true);

const mainHeight = computed(() => window.innerHeight - 50 - 64);
const color = ref({
  light: {
    main: 'grey-lighten-5',
    container: 'grey-lighten-3',
  },
  dark: {
    main: 'grey-darken-3',
    container: 'grey-darken-4',
  },
});
const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #c2c9ea;
}

.custom-scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
