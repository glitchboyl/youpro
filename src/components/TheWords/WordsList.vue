<script setup>
import { ref, toRef, watch, defineAsyncComponent } from "vue";
import useWords from "@/utils/useWords";
import useReviewNumber from "@/utils/useReviewNumber";
import useInternationalization from "@/utils/useInternationalization";
const WordItem = defineAsyncComponent(() => import("./WordItem.vue"));

const props = defineProps(["type"]);
const { type } = props;

const { cache } = useWords();
const { reviewNumber } = useReviewNumber();
const i18n = useInternationalization(["empty-text"]);

const quantity = ref(0);
watch(
  cache,
  () => {
    quantity.value = Math.min(
      cache.value[type].length || 0,
      reviewNumber.value
    );
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div class="words-container">
    <template v-if="quantity">
      <template v-for="(,index) of quantity" :key="`${type}-${index}`">
        <word-item :type="type" :index="index" />
      </template>
    </template>
    <a-empty v-else style="padding: 24px 0">
      {{ i18n["empty-text"].value }}
    </a-empty>
  </div>
</template>
