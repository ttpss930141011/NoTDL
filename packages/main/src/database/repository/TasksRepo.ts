import {Task} from '../entity/Task';
import {datasource} from '../index';

export const getAllTasks = async () => {
  const taskRepository = datasource.getRepository(Task);
  return await taskRepository.find();
};

export const getAllTaskTitles = async () => {
  const taskRepository = datasource.getRepository(Task);
  const tasks = await taskRepository.find({select: ['title']});
  return tasks.map(task => task.title);
};

export const createTask = async (taskData: Partial<Task>) => {
  const taskRepository = datasource.getRepository(Task);
  const newTask = taskRepository.create(taskData);

  try {
    return await taskRepository.save(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    return false;
  }
};

export const deleteTask = async (id: string) => {
  const taskRepository = datasource.getRepository(Task);
  try {
    await taskRepository.delete(id);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};
