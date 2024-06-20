import type {GetAllTasks, CreateTask, GetAllTaskTitles} from '/@/types/task';

export interface tasksApi {
  getAllTasksReq: GetAllTasks;
  getAllTaskTitlesReq: GetAllTaskTitles;
  createTaskReq: CreateTask;
}

declare global {
  interface Window {
    tasksApi: tasksApi;
  }
}
