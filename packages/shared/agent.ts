import type {Task} from './task';

export interface ResGetIconByTitle {
  icon: string;
}

export type GetIconByTitle = (title: Task['title']) => Promise<ResGetIconByTitle>;
