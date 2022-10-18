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
      <a-skeleton animation>
        <a-space direction="vertical" :style="{ width: '100%' }" size="large">
          <a-skeleton-shape />
        </a-space>
      </a-skeleton>
    </template>
  </Suspense>
  <!-- <a-skeleton animation>
    <a-space direction="vertical" :style="{ width: '100%' }" size="large">
      <a-skeleton-shape />
    </a-space>
  </a-skeleton> -->
  <operations />
</template>
