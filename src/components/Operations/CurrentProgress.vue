<script setup>
import { ref, computed, watchEffect } from "vue";
import useWords from "@/utils/useWords";
import useTranslater from "@/utils/useTranslater";
import useReviewNumber from "@/utils/useReviewNumber";
import useInternationalization from "@/utils/useInternationalization";

const { cache, words } = useWords();
const translater = useTranslater();
const { reviewNumber, reviewed } = useReviewNumber();
const i18n = useInternationalization(["current-progress", "congratulation"]);

const decimal = ref(0);
const percent = computed(() => Math.ceil(decimal.value * 100));
const total = computed(() => Math.min(reviewNumber.value, words.value.length));
const status = computed(() => {
  if (percent.value >= 75) {
    return "";
  } else if (percent.value >= 50) {
    return "success";
  } else if (percent.value >= 25) {
    return "warning";
  } else {
    return "danger";
  }
});
watchEffect(() => {
  decimal.value = total.value
    ? reviewed[translater.value].value / total.value
    : total.value;
});
</script>

<template>
  <a-tooltip
    :content="`${i18n['current-progress'].value}${percent}%`"
    position="right"
    mini
  >
    <a-progress size="mini" :status="status" :percent="decimal" animation />
  </a-tooltip>
  <img
    v-if="percent >= 100"
    src="/public/favicon.ico"
    style="bottom: 0; left: 0; position: fixed"
    alt="Easter egg"
    :title="i18n['congratulation'].value"
  />
</template>
