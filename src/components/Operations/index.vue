<script setup>
import { defineAsyncComponent } from "vue";
import asyncButton from "./asyncButton";

const Translater = defineAsyncComponent(() => import("./Translater.vue"));
const IncreaseWord = asyncButton(() => import("./IncreaseWord.vue"));
const Settings = asyncButton(() => import("./Settings.vue"));
const Refresh = asyncButton(() => import("./Refresh.vue"));
const Github = asyncButton(() => import("./Github.vue"));
</script>

<template>
  <div class="operations">
    <Suspense>
      <translater />
      <template #fallback>
        <a-skeleton animation class="translater-skeleton">
          <a-space direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-line :line-height="24" />
          </a-space>
        </a-skeleton>
      </template>
    </Suspense>
    <increase-word />
    <settings />
    <refresh />
    <github />
  </div>
</template>

<style>
.operations {
  top: var(--top-boundary);
  left: calc(50% + var(--words-container-width) / 2);
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
}

.operations .translater-skeleton {
  width: 70px;
  border-radius: 12px;
  overflow: hidden;
}

.operations > * {
  font-size: 16px!important;
  margin-top: 12px;
}
</style>
