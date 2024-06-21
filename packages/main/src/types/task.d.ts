class Task {
  id: string;
  title: string;
  priority: number;
  mental_load: number;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export type GetAllTasks = () => Promise<Task[]>;

export type GetAllTaskTitles = () => Promise<string[]>;

export type CreateTask = (taskData: Partial<Task>) => Promise<Task>;
