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
  "accuracy",
  "congratulation",
  "encouragement",
  "attention",
  "trash",
]);

const decimal = ref(0);
const percent = computed(() => Math.ceil(decimal.value * 100));
const total = computed(() => Math.min(reviewNumber.value, words.value.length));
const status = ref("danger");
const easterEgg = ref("./Trash.png");
const tip = ref(i18n["trash"].value);
const direction = ref("right");

watchEffect(() => {
  decimal.value = total.value
    ? reviewed[translater.value][0].value / total.value
    : total.value;
});
watchEffect(() => {
  if (percent.value >= 75) {
    status.value = "success";
    easterEgg.value = percent.value >= 100 ? "./favicon.ico" : "./UDidIt.png";
    tip.value = i18n["congratulation"].value;
    direction.value = "right";
  } else if (percent.value >= 50) {
    status.value = "normal";
    easterEgg.value = "./NotBad.png";
    tip.value = i18n["encouragement"].value;
    direction.value = "left";
  } else if (percent.value >= 25) {
    status.value = "warning";
    easterEgg.value = "./Oops.png";
    tip.value = i18n["attention"].value;
    direction.value = "right";
  } else {
    status.value = "danger";
    easterEgg.value = "./Trash.png";
    tip.value = i18n["trash"].value;
    direction.value = "left";
  }
});
</script>

<template>
  <a-tooltip
    :content="`${i18n['accuracy'].value}${percent}% (${reviewed[translater][0].value}/${total})`"
    position="right"
    mini
  >
    <a-progress size="mini" :status="status" :percent="decimal" animation />
  </a-tooltip>
  <a-tooltip
    v-if="reviewed[translater].reduce((a, b) => a.value + b.value) === total"
    :content="tip"
    position="top"
    mini
  >
    <img
      :src="easterEgg"
      :style="{
        height: '160px',
        bottom: 0,
        [direction]: 0,
        position: 'fixed',
      }"
      alt="Easter egg"
      :title="tip"
    />
  </a-tooltip>
</template>
