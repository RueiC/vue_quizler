<script setup lang="ts">
import { defineProps, ref, reactive, watch } from "vue";
import type { Ref } from "vue";

interface Props {
  answer: number;
  i: number;
  nextQuestion: () => void;
  option: {
    word: string;
    definition: string;
  };
  score: {
    correct: number;
    wrong: number;
  };
}

const props = defineProps<Props>();
const emit = defineEmits(["setScore"]);

const score = reactive({
  correct: props.score.correct,
  wrong: props.score.wrong,
});

watch(score, (newScore) => {
  emit("setScore", newScore);
});

const optionColor: Ref<string> = ref(
  "bg-quizler-blue-3 hover:bg-white text-white hover:text-black"
);

const checkAnswer = (choseAnswer: number) => {
  if (props.i === choseAnswer) {
    optionColor.value = "bg-green-300";
    score.correct += 1;
  } else {
    optionColor.value = "bg-red-400";
    score.wrong += 1;
  }

  setTimeout(() => {
    optionColor.value =
      "bg-quizler-blue-3 hover:bg-white text-white hover:text-black";

    props.nextQuestion();
  }, 2000);
};
</script>

<template>
  <div
    :class="`${optionColor} flex items-center w-full gap-[2.5rem] rounded-[1rem] text-white text-[1.8rem] border-[0.5px] border-white px-[3rem] py-[2rem] border:opacity-10 cursor-pointer transition-all duration-100 ease-linear`"
    @click="checkAnswer(props.answer)"
  >
    <span>{{ props.i + 1 }}</span>
    <p>{{ props.option.word }}</p>
  </div>
</template>
