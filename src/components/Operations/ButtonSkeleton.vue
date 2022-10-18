<template>
  <a-skeleton animation class="button-skeleton">
    <a-space direction="vertical" :style="{ width: '100%' }" size="large">
      <a-skeleton-shape shape="circle" />
    </a-space>
  </a-skeleton>
</template>

<style>
.button-skeleton {
	margin-top: 12px;
  transform: scale(0.667) translateX(-12px);
}
</style>
