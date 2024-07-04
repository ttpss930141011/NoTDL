import {JsonOutputParser} from '@langchain/core/output_parsers';
import {ChatPromptTemplate} from '@langchain/core/prompts';
import {ChatOpenAI} from '@langchain/openai';
import type {Task} from '#shared/task';
import {createRestTask, getAllSelectedDateTasks} from '/@/agent/tools';

const model = new ChatOpenAI({
  model: 'gpt-4o',
  temperature: 0,
});
model.bindTools([createRestTask, getAllSelectedDateTasks]);

type PrioritizedTasks = {
  prioritizedTasks: Task[];
};

const formatInstructions = `Respond only in valid JSON. The JSON object you return should match the following schema:
{{ prioritizedTasks: [{{
  id: string,
  title: string,
  icon: string,
  color: string,
  is_unplanned: boolean,
  priority: number,
  mental_load: number,
  is_completed: boolean,
  task_date?: Date,
  created_at?: Date,
  updated_at?: Date
 }}] }}

Where prioritizedTasks is an array of objects, each with Task type field.
`;

// Set up a parser
const parser = new JsonOutputParser<PrioritizedTasks>();

// Prompt
const prompt = await ChatPromptTemplate.fromMessages([
  [
    'system',
    `As your personal task manager that want user to have a health mental condition,
    I can certainly help you organize the new task into existing tasks priorities considering:
    1. Urgency, Importance (by title),
    2. Cognitive Load if it is an info-intensive (by title),
    3. Mental Load (by mental_load)
    4. Productive time preference (by default people will do high cognitive first in a day)
    5. Rest time (schedule rest time after high cognitive load task)
    This is the new task: {newTask} and these are the existing tasks array: {existingTasks}
    Return all tasks with suggested work order for the day by updating the priority.
    Answer the user query. Wrap the output in \`json\` tags\n{format_instructions}`,
  ],
  [
    'human',
    'newTask: {newTask}, existingTasks: {existingTasks}, extra requirements: {extraPrompt}',
  ],
]).partial({
  format_instructions: formatInstructions,
});
export const chain = prompt.pipe(model).pipe(parser);
