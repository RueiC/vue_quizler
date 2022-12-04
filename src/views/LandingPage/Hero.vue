<script setup lang="ts">
import { type Commit, useStore } from 'vuex';
import image from '../../assets/index';
const { commit }: { commit: Commit } = useStore();
</script>

<template>
  <section class="md:px-[3rem]" data-aos="fade-up">
    <div
      class="flex items-center justify-center md:justify-start md:pl-[15rem] h-[91.1rem] xl:h-[120rem] bg-cover bg-hero"
    >
      <div class="flex flex-col items-center md:items-start">
        <img
          class="w-[25rem] md:w-[33rem] xl:w-[40rem]"
          :src="image.logo_white"
          alt="logo"
          loading="lazy"
        />
        <h1
          class="text-[3.5rem] md:text-[4.5rem] xl:text-[5.5rem] mb-[3rem] font-medium text-white tracking-[0.5rem]"
        >
          讓你的學習旅程<span
            class="text-[4.5rem] md:text-[5.5rem] xl:text-[6.5rem] tracking-[1rem] font-bold"
          >
            更順利</span
          >
        </h1>
        <button
          href=""
          class="bg-quizler-blue-1 text-white px-[3rem] py-[1.5rem] rounded-[1rem] text-[2.5rem] xl:text-[3.5rem] font-medium cursor-pointer hover:scale-105 duration-300 transition-all ease-in-out"
          type="button"
          @click="commit('OPEN_MODAL', true)"
        >
          開始學習
        </button>
      </div>
    </div>
  </section>
</template>
