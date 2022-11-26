<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import type { Ref } from "vue";
import type { Commit } from "vuex";
import type { User } from "@firebase/auth";
import type { FlashCard } from "../../../types";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

import { QuizCard } from "../../components/index";
import {
  auth,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
} from "../../includes/firebase";

interface Score {
  correct: number;
  wrong: number;
}

const contents: Ref<FlashCard[]> = ref([]);
const options: FlashCard[] = reactive([]);
const index: Ref<number> = ref(0);
const answer: Ref<number | null> = ref(null);
const score: Score = reactive({ correct: 0, wrong: 0 });
const router = useRouter();
const route = useRoute();
const cardId: string = route.params.id as string;
const { commit, getters }: { commit: Commit; getters: any } = useStore();

onBeforeMount(() => commit("SHOW_SPINNER"));

onAuthStateChanged(auth, (user: User | null): void => {
  if (!user) return;
  getFlashcardContent();
});

const setScore = (newScore: Score) => {
  score.correct = newScore.correct;
  score.wrong = newScore.wrong;
};

const getFlashcardContent = async (): Promise<void> => {
  const docRef = doc(db, "library", cardId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    commit("HIDE_SPINNER");
    const { flashcards } = docSnap.data();
    contents.value = flashcards;
  }

  createAnswer();
};

const createAnswer = (): void => {
  if (!contents.value || contents.value?.length === 0) return;

  const question = contents.value[index.value];
  const arr: FlashCard[] = [];

  const optionLength = contents.value.length > 4 ? 4 : contents.value.length;

  for (let step = 0; step < optionLength; step++) {
    const randomItem: FlashCard =
      contents.value[Math.floor(Math.random() * contents.value.length)];

    if (!arr.includes(randomItem)) {
      arr.push(randomItem);
    } else {
      step = step - 1;
    }
  }

  if (arr.includes(question)) {
    answer.value = arr.indexOf(question);
    options.push(...arr);
  } else {
    answer.value = Math.floor(Math.random() * contents.value.length);

    arr[answer.value] = question;
    options.push(...arr);
  }
};

const nextQuestion = (): void => {
  index.value += 1;

  if (index.value < contents.value.length) {
    options.length = 0;
    answer.value = null;

    createAnswer();
  } else {
    setTimeout((): void => {
      contents.value.length = 0;
      options.length = 0;
      index.value = 0;
      answer.value = null;
      score.correct = 0;
      score.wrong = 0;

      router.push({ name: "flash-card", params: { cardId } });
    }, 2000);
  }
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
          v-if="contents?.length > 0"
          class="text-white text-[3rem] font-medium"
        >
          {{ contents[index].definition }}
        </p>

        <div class="w-full">
          <p class="text-white text-[2.2rem] font-medium mb-[5rem]">
            選擇正確的詞語
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[3rem]">
            <div v-for="(option, i) in options" :key="i">
              <QuizCard
                :answer="answer as number"
                :option="option"
                :i="i"
                :nextQuestion="nextQuestion"
                :score="score"
                @setScore="setScore"
              />
            </div>
          </div>
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
