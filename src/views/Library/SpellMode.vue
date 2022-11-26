<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import type { Ref } from "vue";
import type { User } from "@firebase/auth";
import type { Commit } from "vuex";
import type { FlashCard } from "../../../types";
import { useRoute, useRouter } from "vue-router";
// @ts-ignore
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { useStore } from "vuex";

import {
  auth,
  db,
  getDoc,
  doc,
  onAuthStateChanged,
} from "../../includes/firebase";

interface Score {
  correct: number;
  wrong: number;
}

const router = useRouter();
const route = useRoute();
const contents: Ref<FlashCard[]> = ref([]);
const answer: Ref<string> = ref("");
const index: Ref<number> = ref(0);
const optionColor: Ref<string> = ref("border-white text-white");
const isCorrect: Ref<string> = ref("你的答案");
const score: Score = reactive({ correct: 0, wrong: 0 });
const cardId: string = route.params.id as string;
const { commit, getters }: { commit: Commit; getters: any } = useStore();

onBeforeMount(() => commit("SHOW_SPINNER"));

onAuthStateChanged(auth, (user: User | null): void => {
  if (!user) return;
  getFlashcardContent();
});

const getFlashcardContent = async (): Promise<void> => {
  const docRef = doc(db, "library", cardId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    commit("HIDE_SPINNER");
    const { flashcards } = docSnap.data();
    contents.value = flashcards;
  }
};

const checkAnswer = (contents: FlashCard[], i: number): void => {
  if (i >= contents.length - 1) {
    setTimeout(() => {
      contents.length = 0;
      index.value = 0;
      answer.value = "";
      score.correct = 0;
      score.wrong = 0;

      router.push({ name: "flash-card", params: { cardId } });
    }, 5000);
  }

  if (answer.value === contents[i].word) {
    optionColor.value = "border-green-300 text-green-300";
    isCorrect.value = "答對了！";
    score.correct += 1;
  } else {
    optionColor.value = "border-red-400 text-red-400";
    isCorrect.value = "加油！很接近了";
    score.wrong += 1;
  }

  setTimeout(() => {
    index.value += 1;
    answer.value = "";
    optionColor.value = "border-white text-white";
    isCorrect.value = "你的答案";
  }, 2000);
};
</script>

<template>
  <div
    v-if="getters.isShowSpinnder"
    class="flex items-center justify-center w-screen h-screen"
  >
    <clip-loader
      class="flex items-center justify-center w-screen h-screen bg-quizler-blue-2"
      :size="'100px'"
    />
  </div>

  <section
    v-else
    class="flex items-center justify-center bg-quizler-blue-2 w-full h-[100vh]"
  >
    <div
      class="w-full px-[3rem] sm:px-0 sm:w-[70%] h-[50%] flex items-center justify-center"
    >
      <div
        v-if="index < contents.length"
        class="flex flex-col items-center justify-between bg-quizler-blue-3 w-full h-full rounded-[1rem] px-[5rem] sm:px-[12rem] py-[10rem]"
        data-aos="fade-up"
      >
        <p
          v-if="contents.length > 0"
          class="text-white text-[3rem] font-medium"
        >
          {{ contents[index].definition }}
        </p>

        <div class="w-full">
          <p class="text-white text-[2.2rem] font-medium mb-[5rem]">
            {{ isCorrect }}
          </p>

          <form @submit.prevent="checkAnswer(contents, index)">
            <input
              :class="`${optionColor} w-full rounded-[0.3rem] appearance-none bg-transparent py-[1rem] leading-tight focus:outline-none border-b-[0.3px] placeholder:text-white placeholder:opacity-70 text-[2rem]`"
              type="text"
              placeholder="你的答案"
              v-model="answer"
            />
          </form>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center gap-[3rem] bg-quizler-blue-3 w-full h-full rounded-[1rem] px-[12rem] py-[10rem]"
        data-aos="fade-up"
      >
        <p class="text-white text-[5rem] font-bold">結束測驗</p>
        <div class="flex items-center">
          <template v-if="score.wrong === 0">
            <p class="text-[2rem] font-bold text-emerald-300">
              恭喜答對所有題目！
            </p>
          </template>
          <template v-else>
            <p class="text-[2rem] font-bold text-emerald-300">
              共答對{{ score.correct }}題
            </p>

            <span class="text-white text-[2rem]">、</span>
            <p class="text-[2rem] font-bold text-red-400">
              答錯{{ score.wrong }}題
            </p>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
