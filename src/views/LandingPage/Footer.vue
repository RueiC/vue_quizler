<script setup lang="ts">
import image from "../../assets/index";
import { footerLists, socialMediaLists } from "../../utils/data";
</script>

<template>
  <footer class="md:px-[3rem]">
    <div
      class="flex flex-col items-center justify-center gap-[3rem] py-[6rem] bg-quizler-blue-1"
    >
      <a href="#">
        <img class="w-[15rem]" :src="`${image.logo_white}`" alt="logo" />
      </a>

      <ul class="flex gap-[3rem] items-center text-white">
        <li
          v-for="footerList in footerLists"
          class="cursor-pointer"
          :key="footerList.name"
        >
          {{ footerList.name }}
        </li>
      </ul>

      <div
        class="flex flex-col gap-[1rem] items-center justify-center text-white"
      >
        <h3>社群</h3>
        <ul class="flex gap-[2rem]">
          <li
            v-for="socialMediaList in socialMediaLists"
            class="cursor-pointer"
            :key="socialMediaList.name"
          >
            <i :class="socialMediaList.name"></i>
          </li>
        </ul>
      </div>

      <small class="text-white">&copy; Quizler. All Rights Reserved.</small>
    </div>
  </footer>
</template>
