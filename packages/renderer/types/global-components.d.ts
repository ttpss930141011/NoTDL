import type {GetAllTasks, CreateTask, GetAllTaskTitles} from '#shared/task';

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
