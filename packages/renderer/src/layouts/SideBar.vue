<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    permanent
    floating
    :color="color"
  >
    <v-list>
      <v-list-item nav>
        <slot name="drawerTrigger" />
        <template #append>
          <v-col cols="auto">
            <v-btn
              density="compact"
              icon="mdi-plus"
            ></v-btn>
          </v-col>
        </template>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="title">Sidebar</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Link 1</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Link 2</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Link 3</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';

const props = defineProps({
  drawer: Boolean,
  color: String,
});

const {drawer} = toRefs(props);
</script>
