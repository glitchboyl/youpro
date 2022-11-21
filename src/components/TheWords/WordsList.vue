<script setup>
import { ref, toRef, watch, defineAsyncComponent } from "vue";
import useWords from "@/utils/useWords";
import useSettings from "@/utils/useSettings";
import useInternationalization from "@/utils/useInternationalization";
const WordItem = defineAsyncComponent(() => import("./WordItem.vue"));

const props = defineProps(["type"]);
const { type } = props;

const { cache } = useWords();
const { reviewNumber } = useSettings();
const i18n = useInternationalization(["empty-text"]);

const quantity = ref(0);
watch(
  [() => cache.value[type].length, reviewNumber],
  () => {
    quantity.value = Math.min(
      cache.value[type].length || 0,
      reviewNumber.value
    );
  },
  { immediate: true }
);
</script>

<template>
  <div class="words-container">
    <template v-if="quantity">
      <template v-for="(,index) of quantity" :key="`${type}-${cache[type][index][0]}`">
        <word-item :type="type" :index="index" />
      </template>
    </template>
    <a-empty v-else style="padding: 24px 0">
      {{ i18n["empty-text"].value }}
    </a-empty>
  </div>
</template>
