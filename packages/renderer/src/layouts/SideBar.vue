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
    <div class="d-flex flex-column flex-1-0 overflow-auto h-50">
      <v-list>
        <v-list-subheader
          v-show="onGoingTasks.length > 0"
          key="unplanned-tasks-subheader"
          class="mx-3"
        >
          Unplanned Tasks
        </v-list-subheader>

        <VueDraggable
          v-model="onGoingTasks"
          class="overflow-auto hide-scroller"
          :animation="200"
          group="people"
          @update="onGoingTasksUpdate"
          @add="onGoingTasksAdd"
        >
          <TransitionGroup
            type="transition"
            name="tasks"
          >
            <v-list-item
              v-for="task in onGoingTasks"
              :key="task.id"
            >
              <div class="bg">
                <v-card
                  prepend-icon="mdi-check"
                  class="task-card"
                >
                  <template #title>
                    <div
                      :class="
                        clsx('text-body-2 cursor-pointer', {'is-completed': task.is_completed})
                      "
                      @click="() => editUnplannedTaskDialogRef?.openDialog(task)"
                    >
                      {{ task.title }}
                    </div>
                  </template>
                  <template #append>
                    <v-btn
                      icon="mdi-delete-outline"
                      color="red"
                      size="small"
                      density="compact"
                      variant="text"
                      @click="() => handleDeleteTask(task)"
                    >
                    </v-btn>
                  </template>
                </v-card>
              </div>
            </v-list-item>
          </TransitionGroup>
        </VueDraggable>
      </v-list>
      <v-list>
        <v-list-subheader
          key="completed-tasks-subheader"
          class="mx-3"
        >
          Completed
        </v-list-subheader>
        <v-list-item
          v-show="completedTasks.length === 0"
          key="no-completed-tasks"
        >
          <v-card
            class="text-center"
            prepend-icon="mdi-inbox-outline"
            :color="color"
          >
            <template #title>
              <span class="text-body-2">No completed tasks</span>
            </template>
          </v-card>
        </v-list-item>
        <VueDraggable
          v-model="completedTasks"
          class="overflow-auto hide-scroller"
          :animation="200"
          ghost-class="ghost"
          group="people"
          @update="onCompletedTasksUpdate"
          @add="onCompletedTasksAdd"
        >
          <TransitionGroup
            type="transition"
            name="tasks"
          >
            <v-list-item
              v-for="task in completedTasks"
              :key="task.id"
            >
              <div class="bg">
                <v-card
                  prepend-icon="mdi-check"
                  class="task-card"
                >
                  <template #title>
                    <div
                      :class="
                        clsx('text-body-2 cursor-pointer', {'is-completed': task.is_completed})
                      "
                      @click="() => editUnplannedTaskDialogRef?.openDialog(task)"
                    >
                      {{ task.title }}
                    </div>
                  </template>
                  <template #append>
                    <v-btn
                      icon="mdi-delete-outline"
                      color="red"
                      size="small"
                      density="compact"
                      variant="text"
                      @click="() => handleDeleteTask(task)"
                    >
                    </v-btn>
                  </template>
                </v-card>
              </div>
            </v-list-item>
          </TransitionGroup>
        </VueDraggable>
      </v-list>
    </div>

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
import {onBeforeMount, ref, toRefs, watch} from 'vue';
import PopupCreateTaskMenu from '/src/components/PopupCreateTaskMenu.vue';
import {useGlobalStore} from '/@/store/global';
import {storeToRefs} from 'pinia';
import EditUnplannedTaskDialog from '/@/components/EditUnplannedTaskDialog.vue';
import clsx from 'clsx';
import type {Task} from '#shared/task';
import type {SortableEvent} from 'vue-draggable-plus';
import {VueDraggable} from 'vue-draggable-plus';

const props = defineProps({
  drawer: Boolean,
  color: String,
});
const {drawer} = toRefs(props);

const editUnplannedTaskDialogRef = ref<InstanceType<typeof EditUnplannedTaskDialog> | null>(null);

const globalStore = useGlobalStore();
const {getUnplannedTasks, updateTask, updateTaskPriorities, deleteTaskById} = globalStore;
const {unplannedTasks} = storeToRefs(globalStore);

const completedTasks = ref<Task[]>([]);
const onGoingTasks = ref<Task[]>([]);

watch(unplannedTasks, () => {
  completedTasks.value = unplannedTasks.value.filter(task => task.is_completed);
  onGoingTasks.value = unplannedTasks.value.filter(task => !task.is_completed);
});

const onGoingTasksUpdate = async () => {
  const newPrioritiesTasks = onGoingTasks.value.map((task, index) => ({
    ...task,
    priority: index + 1,
  }));
  await updateTaskPriorities(newPrioritiesTasks);
};

const onGoingTasksAdd = async (event: SortableEvent) => {
  if (!event.newIndex && event.newIndex !== 0) return;
  const newTask = onGoingTasks.value[event.newIndex];
  await updateTask({...newTask, is_completed: false});
  console.log('onGoingTasksAdd:', newTask);
};

const onCompletedTasksUpdate = async () => {
  const newPrioritiesTasks = completedTasks.value.map((task, index) => ({
    ...task,
    priority: index + 1,
  }));
  await updateTaskPriorities(newPrioritiesTasks);
};

const onCompletedTasksAdd = async (event: SortableEvent) => {
  console.log('event:', event);
  if (!event.newIndex && event.newIndex !== 0) return;
  const newTask = completedTasks.value[event.newIndex];
  await updateTask({...newTask, is_completed: true});
  console.log('onCompletedTasksAdd:', newTask);
};

const handleDeleteTask = async (task: Task | null) => {
  if (!task) return;
  try {
    await deleteTaskById(task.id);
  } catch (error) {
    console.error(error);
  }
};

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

.hide-scroller::-webkit-scrollbar {
  display: none;
}

.tasks-enter-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.tasks-enter-from,
.tasks-leave-to {
  opacity: 0;
  transform: scaleY(0.01);
}

.tasks-leave-active {
  position: absolute;
}

.bg {
  padding-top: 20px;
}

.task-card {
  position: relative;
  overflow: visible;
  height: 65px;
  justify-content: center;
  align-content: center;
  border: #dec0a8 3px solid;
  border-radius: 20px;
}

.task-card::before {
  content: '';
  position: absolute;
  top: -117px;
  width: 256px;
  height: 220px;
  background-image: url('../assets/card-border.png');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
  opacity: 0.4;
}
</style>
