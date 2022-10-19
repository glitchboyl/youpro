<script setup>
import { ref, computed, defineAsyncComponent } from "vue";
import useWords from "@/utils/useWords";
import useTranlater from "@/utils/useTranslater";
import useReviewNumber from "@/utils/useReviewNumber";
const WordItem = defineAsyncComponent(() => import("./WordItem.vue"));

const { store, cache } = useWords();
const translater = useTranlater();
const { reviewNumber } = useReviewNumber();
const words = Object.keys(store.value);
const getWords = (type) => () =>
  Math.min(
    cache.value[type]?.filter(([word]) => words.includes(word)).length || 0,
    reviewNumber.value
  );
const CToE = computed(getWords(0));
const EToC = computed(getWords(1));
</script>

<template>
  <div class="words-container" v-show="!translater">
    <template v-for="(,index) of CToE" :key="`CToE-${index}`">
      <word-item :type="0" :index="index" />
    </template>
  </div>
  <div class="words-container" v-show="translater">
    <template v-for="(,index) of EToC" :key="`EToC-${index}`">
      <word-item :type="1" :index="index" />
    </template>
  </div>
</template>
