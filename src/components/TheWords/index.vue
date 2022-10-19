<script setup>
import { ref, computed, defineAsyncComponent } from "vue";
import useWords from "@/utils/useWords";
import useTranlater from "@/utils/useTranslater";
import useReviewNumber from "@/utils/useReviewNumber";
const WordItem = defineAsyncComponent(() => import("./WordItem.vue"));

const { cache } = useWords();
const translater = useTranlater();
const { reviewNumber } = useReviewNumber();
const CToE = computed(() =>
  Math.min(cache.value[0].length || 0, reviewNumber.value)
);
const EToC = computed(() =>
  Math.min(cache.value[1].length || 0, reviewNumber.value)
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
