<script setup lang="ts">
import ButtonSkeleton from "./ButtonSkeleton.vue";
</script>

<template>
  <div class="operations-container-skeleton">
    <a-skeleton animation class="translater-skeleton">
      <a-space direction="vertical" :style="{ width: '100%' }" size="large">
        <a-skeleton-line :line-height="24" />
      </a-space>
    </a-skeleton>
    <button-skeleton />
    <button-skeleton />
    <button-skeleton />
    <button-skeleton />
    <button-skeleton />
    <button-skeleton />
    <button-skeleton />
    <button-skeleton />
  </div>
</template>

<style>
.translater-skeleton {
  height: 24px;
}
</style>
