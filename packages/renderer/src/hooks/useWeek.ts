import {reactive, ref, watch} from 'vue';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import type {Day, Week} from '/@/types/week';
import {storeToRefs} from 'pinia';
import {useWeekStore} from '/@/store/week';

dayjs.extend(isoWeek);

export function useWeek() {
  const currentDate = ref<dayjs.Dayjs>(dayjs());
  const weekStore = useWeekStore();
  const {selectedDayIndex} = storeToRefs(weekStore);
  const {setSelectedDay, setSelectedDayIndex} = weekStore;

  /**
   * Generate a week object with the days of the week.
   * @param date
   */
  const getWeek = (date: dayjs.Dayjs): Week => {
    const start = date.startOf('week');
    const end = date.endOf('week');
    const days: Day[] = [];
    for (let i = 0; i < 7; i++) {
      const day = start.add(i, 'day');
      days.push(
        reactive({
          rawDate: day,
          date: day.format('DD'),
          weekDay: day.format('ddd'),
          activities: `Activity ${i + 1}`,
          isToday: day.isSame(dayjs(), 'day'),
          isSelected: i === selectedDayIndex.value,
        }),
      );
    }
    return {
      start: start.format('YYYY-MM-DD'),
      end: end.format('YYYY-MM-DD'),
      days,
    };
  };

  const current = ref<Week>(getWeek(currentDate.value));
  const previous = ref<Week>(getWeek(currentDate.value.subtract(1, 'week')));
  const next = ref<Week>(getWeek(currentDate.value.add(1, 'week')));

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

  /**
   * Watch the selectedDayIndex and update the isSelected property of the days in the weeks array.
   */
  watch(selectedDayIndex, index => {
    weeks.value.forEach(week => {
      week.days = week.days.map((day, i) => {
        day.isSelected = i === index;
        return day;
      });
    });
  });

  /**
   * When the user selects a day, we need to update the selectedDay and selectedDayIndex.
   * @param day
   */
  const onSelectedDay = (day: Day) => {
    const indexOfWeek = weeks.value.findIndex(week => week.days.includes(day));
    if (indexOfWeek === -1) return;
    const indexOfDay = weeks.value[indexOfWeek].days.findIndex(d => d === day);
    if (indexOfDay === -1) return;

    setSelectedDay(day);
    setSelectedDayIndex(indexOfDay);
  };

  /**
   * When the user navigates to the previous week, we need to update the selectedDay.
   * @param activeIndex
   */
  const onNavigationPrev = (activeIndex: number | undefined) => {
    setSelectedDay(weeks.value[activeIndex!].days[selectedDayIndex.value]);
  };

  /**
   * When the user navigates to the next week, we need to update the selectedDay.
   * @param activeIndex
   */
  const onNavigationNext = (activeIndex: number | undefined) => {
    setSelectedDay(weeks.value[activeIndex!].days[selectedDayIndex.value]);
  };

  return {
    weeks,
    onReachEnd,
    onReachStart,
    onSelectedDay,
    onNavigationPrev,
    onNavigationNext,
  };
}
