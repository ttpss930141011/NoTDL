import {ipcRenderer} from 'electron';
import type {CreateTask, GetAllTasks, GetAllTaskTitles} from '#shared/task';

export const getAllTasksReq = async (...args: Parameters<GetAllTasks>) =>
  ipcRenderer.invoke('getAllTasksReq', ...args);

export const getAllTaskTitlesReq = async (...args: Parameters<GetAllTaskTitles>) =>
  ipcRenderer.invoke('getAllTaskTitlesReq', ...args);

export const createTaskReq = async (...args: Parameters<CreateTask>) =>
  ipcRenderer.invoke('createTaskReq', ...args);

export const deleteTaskReq = async (id: string) => ipcRenderer.invoke('deleteTaskReq', id);
