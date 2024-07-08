import {JsonOutputParser} from '@langchain/core/output_parsers';
import {ChatPromptTemplate} from '@langchain/core/prompts';
import {ChatOpenAI} from '@langchain/openai';
import type {ResGetIconByTitle} from '#shared/agent';

const model = new ChatOpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  model: 'gpt-4o',
  temperature: 0,
});

const formatInstructions = `Respond only in valid JSON. The JSON object you return should match the following schema:
{{ icon: string }}

Where data is an objects, each with icon string.
`;

// Set up a parser
const parser = new JsonOutputParser<ResGetIconByTitle>();

// Prompt
const prompt = await ChatPromptTemplate.fromMessages([
  [
    'system',
    `You will receive a task title and should return the Material Design icon associated with that task.
    The icon will start with 'mdi-' followed by the icon name.
    Answer the user query. Wrap the output in \`json\` tags\n{format_instructions}`,
  ],
  ['human', 'title: {title}'],
]).partial({
  format_instructions: formatInstructions,
});
export const chain = prompt.pipe(model).pipe(parser);
