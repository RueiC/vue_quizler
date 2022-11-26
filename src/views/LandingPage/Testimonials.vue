<script setup lang="ts">
import { watch, ref, onUnmounted } from "vue";
import type { Ref } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import { slides } from "../../utils/data";
import { SlideCard } from "../../components/index";
import "vue3-carousel/dist/carousel.css";

const colsNum: Ref<number | null> = ref(null);

const getWindowDimensions = (): { width: number; height: number } => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const handleResize = () => {
  const screenSize: number = getWindowDimensions().width;

  if (screenSize < 600) colsNum.value = 1;
  if (screenSize >= 600) colsNum.value = 1.95;
  if (screenSize >= 800) colsNum.value = 2.95;
  if (screenSize >= 1000) colsNum.value = 3.95;
  if (screenSize >= 1400) colsNum.value = 4.95;
};

watch(
  colsNum,
  (): void => {
    if (!colsNum.value) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
  },
  { immediate: true }
);

onUnmounted(() => window.removeEventListener("resize", handleResize));
</script>

<template>
  <section
    v-if="slides"
    class="w-full pt-[40rem]"
    id="testimonial"
    data-aos="fade-up"
  >
    <h1
      class="text-quizler-purple text-center text-[4rem] font-bold mb-[15rem] md:mb-[5rem] transition-all duration-100 ease-linear hover:-translate-y-[5px]"
    >
      用戶們怎麼說
    </h1>
    <Carousel
      :itemsToShow="colsNum as number"
      :wrapAround="true"
      :transition="500"
    >
      <Slide v-for="slide in slides" :key="slide.author">
        <SlideCard :slide="slide" />
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </section>
</template>

<style scoped>
/* .carousel__slide {
  padding: 5px;
} */

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.3;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 0.7;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--next {
  opacity: 0.7;
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.05);
}
</style>
