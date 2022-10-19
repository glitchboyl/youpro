<script setup>
import { IconRefresh } from "@arco-design/web-vue/es/icon";
import { reactive, ref } from "vue";
import useWords, { getShuffled } from "@/utils/useWords";
import useTranslater from "@/utils/useTranslater";
import useReviewNumber from "@/utils/useReviewNumber";
import useInternationalization from "@/utils/useInternationalization";

const { cache } = useWords();
const translater = useTranslater();
const { reviewNumber } = useReviewNumber();
const i18n = useInternationalization(["refresh", "confirm", "cancel"]);

const refresh = () => {
  const currentWords = cache.value[translater.value];
  if (currentWords.length < reviewNumber.value) {
    currentWords.push(...getShuffled(reviewNumber.value - currentWords.length));
  }
};
</script>

<template>
  <a-tooltip :content="i18n['refresh'].value" position="right" mini>
    <a-button @click="refresh" type="primary" shape="circle">
      <template #icon>
        <icon-refresh />
      </template>
    </a-button>
  </a-tooltip>
</template>
