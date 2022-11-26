<script setup lang="ts">
import { onMounted, ref, defineProps } from "vue";
import type { Ref } from "vue";
import type { Commit } from "vuex";
import type { User } from "@firebase/auth";
import { useStore } from "vuex";

import { auth, signOut } from "../includes/firebase";
import { navItems } from "../utils/data";
import image from "../assets/index";

interface Props {
  currentUser: User | null;
}

const props = defineProps<Props>();

const sticky: Ref<string> = ref("");
const showNavbar: Ref<boolean> = ref(false);
const { commit }: { commit: Commit } = useStore();

const showModal = (type: string): void => {
  if (type === "signIn") {
    commit("SET_FORM_TYPE_TO_SIGNIN");
    commit("OPEN_MODAL");
  } else {
    commit("SET_FORM_TYPE_TO_SIGNUP");
    commit("OPEN_MODAL");
  }
};

const checkIsLogedIn = (): void => {
  if (!props.currentUser) showModal("signIn");
};

onMounted(() => {
  window.addEventListener<"scroll">("scroll", (): void => {
    if (window.scrollY > 800)
      sticky.value = "fixed top-0 left-0 right-0 w-full z-50 shadow-lg";
    else sticky.value = "";
  });
});
</script>

<template>
  <!-- Desktop Nav -->
  <header
    :class="`${
      props.currentUser
        ? 'bg-quizler-blue-2 border-b-[0.5px] border-white/50'
        : 'bg-white'
    } ${sticky} hidden sm:block px-[7rem] py-[2.5rem]`"
  >
    <!-- Nav -->
    <nav class="flex items-center justify-between">
      <!-- Left -->
      <div class="flex items-center justify-center gap-[2rem]">
        <a :href="`${props.currentUser ? '/library' : '/'}`">
          <img
            class="w-[10rem] cursor-pointer"
            :src="props.currentUser ? image.logo_white : image.logo_blue"
            alt="Logo"
          />
        </a>
        <ul
          v-if="!props.currentUser"
          class="flex items-center justify-center gap-[3rem] text-[1.8rem]"
        >
          <li
            v-for="(navItem, i) in navItems"
            :key="i"
            :class="`text-quizler-black-1 transition-all duration-100 ease-linear hover:scale-110 font-medium`"
          >
            <Transition :duration="550">
              <a :href="navItem.link">{{ navItem.name }}</a>
            </Transition>
          </li>
          <li
            class="bg-quizler-blue-1 text-white px-[2rem] py-[0.8rem] rounded-[0.5rem] transition-all duration-100 ease-linear hover:scale-105 cursor-pointer"
            @click="checkIsLogedIn"
          >
            <a>建立學習集</a>
          </li>
        </ul>
      </div>

      <!-- Right -->
      <div v-if="!props.currentUser" class="flex gap-[3rem] text-[1.8rem]">
        <button
          class="transition-all duration-100 ease-linear hover:scale-105 text-quizler-black-1 font-medium"
          type="button"
          @click="showModal('signIn')"
        >
          登入
        </button>
        <button
          class="bg-quizler-purple px-[2rem] py-[0.8rem] rounded-[0.5rem] text-white transition-all duration-100 ease-linear hover:scale-105"
          type="button"
          @click="showModal('signUp')"
        >
          註冊
        </button>
      </div>

      <div v-else class="flex gap-[3rem] text-[1.8rem]">
        <button
          class="bg-quizler-purple px-[2rem] py-[0.8rem] rounded-[0.5rem] text-white transition-all duration-100 ease-linear hover:scale-105"
          type="button"
          @click="signOut(auth)"
        >
          登出
        </button>
      </div>
    </nav>
  </header>

  <!-- Mobile Nav -->
  <header
    v-if="!props.currentUser"
    :class="`bg-white ${sticky} ${
      showNavbar ? 'translate-y-0' : '-translate-y-[100%]'
    } sm:hidden fixed flex justify-center top-0 left-0 px-[5rem] ss:px-[12rem] py-[2.5rem] w-full h-[100vh]  transition-all duration-500 ease-in-out z-50`"
  >
    <nav v-if="showNavbar" class="flex flex-col gap-[4rem] w-full">
      <div class="flex items-center justify-between">
        <img
          class="w-[10rem] cursor-pointer"
          :src="props.currentUser ? image.logo_white : image.logo_blue"
          alt="Logo"
        />
        <i
          class="fa-solid fa-circle-xmark text-[3rem] hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer"
          @click="showNavbar = false"
        ></i>
      </div>

      <div>
        <p class="text-[2.5rem] font-medium mb-[1.5rem]">選單</p>
        <ul class="flex flex-col gap-[2.5rem] text-[1.8rem]">
          <li
            v-for="(navItem, i) in navItems"
            :key="i"
            :class="`text-quizler-black-1 transition-all duration-100 ease-linear hover:-translate-y-1 font-medium`"
          >
            <a :href="navItem.link" @click="showNavbar = false">{{
              navItem.name
            }}</a>
          </li>
          <li
            class="transition-all duration-100 ease-linear hover:-translate-y-1 cursor-pointer"
          >
            <a
              class="bg-quizler-blue-1 text-white px-[2rem] py-[0.8rem] rounded-[0.5rem]"
              @click="checkIsLogedIn"
              >建立學習集</a
            >
          </li>
        </ul>
      </div>

      <div>
        <p class="text-[2.5rem] font-medium mb-[1.5rem]">使用者</p>
        <div class="flex flex-col gap-[1.5rem] text-[1.8rem]">
          <button
            class="bg-quizler-blue-1 px-[2rem] py-[0.8rem] rounded-[0.5rem] text-white transition-all duration-100 ease-linear hover:-translate-y-1 font-medium"
            type="button"
            @click="showModal('signIn')"
          >
            登入
          </button>
          <button
            class="bg-quizler-purple px-[2rem] py-[0.8rem] rounded-[0.5rem] text-white transition-all duration-100 ease-linear hover:-translate-y-1"
            type="button"
            @click="showModal('signUp')"
          >
            註冊
          </button>
        </div>
      </div>
    </nav>
  </header>

  <header
    v-if="!showNavbar"
    :class="`${
      props.currentUser
        ? 'bg-quizler-blue-2 border-b-[0.5px] border-white/50'
        : 'bg-white'
    } sm:hidden flex items-center justify-between px-[3rem] py-[2rem] ${sticky}`"
  >
    <img
      class="w-[10rem] cursor-pointer"
      :src="props.currentUser ? image.logo_white : image.logo_blue"
      alt="Logo"
    />
    <i
      v-if="!props.currentUser"
      :class="`${
        props.currentUser ? 'text-white' : 'text-black/70'
      } fa-solid fa-bars text-[2.5rem] cursor-pointer hover:scale-110 duration-300 transition-all ease-in-out`"
      @click="showNavbar = true"
    ></i>
    <div v-else class="flex gap-[3rem] text-[1.8rem]">
      <button
        class="bg-quizler-purple px-[2rem] py-[0.8rem] rounded-[0.5rem] text-white transition-all duration-100 ease-linear hover:scale-105"
        type="button"
        @click="signOut(auth)"
      >
        登出
      </button>
    </div>
  </header>
</template>
