import type {TaskType} from './enum';

export interface Task {
  id: string;
  title: string;
  icon: string;
  color: string;
  is_unplanned: boolean;
  priority: number;
  mental_load: number;
  is_completed: boolean;
  task_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface NewTask {
  title: Task['title'];
  icon: string;
  color: string;
  taskType: TaskType;
  mentalLoad: number;
}

export interface SuggestionTask {
  id: string;
  title: string;
  icon: string;
  mental_load: number;
}

export type GetAllTasks = () => Promise<Task[]>;

export type GetAllUnplannedTasks = () => Promise<Task[]>;

export type GetSelectedDateTasks = (dayString: string) => Promise<Task[]>;

export type GetAllTaskTitles = () => Promise<string[]>;

export type CreateSelectedDateTask = (newTask: NewTask, dayString: string) => Promise<Task>;

export type CreateTask = (newTask: NewTask) => Promise<Task>;

export type PreUpdateTaskPriorities = (
  task: Task,
  existingTasks: Task[],
  prompt?: string,
) => Promise<Task[]>;

export type UpdateTaskPriorities = (tasks: Task[]) => Promise<void>;

export type UpdateTask = (task: Task) => Promise<void>;

export type DeleteTask = (id: string) => Promise<void>;
