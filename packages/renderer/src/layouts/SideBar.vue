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
            <PopupCreateTaskMenu />
          </v-col>
        </template>
      </v-list-item>
    </v-list>
    <v-slide-y-transition
      tag="v-list"
      group
      class="d-flex flex-column flex-1-0 overflow-auto h-50"
    >
      <v-list-subheader
        v-show="onGoingTasks.length > 0"
        key="unplanned-tasks-subheader"
        class="mx-3"
      >
        Unplanned Tasks
      </v-list-subheader>

      <v-list-item
        v-for="task in onGoingTasks"
        :key="task.id"
      >
        <v-card
          prepend-icon="mdi-check"
          @click="() => editUnplannedTaskDialogRef?.openDialog(task)"
        >
          <template #title>
            <span class="text-body-2">{{ task.title }}</span>
          </template>
        </v-card>
      </v-list-item>
      <v-list-subheader
        v-show="completedTasks.length > 0"
        key="completed-tasks-subheader"
        class="mx-3"
      >
        Completed
      </v-list-subheader>
      <v-list-item
        v-for="task in completedTasks"
        :key="task.id"
      >
        <v-card
          prepend-icon="mdi-check"
          @click="() => editUnplannedTaskDialogRef?.openDialog(task)"
        >
          <template #title>
            <span :class="clsx('text-body-2', {'is-completed': task.is_completed})">{{
              task.title
            }}</span>
          </template>
        </v-card>
      </v-list-item>
    </v-slide-y-transition>

    <v-divider></v-divider>
    <v-list>
      <v-list-item
        prepend-avatar="https://avatars.githubusercontent.com/u/23444218?v=4"
        title="Justin Xiao"
      >
        <template #append>
          <v-btn
            class="mx-1"
            color="primary"
            icon="mdi-cog"
            variant="text"
            density="compact"
            size="small"
            slim
          ></v-btn>
          <v-btn
            icon="mdi-logout"
            color="primary"
            variant="text"
            size="small"
            slim
            density="compact"
          >
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
  </v-navigation-drawer>
  <EditUnplannedTaskDialog ref="editUnplannedTaskDialogRef" />
</template>

<script lang="ts" setup>
import {computed, onBeforeMount, ref, toRefs} from 'vue';
import PopupCreateTaskMenu from '/src/components/PopupCreateTaskMenu.vue';
import {useGlobalStore} from '/@/store/global';
import {storeToRefs} from 'pinia';
import EditUnplannedTaskDialog from '/@/components/EditUnplannedTaskDialog.vue';
import clsx from 'clsx';

const props = defineProps({
  drawer: Boolean,
  color: String,
});
const {drawer} = toRefs(props);

const editUnplannedTaskDialogRef = ref<InstanceType<typeof EditUnplannedTaskDialog> | null>(null);

const globalStore = useGlobalStore();
const {getUnplannedTasks} = globalStore;
const {unplannedTasks} = storeToRefs(globalStore);

const completedTasks = computed(() => unplannedTasks.value.filter(task => task.is_completed));

const onGoingTasks = computed(() => unplannedTasks.value.filter(task => !task.is_completed));

onBeforeMount(() => {
  getUnplannedTasks();
});
</script>
<style scoped>
.v-navigation-drawer :deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.is-completed {
  text-decoration: line-through;
  color: #9e9e9e;
}
</style>
