import {Task} from '/@/database/entity/Task';
import type {Task as TaskInterface} from '#shared/task';
import {datasource} from '../index';
import {Between} from 'typeorm';

export const getAllTasks = async (): Promise<Task[]> => {
  const taskRepository = datasource.getRepository(Task);
  try {
    return await taskRepository.find();
  } catch (error) {
    console.error('Failed to get all tasks:', error);
    throw error;
  }
};

export const getAllUnplannedTasks = async (): Promise<Task[]> => {
  const taskRepository = datasource.getRepository(Task);
  try {
    return await taskRepository.find({where: {is_unplanned: true}});
  } catch (error) {
    console.error('Failed to get unplanned tasks:', error);
    throw error;
  }
};

export const getAllTasksWithinDateRange = async (
  startDate: Date,
  endDate: Date,
): Promise<Task[]> => {
  const taskRepository = datasource.getRepository(Task);
  try {
    return await taskRepository.find({
      where: {task_date: Between(startDate, endDate)},
    });
  } catch (error) {
    console.error('Failed to get tasks within date range:', error);
    throw error;
  }
};

export const updateTaskPriorities = async (tasks: TaskInterface[]): Promise<void> => {
  const taskRepository = datasource.getRepository(Task);
  try {
    for (const task of tasks) {
      await taskRepository.update({id: task.id}, {priority: task.priority});
    }
  } catch (error) {
    console.error('Failed to update task priorities:', error);
    throw error;
  }
};

export const getAllTaskTitles = async (): Promise<string[]> => {
  const taskRepository = datasource.getRepository(Task);
  try {
    const tasks = await taskRepository.find({select: ['title']});
    return tasks.map(task => task.title);
  } catch (error) {
    console.error('Failed to get all task titles:', error);
    throw error;
  }
};

export const createTask = async (newTask: Partial<Task>): Promise<Task> => {
  const taskRepository = datasource.getRepository(Task);
  try {
    const task = taskRepository.create(newTask);
    return await taskRepository.save(task);
  } catch (error) {
    console.error('Failed to create a task:', error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  const taskRepository = datasource.getRepository(Task);
  try {
    await taskRepository.delete(id);
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
};

export const updateTask = async (task: TaskInterface): Promise<void> => {
  const taskRepository = datasource.getRepository(Task);
  try {
    await taskRepository.update({id: task.id}, task);
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error;
  }
};
