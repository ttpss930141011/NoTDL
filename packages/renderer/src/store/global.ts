import {defineStore} from 'pinia';
import {computed, ref, toRaw, watch} from 'vue';
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import type {Day} from '#shared/week';
import type {Task} from '#shared/task';
import {tasks as tasksReq} from '#preload';

export const useGlobalStore = defineStore('global', () => {
  const unplannedTasks = ref<Task[]>([]);
  const selectedDateTasks = ref<Task[]>([]);
  const reorderTasks = ref<Task[]>([]);
  const selectedDay = ref<Day>({
    rawDate: dayjs(),
    date: dayjs().format('DD'),
    weekDay: dayjs().format('ddd'),
    isToday: true,
    isSelected: true,
  });
  const selectedDayString = computed<string>(() => selectedDay.value.rawDate.format('YYYY-MM-DD'));
  const headerTitle = computed<string>(() => selectedDay.value.rawDate.format('YYYY / MM'));

  const selectedDayIndex = ref<number>(dayjs().day());

  const setSelectedDay = (day: Day) => {
    selectedDay.value = day;
    selectedDayIndex.value = day.rawDate.day();
  };

  const setSelectedDayIndex = (index: number) => (selectedDayIndex.value = index);
  const getUnplannedTasks = async () => {
    const data = await tasksReq.getAllUnplannedTasksReq();
    console.log('getUnplannedTasks', data);
    unplannedTasks.value = data;
  };

  const getSelectedDateTasks = async (day: Dayjs | string = selectedDayString.value) => {
    const dayString = typeof day === 'string' ? day : day.format('YYYY-MM-DD');
    selectedDateTasks.value = await tasksReq.getSelectedDateTasksReq(dayString);
  };

  const preUpdateTaskPriorities = async (task: Task) => {
    const unrefSelectedDateTasks = selectedDateTasks.value.map(t => toRaw(t));
    const existingTasks = unrefSelectedDateTasks.filter(t => t.id !== task.id);
    reorderTasks.value = await tasksReq.preUpdateTaskPrioritiesReq(task, existingTasks);
    console.log('original tasks', selectedDateTasks.value);
    console.log('reordered tasks', reorderTasks);
  };

  const updateTaskPriorities = async (tasks: Task[]) => {
    await tasksReq.updateTaskPrioritiesReq(tasks);
    await Promise.all([getUnplannedTasks(), getSelectedDateTasks()]);
  };

  const updateTask = async (task: Task) => {
    await tasksReq.updateTaskReq(task);
    await Promise.all([getUnplannedTasks(), getSelectedDateTasks()]);
  };

  const deleteTaskById = async (id: string) => {
    try {
      await tasksReq.deleteTaskReq(id);
      await Promise.all([getUnplannedTasks(), getSelectedDateTasks()]);
    } catch (error) {
      console.error('error', error);
    }
  };

  watch(selectedDay, () => getSelectedDateTasks());

  return {
    unplannedTasks,
    selectedDateTasks,
    reorderTasks,
    headerTitle,
    selectedDayString,
    selectedDay,
    selectedDayIndex,
    setSelectedDay,
    setSelectedDayIndex,
    getUnplannedTasks,
    getSelectedDateTasks,
    preUpdateTaskPriorities,
    updateTaskPriorities,
    deleteTaskById,
    updateTask,
  };
});
