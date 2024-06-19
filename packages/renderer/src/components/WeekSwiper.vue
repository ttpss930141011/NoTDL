<template>
  <div class="week-swiper-container">
    <swiper
      id="week-swiper"
      navigation
      class="mySwiper"
      :initial-slide="1"
      :slides-per-view="1"
      :modules="[Navigation]"
      @swiper="setSwiper"
      @slide-change-transition-end="onSlideChange"
      @navigation-prev="() => onNavigationPrev(swiperRef?.activeIndex)"
      @navigation-next="() => onNavigationNext(swiperRef?.activeIndex)"
    >
      <swiper-slide
        v-for="(week, index) in weeks"
        :key="index"
      >
        <div class="week-slide">
          <div class="week-body">
            <div
              v-for="day in week.days"
              :key="day.date"
              class="day"
            >
              <div class="font-weight-thin text-grey-lighten-1 text-body-2"> {{ day.weekDay }}</div>
              <v-btn
                :variant="day.isSelected ? 'tonal' : 'text'"
                size="x-small"
                :class="
                  clsx('rounded-xl', {
                    'text-primary': day.isToday,
                    'bg-secondary': day.isSelected && !day.isToday,
                    'text-none': !day.isToday && !day.isSelected,
                    'font-weight-bold': day.isToday || day.isSelected,
                  })
                "
                @click="onSelectedDay(day)"
              >
                {{ day.date }}
              </v-btn>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import {useWeek} from '/@/hooks/useWeek';
import type {Swiper as SwiperClass} from 'swiper/types';
import clsx from 'clsx';
import {Navigation} from 'swiper/modules';
import 'swiper/css/navigation';

const {
  weeks,
  headerTitle,
  onReachStart,
  onReachEnd,
  onSelectedDay,
  onNavigationPrev,
  onNavigationNext,
} = useWeek();

const swiperRef = ref<SwiperClass | null>(null);

const setSwiper = (swiper: SwiperClass) => (swiperRef.value = swiper);

const onSlideChange = () => {
  if (!swiperRef.value) return;
  const activeIndex = swiperRef.value.activeIndex;
  if (activeIndex === 0) {
    onReachStart();
    swiperRef.value?.slideTo(1, 0);
  } else if (activeIndex === weeks.value.length - 1) {
    onReachEnd();
  }
};
defineExpose({headerTitle});
</script>

<style scoped>
.week-swiper-container {
  width: 100%;
  height: 100%;
}

.mySwiper {
  width: 100%;
  height: 100%;
}

.week-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: 10%;
}

.week-body {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.day {
  text-align: center;
}

button {
  margin: 10px;
  padding: 5px 10px;
  font-size: 16px;
}
</style>
