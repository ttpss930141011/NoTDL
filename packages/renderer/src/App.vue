<template>
  <v-responsive
    class="border rounded"
    height="100%"
  >
    <v-app :theme="theme">
      <v-app-bar
        class="px-3"
        density="compact"
      >
        <template #prepend>
          <v-icon
            color="blue-darken-2"
            icon="mdi-checkbox-marked-circle-auto-outline"
            size="large"
          ></v-icon>
        </template>

        <v-app-bar-title>NoTDL</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <Main />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
<script setup>
import {ref} from 'vue';
import Main from '/src/components/MainPage.vue';

const theme = ref('light');

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}
</script>
