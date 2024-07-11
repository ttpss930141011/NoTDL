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
          Ongoing Tasks
        </v-list-subheader>

        <VueDraggable
          v-model="onGoingTasks"
          class="overflow-auto hide-scroller"
          :animation="200"
          ghost-class="ghost-task"
          group="tasks"
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
                <v-card class="task-card">
                  <template #prepend>
                    <v-icon
                      :icon="task.icon"
                      :color="task.color"
                      size="20"
                    />
                  </template>
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
          ghost-class="ghost-task"
          group="tasks"
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
                <v-card class="task-card">
                  <template #prepend>
                    <v-icon
                      :icon="task.icon"
                      :color="task.color"
                      size="20"
                    />
                  </template>
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
        v-if="currentUser"
        :title="currentUser.name"
      >
        <template #prepend>
          <v-avatar
            v-if="currentUser.picture"
            size="40"
            class="mx-1"
          >
            <v-img
              alt="Avatar"
              :src="currentUser.picture"
            ></v-img>
          </v-avatar>
          <v-avatar
            v-else
            size="40"
            class="mx-1"
          >
            <v-icon>mdi-account</v-icon>
          </v-avatar>
        </template>
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
            @click="handleUserLogout"
          >
          </v-btn>
        </template>
      </v-list-item>
      <v-list-item v-else>
        <v-btn
          color="primary"
          block
          variant="tonal"
          prepend-icon="mdi-login"
          @click="handleUserLogin"
        >
          Login
        </v-btn>
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
import {user as usersReq} from '#preload';
import type {User} from '#shared/auth';

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
const currentUser = ref<User | null>(null);

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
  const newIndex = event.newIndex;
  if (!newIndex && newIndex !== 0) return;
  const newTask = onGoingTasks.value[newIndex];
  await updateTask({...newTask, is_completed: false, is_unplanned: true, priority: newIndex + 1});
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
  const newIndex = event.newIndex;
  if (!newIndex && newIndex !== 0) return;
  const newTask = completedTasks.value[newIndex];
  await updateTask({...newTask, is_completed: true, is_unplanned: true, priority: newIndex + 1});
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

const handleUserLogin = async () => {
  try {
    await usersReq.userLoginReq();
    await loadCurrentUser();
  } catch (error) {
    console.error(error);
  }
};

const loadCurrentUser = async () => {
  try {
    currentUser.value = await usersReq.getCurrentUserReq();
  } catch (error) {
    console.error(error);
  }
};

const handleUserLogout = async () => {
  try {
    await usersReq.userLogoutReq();
    currentUser.value = null;
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(() => {
  loadCurrentUser();
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
