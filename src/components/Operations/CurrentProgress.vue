<script setup>
import { ref, computed, watchEffect } from "vue";
import useWords from "@/utils/useWords";
import useTranslater from "@/utils/useTranslater";
import useReviewNumber from "@/utils/useReviewNumber";
import useInternationalization from "@/utils/useInternationalization";

const { cache } = useWords();
const translater = useTranslater();
const { reviewNumber, reviewed } = useReviewNumber();
const i18n = useInternationalization(["currentProgress"]);

const decimal = ref(0);
const percent = computed(() => Math.ceil(decimal.value * 100));
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
  decimal.value = reviewed[translater.value].value / reviewNumber.value;
});
</script>

<template>
  <a-tooltip
    :content="`${i18n['currentProgress'].value}${percent}%`"
    position="right"
    mini
  >
    <a-progress size="mini" :status="status" :percent="decimal" animation />
  </a-tooltip>
</template>
