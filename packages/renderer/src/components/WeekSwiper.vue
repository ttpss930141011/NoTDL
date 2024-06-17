<template>
  <div class="week-swiper-container">
    <swiper
      id="week-swiper"
      class="mySwiper"
      :initial-slide="1"
      :slides-per-view="1"
      @swiper="setSwiper"
      @slide-change-transition-end="onSlideChange"
    >
      <swiper-slide
        v-for="(week, index) in weeks"
        :key="index"
      >
        <div class="week-slide">
          <div class="week-header">
            <div>{{ week.start }} - {{ week.end }}</div>
          </div>
          <div class="week-body">
            <div
              v-for="day in week.days"
              :key="day.date"
              class="day"
            >
              <div>{{ day.date }}</div>
              <div>{{ day.activities }}</div>
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

const {weeks, onReachStart, onReachEnd} = useWeek();

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
}

.week-header {
  font-weight: bold;
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
