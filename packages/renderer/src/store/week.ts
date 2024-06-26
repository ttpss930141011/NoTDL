import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import dayjs from 'dayjs';
import type {Day} from '#shared/week';

export const useWeekStore = defineStore('week', () => {
  const selectedDay = ref<Day>({
    rawDate: dayjs(),
    date: dayjs().format('DD'),
    weekDay: dayjs().format('ddd'),
    isToday: true,
    isSelected: true,
  });
  const headerTitle = computed<string>(() => selectedDay.value.rawDate.format('YYYY / MM'));

  const selectedDayIndex = ref<number>(dayjs().day());

  const setSelectedDay = (day: Day) => {
    selectedDay.value = day;
    selectedDayIndex.value = day.rawDate.day();
  };

  const setSelectedDayIndex = (index: number) => (selectedDayIndex.value = index);

  return {
    headerTitle,
    selectedDay,
    selectedDayIndex,
    setSelectedDay,
    setSelectedDayIndex,
  };
});
