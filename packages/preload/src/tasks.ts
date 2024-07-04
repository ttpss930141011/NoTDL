import {ipcRenderer} from 'electron';
import type {
  CreateTask,
  GetAllTasks,
  GetAllTaskTitles,
  GetSelectedDateTasks,
  GetAllUnplannedTasks,
  CreateSelectedDateTask,
  PreUpdateTaskPriorities,
  UpdateTaskPriorities,
  UpdateTask,
  DeleteTask,
} from '#shared/task';

const getAllTasksReq: GetAllTasks = async (...args) =>
  ipcRenderer.invoke('getAllTasksReq', ...args);

const getAllUnplannedTasksReq: GetAllUnplannedTasks = async (...args) =>
  ipcRenderer.invoke('getAllUnplannedTasksReq', ...args);

const getSelectedDateTasksReq: GetSelectedDateTasks = async (...args) =>
  ipcRenderer.invoke('getSelectedDateTasksReq', ...args);

const getAllTaskTitlesReq: GetAllTaskTitles = async (...args) =>
  ipcRenderer.invoke('getAllTaskTitlesReq', ...args);

const createSelectedDateTaskReq: CreateSelectedDateTask = async (...args) =>
  ipcRenderer.invoke('createSelectedDateTaskService', ...args);

const createUnplannedTaskReq: CreateTask = async (...args) =>
  ipcRenderer.invoke('createUnplannedTaskReq', ...args);

const preUpdateTaskPrioritiesReq: PreUpdateTaskPriorities = async (...args) =>
  ipcRenderer.invoke('preUpdateTaskPrioritiesReq', ...args);
const updateTaskPrioritiesReq: UpdateTaskPriorities = async (...args) =>
  ipcRenderer.invoke('updateTaskPrioritiesReq', ...args);

const deleteTaskReq: DeleteTask = async (...args) => ipcRenderer.invoke('deleteTaskReq', ...args);

const updateTaskReq: UpdateTask = async (...args) => ipcRenderer.invoke('updateTaskReq', ...args);

const tasks = {
  getAllTasksReq,
  getAllUnplannedTasksReq,
  getSelectedDateTasksReq,
  getAllTaskTitlesReq,
  createSelectedDateTaskReq,
  createUnplannedTaskReq,
  preUpdateTaskPrioritiesReq,
  updateTaskPrioritiesReq,
  deleteTaskReq,
  updateTaskReq,
};

export default tasks;
