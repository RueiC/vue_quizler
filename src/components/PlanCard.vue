<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { Ref } from "vue";
import { planLists } from "../utils/data";

interface Props {
  title: string;
  color: string;
  buttonColor: string;
  plansNum: number;
  price: number;
}

const props = defineProps<Props>();

const isRotate: Ref<boolean> = ref(false);
</script>

<template>
  <div
    class="perspective-100 w-[40rem] h-[55rem]"
    @mouseenter="isRotate = true"
    @mouseleave="isRotate = false"
  >
    <div
      :class="`relative w-full cursor-pointer preserve-3d h-full ${
        isRotate && 'rotate-y-180'
      }`"
    >
      <div
        :class="`flex flex-col items-start justify-start gap-[6rem] absolute w-full h-full overflow-hidden rounded-[1rem] text-black/70 text-[4rem] font-bold backface-visibility-hidden py-[5rem] px-[6.5rem] ${props.color}`"
      >
        <div class="flex flex-col">
          <p class="text-[2rem] font-medium">{{ props.title }}</p>
          <p class="text-[5rem]">
            {{ "$" + props.price
            }}<span class="text-[1.2rem] ml-[1rem]">/ 月</span>
          </p>
        </div>

        <ul class="flex flex-col gap-[1.8rem]">
          <li
            v-for="planList in planLists.slice(0, plansNum)"
            class="flex items-center gap-[2rem]"
            :key="planList.name"
          >
            <font-awesome-icon
              class="text-[2.2rem]"
              icon="fa-solid fa-circle-check"
            />
            <p class="text-[2rem] font-medium">
              {{ planList.name }}
            </p>
          </li>
        </ul>
      </div>

      <div
        :class="`flex items-center justify-center absolute w-full h-full overflow-hidden rounded-[1rem] text-black/70 text-[4rem] font-bold backface-visibility-hidden rotate-y-180 ${props.color}`"
      >
        <button
          :class="`flex items-center justify-center rounded-full px-[3.5rem] py-[2rem] text-[2.8rem] cursor-pointer font-medium opacity-100 hover:scale-105 hover:opacity-90 transition-all duration-200 ease-linear ${props.buttonColor}`"
        >
          選擇方案
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.perspective-100 {
  perspective: 1000px;
}

.preserve-3d {
  transition: transform 1s;
  transform-style: preserve-3d;
}

.backface-visibility-hidden {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  box-shadow: 0px 3px 18px 3px rgba(0, 0, 0, 0.2);
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
