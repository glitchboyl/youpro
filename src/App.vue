<script setup>
import { defineAsyncComponent } from "vue";
import WordsSkeleton from "./components/Skeleton/WordsSkeleton.vue";
import OperationSkeleton from "./components/Skeleton/OperationSkeleton.vue";
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
      <words-skeleton />
    </template>
  </Suspense>
  <Suspense>
    <operations />
    <template #fallback>
      <operation-skeleton />
    </template>
  </Suspense>
</template>
