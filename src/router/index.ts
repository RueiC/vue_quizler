import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage/LandingPage.vue";
import Library from "../views/Library/Library.vue";
import CreateSet from "../views/Library/CreateSet.vue";
import CardDetails from "../views/Library/CardDetails.vue";
import LearnMode from "../views/Library/LearnMode.vue";
import SpellMode from "../views/Library/SpellMode.vue";

const routes = [
  {
    path: "/",
    name: "landing-page",
    component: LandingPage,
  },
  {
    path: "/library",
    name: "library",
    component: Library,
  },
  {
    path: "/create-set",
    name: "create-set",
    component: CreateSet,
  },
  {
    path: "/flash-card/:id",
    name: "flash-card",
    component: CardDetails,
  },
  {
    path: "/flash-card/:id/learn-mode",
    name: "learn-mode",
    component: LearnMode,
  },
  {
    path: "/flash-card/:id/spell-mode",
    name: "spell-mode",
    component: SpellMode,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
