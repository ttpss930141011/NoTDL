import {ref} from 'vue';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

interface Day {
  date: string;
  activities: string;
}

interface Week {
  start: string;
  end: string;
  days: Day[];
}

export function useWeek() {
  const currentWeek = ref<dayjs.Dayjs>(dayjs());

  const getWeek = (date: dayjs.Dayjs): Week => {
    const start = date.startOf('isoWeek');
    const end = date.endOf('isoWeek');
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push({
        date: start.add(i, 'day').format('YYYY-MM-DD'),
        activities: `Activity ${i + 1}`,
      });
    }
    return {
      start: start.format('YYYY-MM-DD'),
      end: end.format('YYYY-MM-DD'),
      days,
    };
  };

  const current = ref<Week>(getWeek(currentWeek.value));
  const previous = ref<Week>(getWeek(currentWeek.value.subtract(1, 'week')));
  const next = ref<Week>(getWeek(currentWeek.value.add(1, 'week')));

  const weeks = ref<Week[]>([previous.value, current.value, next.value]);

  /**
   * When the user reaches the end of the weeks array, we need to add a new week after the last week.
   */
  const onReachEnd = () => {
    const lastWeek = weeks.value[weeks.value.length - 1];
    const newWeek = getWeek(dayjs(lastWeek.end).add(1, 'day'));
    weeks.value.push(newWeek);
  };

  /**
   * When the user reaches the start of the weeks array, we need to add a new week before the first week.
   */
  const onReachStart = () => {
    const firstWeek = weeks.value[0];
    const newWeek = getWeek(dayjs(firstWeek.start).subtract(1, 'day'));
    weeks.value.unshift(newWeek);
  };

  return {
    weeks,
    onReachEnd,
    onReachStart,
  };
}
