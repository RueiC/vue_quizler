<script setup lang="ts">
import Hero from "./Hero.vue";
import Effect from "./Effect.vue";
import Testimonials from "./Testimonials.vue";
import Motivation from "./Motivation.vue";
import Plan from "./Plans.vue";
import Ready from "./Ready.vue";
import Footer from "./Footer.vue";
import { RegistrationForm } from "../../components/index";
</script>

<template>
  <main class="flex flex-col bg-white">
    <Hero />
    <Effect />
    <Testimonials />
    <Motivation />
    <Plan />
    <Ready />
    <Footer />
  </main>
  <RegistrationForm />
</template>
