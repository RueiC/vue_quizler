<script setup lang="ts">
import { useStore } from "vuex";
import type { Commit } from "vuex";
import { Motion, Presence } from "motion/vue";
import image from "../assets/index";
import { SignInForm, SignUpForm } from "./index";

const { commit, getters }: { commit: Commit; getters: any } = useStore();
</script>

<template>
  <!-- Desktop -->
  <div
    v-show="getters.isModalOpen"
    class="fixed top-0 left-0 bg-black/50 w-full h-[100vh]"
  />
  <Presence>
    <motion
      v-show="getters.isModalOpen"
      class="hidden md:flex items-center justify-center md:fixed top-0 left-0 w-full h-[100vh] z-50"
      :initial="{ opacity: 0, scale: 0.5 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.6 }"
    >
      <div
        class="relative flex items-center justify-between w-[121rem] h-[76rem] rounded-[3rem] bg-white"
      >
        <SignInForm :type="'desktop'" />
        <SignUpForm :type="'desktop'" />

        <div
          :class="`absolute flex items-center justify-center w-[60.5rem] h-[76rem] transition-all duration-500 ease-in-out ${
            getters.inSignInForm && 'translate-x-[100%]'
          }`"
        >
          <img :src="image.effect_2" alt="" />
        </div>

        <i
          class="fa-solid fa-circle-xmark absolute top-10 right-10 text-black text-[3.5rem] opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer"
          @click="commit('CLOSE_MODAL')"
        ></i>
      </div>
    </motion>
  </Presence>

  <!-- Mobile -->
  <div
    v-show="getters.isModalOpen"
    class="fixed top-0 left-0 w-[100%] h-full z-50 overflow-hidden md:hidden"
  >
    <div class="relative flex items-center justify-between w-[200%] h-full">
      <div
        className="relative flex items-center justify-between w-[200%] h-full bg-white"
      >
        <SignInForm :type="'mobile'" />
        <SignUpForm :type="'mobile'" />
      </div>
    </div>
    <i
      class="fa-solid fa-circle-xmark absolute top-10 right-10 text-black text-[3.5rem] opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer"
      @click="commit('CLOSE_MODAL')"
    ></i>
  </div>
</template>
