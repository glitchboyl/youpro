<script setup>
import { defineAsyncComponent } from "vue";

const Translater = defineAsyncComponent(() => import("./Translater.vue"));
const IncreaseWord = defineAsyncComponent(() => import("./IncreaseWord.vue"));
const Settings = defineAsyncComponent(() => import("./Settings.vue"));
const Refresh = defineAsyncComponent(() => import("./Refresh.vue"));
const Github = defineAsyncComponent(() => import("./Github.vue"));
</script>

<template>
  <div class="operations">
    <translater />
    <increase-word />
    <settings />
    <refresh />
    <github />
  </div>
</template>