import {Task} from '../entity/Task';
import type {Task as TaskInterface} from '#shared/task';
import {datasource} from '../index';
import {Between} from 'typeorm';

export const getAllTasks = async () => {
  const taskRepository = datasource.getRepository(Task);
  return await taskRepository.find();
};

export const getAllUnplannedTasks = async () => {
  const taskRepository = datasource.getRepository(Task);
  return await taskRepository.find({where: {is_unplanned: true}});
};

export const getAllTasksWithinDateRange = async (
  startDate: Date,
  endDate: Date,
): Promise<Task[]> => {
  const taskRepository = datasource.getRepository(Task);
  return taskRepository.find({
    where: {task_date: Between(startDate, endDate)},
  });
};

// Function to update task priorities in the database
export const updateTaskPriorities = async (tasks: TaskInterface[]) => {
  const taskRepository = datasource.getRepository(Task);
  for (const task of tasks) {
    await taskRepository.update({id: task.id}, {priority: task.priority});
  }
};

export const getAllTaskTitles = async () => {
  const taskRepository = datasource.getRepository(Task);
  const tasks = await taskRepository.find({select: ['title']});
  return tasks.map(task => task.title);
};

export const createTask = async (newTask: Partial<Task>) => {
  const taskRepository = datasource.getRepository(Task);
  const task = taskRepository.create(newTask);
  return await taskRepository.save(task);
};

export const deleteTask = async (id: string) => {
  const taskRepository = datasource.getRepository(Task);
  return await taskRepository.delete(id);
};

export const updateTask = async (task: TaskInterface) => {
  const taskRepository = datasource.getRepository(Task);
  return await taskRepository.update({id: task.id}, task);
};
