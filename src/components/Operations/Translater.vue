<script setup>
import { watch } from "vue";
import useTranslater from "@/utils/useTranslater";
const translater = useTranslater();
watch(translater, () =>
  scrollTo({
    top: 0,
  })
);
</script>

<template>
  <a-switch
    checked-color="#165DFF"
    unchecked-color="#165DFF"
    :checked-value="1"
    :unchecked-value="0"
    v-model="translater"
  >
    <template #checked>英译中</template>
    <template #unchecked>中译英</template>
  </a-switch>
</template>
