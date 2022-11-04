<script setup>
import { ref, computed, watchEffect } from "vue";
import useWords from "@/utils/useWords";
import useTranslater from "@/utils/useTranslater";
import useSettings from "@/utils/useSettings";
import useInternationalization from "@/utils/useInternationalization";

const { cache, words } = useWords();
const translater = useTranslater();
const { reviewNumber, reviewed } = useSettings();
const i18n = useInternationalization([
  "current-progress",
  "congratulation",
  "encouragement",
  "attention",
  "trash",
]);

const decimal = ref(0);
const percent = computed(() => Math.ceil(decimal.value * 100));
const total = computed(() => Math.min(reviewNumber.value, words.value.length));
const status = computed(() => {
  if (percent.value >= 75) {
    return ["", "./UDidIt.png", i18n["congratulation"].value];
  } else if (percent.value >= 50) {
    return ["success", "./NotBad.png", i18n["encouragement"].value];
  } else if (percent.value >= 25) {
    return ["warning", "./Oops.png", i18n["attention"].value];
  } else {
    return ["danger", "./Trash.png", i18n["trash"].value];
  }
});
watchEffect(() => {
  decimal.value = total.value
    ? reviewed[translater.value][0].value / total.value
    : total.value;
});
</script>

<template>
  <a-tooltip
    :content="`${i18n['current-progress'].value}${percent}%`"
    position="right"
    mini
  >
    <a-progress size="mini" :status="status[0]" :percent="decimal" animation />
  </a-tooltip>
  <a-tooltip
    v-if="reviewed[translater].reduce((a, b) => a.value + b.value) === total"
    :content="status[2]"
    position="top"
    mini
  >
    <img
      :src="percent >= 100 ? './favicon.ico' : status[1]"
      :style="{
        height: '160px',
        bottom: 0,
        [status[0] === 'success' || status[0] === 'danger'
          ? 'left'
          : 'right']: 0,
        position: 'fixed',
      }"
      alt="Easter egg"
      :title="status[2]"
    />
  </a-tooltip>
</template>
