export interface Task {
  id: string;
  title: string;
  icon: string;
  priority: number;
  mental_load: number;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export enum TaskType {
  UNPLANNED,
  TODAY,
}

export interface NewTask {
  title: Task['title'];
  icon: string;
  taskType: TaskType;
  mentalLoad: number;
}

export interface SuggestionTask {
  id: string;
  title: string;
  icon: string;
}

export type GetAllTasks = () => Promise<Task[]>;

export type GetAllTaskTitles = () => Promise<string[]>;

export type CreateTask = (taskData: Partial<Task>) => Promise<Task>;
