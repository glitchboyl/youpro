<script setup>
import { defineAsyncComponent } from "vue";
import ButtonSkeleton from './ButtonSkeleton.vue';

const Translater = defineAsyncComponent(() => import("./Translater.vue"));
const IncreaseWord = defineAsyncComponent({
  loader: () => import("./IncreaseWord.vue"),
  loadingComponent: ButtonSkeleton
});
const Settings = defineAsyncComponent({
  loader: () => import("./Settings.vue"),
  loadingComponent: ButtonSkeleton
});
const Refresh = defineAsyncComponent({
  loader: () => import("./Refresh.vue"),
  loadingComponent: ButtonSkeleton
});
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

.operations .translater-skeleton {
  width: 70px;
  border-radius: 12px;
  overflow: hidden;
}
</style>
