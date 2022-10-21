<script setup>
import { defineAsyncComponent } from "vue";
import useTranlater from "@/utils/useTranslater";
const WordsList = defineAsyncComponent(() => import("./WordsList.vue"));

const translater = useTranlater();
</script>

<template>
  <words-list v-show="!translater" :type="0" />
  <words-list v-show="translater" :type="1" />
</template>
