<script setup lang="ts">
import { PlanCard } from "../../components/index";
</script>

<template>
  <section
    class="flex flex-col px-[5rem] pt-[40rem] gap-[5rem] h-full"
    id="plans"
    data-aos="fade-up"
  >
    <h2
      class="text-quizler-purple text-center text-[4rem] font-bold mb-[5rem] transition-all duration-100 ease-linear hover:-translate-y-[5px]"
    >
      進階方案，讓你學習效率再進一步
    </h2>

    <div
      class="flex items-center justify-center flex-col md:flex-row gap-[10rem] h-full"
    >
      <PlanCard
        :title="'Free'"
        :color="'bg-white text-black/60'"
        :buttonColor="'bg-black/60 text-white'"
        :plansNum="3"
        :price="0"
      />
      <PlanCard
        :title="'Lite'"
        :color="'bg-quizler-blue-1/80 text-white/90'"
        :buttonColor="'bg-white/90 text-quizler-blue-1/80'"
        :plansNum="5"
        :price="249"
      />
      <PlanCard
        :title="'Premium'"
        :color="'bg-quizler-purple/80 text-white/90'"
        :buttonColor="'bg-white/90 text-quizler-purple/80'"
        :plansNum="6"
        :price="520"
      />
    </div>
  </section>
</template>
