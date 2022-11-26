<script setup lang="ts">
import image from "../../assets/index";
</script>

<template>
  <section class="md:px-[3rem] pt-[40rem]" data-aos="fade-up">
    <div
      class="flex items-center justify-center px-[3rem] ss:px-[7rem] h-[72rem] bg-cover bg-motivation"
    >
      <div
        class="flex items-center justify-between flex-col md:flex-row gap-[6rem] md:gap-[12rem] md:px-[12rem]"
      >
        <div class="text-center md:text-left">
          <h3
            class="text-[2.8rem] font-bold text-quizler-black-1 mb-[5rem] transition-all duration-100 ease-linear hover:-translate-y-[5px]"
          >
            準備好你的腦袋，剩下的就交給我們
          </h3>
          <p class="text-[2.4rem] text-quizler-black-2">
            從能幫助你學習外語的單字卡、到有助於你理解歷史的遊戲，我們有各式各樣的工具能讓你克服任何挑戰。
          </p>
        </div>

        <img
          class="w-[40%] md:w-[35%] transition-all duration-100 ease-linear hover:scale-105"
          :src="image.effect_3"
          alt="Picture"
        />
      </div>
    </div>
  </section>
</template>
