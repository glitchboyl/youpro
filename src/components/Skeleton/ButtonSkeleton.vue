<template>
  <a-skeleton animation class="button-skeleton">
    <a-space direction="vertical" :style="{ width: '100%' }" size="large">
      <a-skeleton-shape shape="circle" />
    </a-space>
  </a-skeleton>
</template>

<style>
.button-skeleton,
.button-skeleton .arco-skeleton-shape {
  width: 32px;
  height: 32px;
}
</style>
