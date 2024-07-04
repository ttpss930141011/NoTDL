import {tool} from '@langchain/core/tools';
import type {Task} from '/@/database/entity/Task';
import {createTask, getAllTasksWithinDateRange} from '/@/database/repository/TasksRepo';
import dayjs from 'dayjs';

export const createRestTask = tool(
  async (): Promise<string> => {
    const task: Partial<Task> = {
      title: 'Rest',
      icon: 'md-bed-clock',
      color: '#a0ff85',
      priority: 0,
      mental_load: 0,
      is_rest: true,
    };
    const data = await createTask(task);
    return JSON.stringify(data);
  },
  {
    name: 'createRestTask',
    description: 'Create a rest task',
  },
);

export const getAllSelectedDateTasks = tool(
  async (dayString: string): Promise<string> => {
    const selectedDate = dayjs(dayString);
    const startOfSelectedDate = selectedDate.startOf('day').toDate();
    const endOfSelectedDate = selectedDate.endOf('day').toDate();
    const tasks = await getAllTasksWithinDateRange(startOfSelectedDate, endOfSelectedDate);
    return JSON.stringify(tasks);
  },
  {
    name: 'getAllSelectedDateTasks',
    description: 'Get all tasks for a selected date',
  },
);
