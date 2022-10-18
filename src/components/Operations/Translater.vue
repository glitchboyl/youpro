<script setup>
import useTranslater from "@/utils/useTranslater";
const translater = useTranslater();
</script>

<template>
  <a-switch
    checked-color="#14C9C9"
    unchecked-color="#165DFF"
    :checked-value="1"
    :unchecked-value="0"
    v-model="translater"
  >
    <template #checked>英译中</template>
    <template #unchecked>中译英</template>
  </a-switch>
</template>
