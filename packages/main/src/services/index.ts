import {
  createTask,
  getAllTaskTitles,
  getAllTasks,
  deleteTask,
} from '/@/database/repository/TasksRepo';
import type {CreateTask, GetAllTaskTitles} from '/@/types/task';

export const getAllTasksService = async () => {
  console.log('getAllTasks');
  return await getAllTasks();
};
export const getAllTaskTitlesService = async (...args: Parameters<GetAllTaskTitles>) => {
  console.log('getAllTaskTitles', args);
  return await getAllTaskTitles();
};

export const createTaskService = async (...args: Parameters<CreateTask>) => {
  console.log('createTask', args);
  const taskData = args[0];
  return await createTask(taskData);
};

export const deleteTaskService = async (id: string) => {
  console.log('deleteTask', id);
  return await deleteTask(id);
};
