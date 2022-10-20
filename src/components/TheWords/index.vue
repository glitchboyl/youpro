<script setup>
import { ref, watch, defineAsyncComponent } from "vue";
import useWords from "@/utils/useWords";
import useTranlater from "@/utils/useTranslater";
import useReviewNumber from "@/utils/useReviewNumber";
const WordItem = defineAsyncComponent(() => import("./WordItem.vue"));

const { cache } = useWords();
const translater = useTranlater();
const { reviewNumber } = useReviewNumber();

const CToE = ref(0);
const EToC = ref(0);

const getWords = (type) =>
  Math.min(cache.value[type].length || 0, reviewNumber.value);

watch(
  cache,
  () => {
    CToE.value = getWords(0);
    EToC.value = getWords(1);
  },
  { deep: true, immediate: true }
);
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
