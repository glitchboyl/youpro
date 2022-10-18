<script setup>
import { defineAsyncComponent } from "vue";
const TheWords = defineAsyncComponent(() =>
  import("./components/TheWords/index.vue")
);
const Operations = defineAsyncComponent(() =>
  import("./components/Operations/index.vue")
);
</script>

<template>
  <Suspense>
    <the-words />
    <template #fallback>
      <a-skeleton animation class="words-container-skeleton">
        <a-space direction="vertical" :style="{ width: '100%' }" size="large">
          <a-skeleton-line :line-height="240" />
        </a-space>
      </a-skeleton>
    </template>
  </Suspense>
  <operations />
</template>

<style>
.words-container-skeleton {
  top: var(--top-boundary);
  width: var(--words-container-width);
  left: 50%;
  margin-left: calc(0px - var(--words-container-width) / 2);
  position: relative;
}
</style>
