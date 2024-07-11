import type {GetIconByTitle} from '#shared/agent';
import {chain as iconAgent} from '/@/agent/icon';
import type {PreUpdateTaskPriorities} from '#shared/task';
import {chain as tasksAgent} from '/@/agent/tasks';

export const getIconByTitleService = async (...args: Parameters<GetIconByTitle>) => {
  const [title] = args;
  return await iconAgent.invoke({title});
};
export const preUpdateTaskPrioritiesService = async (
  ...args: Parameters<PreUpdateTaskPriorities>
) => {
  const [task, existingTasks, extraPrompt = ''] = args;
  console.log('preUpdateTaskPrioritiesService', task, existingTasks);
  const {prioritizedTasks} = await tasksAgent.invoke({
    newTask: JSON.stringify(task),
    existingTasks: JSON.stringify(existingTasks),
    extraPrompt,
  });
  return prioritizedTasks;
};
