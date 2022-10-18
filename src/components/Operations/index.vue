<script setup>
import { defineAsyncComponent } from "vue";
const Translater = defineAsyncComponent(() => import("./Translater.vue"));
const IncreaseWord = defineAsyncComponent(() => import("./IncreaseWord.vue"));
const Settings = defineAsyncComponent(() => import("./Settings.vue"));
const Refresh = defineAsyncComponent(() => import("./Refresh.vue"));
</script>

<template>
  <div class="operations">
    <translater />
    <increase-word />
    <settings />
    <refresh />
  </div>
</template>

<style scoped>
.operations {
  top: var(--top-boundary);
  left: calc(50% + var(--words-container-width) / 2);
  margin-top: 12px;
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
}
</style>
