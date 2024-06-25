import type dayjs from 'dayjs';

export interface Day {
  rawDate: dayjs.Dayjs;
  date: string;
  weekDay: string;
  isToday?: boolean;
  isSelected?: boolean;
}

export interface Week {
  start: string;
  end: string;
  days: Day[];
}
