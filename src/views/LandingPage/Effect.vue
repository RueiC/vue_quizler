<script setup lang="ts">
import image from "../../assets/index.js";
</script>

<template>
  <section
    class="flex flex-col gap-[10rem] px-[3rem] ss:px-[8rem] md:px-[20rem] pt-[40rem]"
    id="effect"
  >
    <div data-aos="fade-up">
      <h2
        class="text-quizler-purple text-center text-[4rem] font-bold mb-[15rem] md:mb-[5rem] transition-all duration-100 ease-linear hover:-translate-y-[5px]"
      >
        使用Quizler的學生中，有 90% 都獲得了更高的分數
      </h2>

      <div
        class="flex flex-col md:flex-row items-center justify-center gap-[10rem] md:gap-[30rem]"
      >
        <div class="text-center md:text-left">
          <h3
            class="text-[2.8rem] mb-[5rem] text-quizler-black-1 font-bold transition-all duration-100 ease-linear hover:-translate-y-[5px]"
          >
            準備好你的腦袋，剩下的就交給我們
          </h3>
          <p class="text-[2.4rem] text-quizler-black-2">
            從能幫助你學習外語的單字卡、到有助於你理解歷史的遊戲，我們有各式各樣的工具能讓你克服任何挑戰。
          </p>
        </div>

        <img
          class="block w-[50%] md:w-[30%] transition-all duration-100 ease-linear hover:scale-105"
          :src="image.effect_1"
          alt="Picture"
        />
      </div>
    </div>

    <div data-aos="fade-up">
      <div
        class="flex flex-col md:flex-row-reverse items-center justify-center gap-[10rem] md:gap-[30rem]"
      >
        <div class="text-center md:text-left">
          <h3
            class="text-[2.8rem] mb-[5rem] font-bold text-quizler-black-1 transition-all duration-100 ease-linear hover:-translate-y-[5px]"
          >
            準備好你的腦袋，剩下的就交給我們
          </h3>
          <p class="text-[2.4rem] text-quizler-black-2">
            從能幫助你學習外語的單字卡、到有助於你理解歷史的遊戲，我們有各式各樣的工具能讓你克服任何挑戰。
          </p>
        </div>

        <img
          class="block w-[50%] md:w-[30%] transition-all duration-100 ease-linear hover:scale-105"
          :src="image.effect_2"
          alt="Picture"
        />
      </div>
    </div>

    <div data-aos="fade-up">
      <div
        class="flex flex-col md:flex-row items-center justify-center gap-[10rem] md:gap-[30rem]"
      >
        <div class="text-center md:text-left">
          <h3
            class="text-[2.8rem] mb-[5rem] font-bold text-quizler-black-1 transition-all duration-100 ease-linear hover:-translate-y-[5px]"
          >
            準備好你的腦袋，剩下的就交給我們
          </h3>
          <p class="text-[2.4rem] text-quizler-black-2">
            從能幫助你學習外語的單字卡、到有助於你理解歷史的遊戲，我們有各式各樣的工具能讓你克服任何挑戰。
          </p>
        </div>

        <img
          class="block w-[50%] md:w-[30%] transition-all duration-100 ease-linear hover:scale-105"
          :src="image.effect_3"
          alt="Picture"
        />
      </div>
    </div>
  </section>
</template>
