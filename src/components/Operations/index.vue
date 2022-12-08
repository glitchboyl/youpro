<script setup>
import { defineAsyncComponent } from "vue";

const Translater = defineAsyncComponent(() => import("./Translater.vue"));
const IncreaseWord = defineAsyncComponent(() => import("./IncreaseWord.vue"));
const EditWord = defineAsyncComponent(() => import("./EditWord.vue"));
const Settings = defineAsyncComponent(() => import("./Settings.vue"));
const Restart = defineAsyncComponent(() => import("./Restart.vue"));
const ExportWords = defineAsyncComponent(() => import("./ExportWords.vue"));
const ImportWords = defineAsyncComponent(() => import("./ImportWords.vue"));
const Accuracy = defineAsyncComponent(() => import("./Accuracy.vue"));
const Github = defineAsyncComponent(() => import("./Github.vue"));
</script>

<template>
  <div class="operations">
    <translater />
    <increase-word />
    <edit-word />
    <settings />
    <restart />
    <export-words />
    <import-words />
    <accuracy />
    <github />
  </div>
</template>

<style>
.button-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-white);
  font-size: 16px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s;
  background-color: rgb(var(--arcoblue-6));
}
.button-trigger.button-trigger-active {
  background-color: var(--color-primary-light-4);
}
.arco-progress-circle-wrapper {
  width: 32px !important;
  height: 32px !important;
}
</style>
