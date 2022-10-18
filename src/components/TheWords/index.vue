<script setup>
import { ref, computed, defineAsyncComponent } from "vue";
import useWords from "@/utils/useWords";
import useTranlater from "@/utils/useTranslater";
const WordItem = defineAsyncComponent(() => import("./WordItem.vue"));

const { cache } = useWords();
const translater = useTranlater();
const CToE = computed(() => cache.value[0].length || 0);
const EToC = computed(() => cache.value[1].length || 0);
</script>

<template>
  <div class="words-container" v-show="translater">
    <template v-for="(,index) of EToC" :key="`EToC-${index}`">
      <word-item :type="1" :index="index" />
    </template>
  </div>
  <div class="words-container" v-show="!translater">
    <template v-for="(,index) of CToE" :key="`CToE-${index}`">
      <word-item :type="0" :index="index" />
    </template>
  </div>
</template>

<style scoped>
.words-container {
  box-sizing: border-box;
  width: var(--words-container-width);
  background-color: var(--color-bg-4);
  left: 50%;
  top: var(--top-boundary);
  min-height: 240px;
  margin-left: calc(0px - var(--words-container-width) / 2);
  padding: 24px;
  position: relative;
}
</style>
