import {contextBridge, ipcRenderer} from 'electron';
import type {CreateTask, GetAllTasks, GetAllTaskTitles} from '/@/types/task';

try {
  contextBridge.exposeInMainWorld('tasksApi', {
    getAllTasksReq: (...args: Parameters<GetAllTasks>) =>
      ipcRenderer.invoke('getAllTasksReq', ...args),
    getAllTaskTitlesReq: (...args: Parameters<GetAllTaskTitles>) =>
      ipcRenderer.invoke('getAllTaskTitlesReq', ...args),
    createTaskReq: (...args: Parameters<CreateTask>) =>
      ipcRenderer.invoke('createTaskReq', ...args),
  });
} catch (error) {
  console.error(error);
}
