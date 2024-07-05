import {
  createTask,
  deleteTask,
  getAllTasks,
  getAllUnplannedTasks,
  getAllTaskTitles,
  getAllTasksWithinDateRange,
  updateTaskPriorities,
  updateTask,
} from '/@/database/repository/TasksRepo';
import type {
  CreateSelectedDateTask,
  CreateTask,
  GetAllTaskTitles,
  GetSelectedDateTasks,
  NewTask,
  PreUpdateTaskPriorities,
  Task,
  UpdateTaskPriorities,
  UpdateTask,
} from '#shared/task';
import {chain} from '/@/agent/openai';
import dayjs from 'dayjs';

export const getAllTasksService = async () => {
  console.log('getAllTasks');
  return await getAllTasks();
};

export const getAllUnplannedTasksService = async () => {
  const unplannedTasks = await getAllUnplannedTasks();
  return unplannedTasks.sort((a, b) => a.priority - b.priority);
};

export const getSelectedDateTasksService: GetSelectedDateTasks = async dayString => {
  const selectedDate = dayjs(dayString);
  const startOfSelectedDate = selectedDate.startOf('day').toDate();
  const endOfSelectedDate = selectedDate.endOf('day').toDate();
  const tasks = await getAllTasksWithinDateRange(startOfSelectedDate, endOfSelectedDate);
  const selectedDateTasks = tasks.filter(t => !t.is_unplanned);
  return selectedDateTasks.sort((a, b) => a.priority - b.priority);
};

export const getAllTaskTitlesService = async (...args: Parameters<GetAllTaskTitles>) => {
  console.log('getAllTaskTitles', args);
  return await getAllTaskTitles();
};

export const createUnplannedTaskService = async (...args: Parameters<CreateTask>) => {
  const newTaskData = args[0] as NewTask;
  console.log('createUnplannedTask', newTaskData);
  const existingUnplannedTasks = await getAllUnplannedTasks();
  const newPriority = existingUnplannedTasks.length ? existingUnplannedTasks.length + 1 : 1;
  const task: Partial<Task> = {
    title: newTaskData.title,
    icon: newTaskData.icon,
    color: newTaskData.color,
    priority: newPriority,
    is_unplanned: true,
    mental_load: newTaskData.mentalLoad,
    is_completed: false,
  };
  return await createTask(task);
};

export const createSelectedDateTaskService = async (
  ...args: Parameters<CreateSelectedDateTask>
) => {
  console.log('createSelectedDateTask START!!', args);
  const [newTaskData, dataString] = args;
  // Step 1: Query all tasks for the selected date
  const selectedDate = dayjs(dataString);
  const startOfSelectedDate = selectedDate.startOf('day').toDate();
  const endOfSelectedDate = selectedDate.endOf('day').toDate();

  const tasks = await getAllTasksWithinDateRange(startOfSelectedDate, endOfSelectedDate);
  const existingTasks = tasks.filter(t => !t.is_unplanned);

  // Step 2: Set priority based on the number of tasks for that day
  const newPriority = existingTasks.length ? existingTasks.length + 1 : 1;

  // Step 3: Create and save the new task

  return await createTask({
    title: newTaskData.title,
    icon: newTaskData.icon,
    color: newTaskData.color,
    is_unplanned: false,
    priority: newPriority,
    mental_load: newTaskData.mentalLoad,
    is_completed: false,
    task_date: selectedDate.toDate(),
  });
};

export const preUpdateTaskPrioritiesService = async (
  ...args: Parameters<PreUpdateTaskPriorities>
) => {
  const [task, existingTasks, extraPrompt = ''] = args;
  console.log('preUpdateTaskPrioritiesService', task, existingTasks);
  const {prioritizedTasks} = await chain.invoke({
    newTask: JSON.stringify(task),
    existingTasks: JSON.stringify(existingTasks),
    extraPrompt,
  });
  return prioritizedTasks;
};

export const updateTaskPrioritiesService = async (...args: Parameters<UpdateTaskPriorities>) => {
  const [tasks] = args;
  await updateTaskPriorities(tasks);
  return tasks;
};

export const deleteTaskService = async (id: string) => {
  console.log('deleteTask', id);
  return await deleteTask(id);
};

export const updateTaskService = async (...args: Parameters<UpdateTask>) => {
  const [task] = args;
  return await updateTask(task);
};
