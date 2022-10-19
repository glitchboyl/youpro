<script setup>
import { ref, defineAsyncComponent } from "vue";
import { IconMenu, IconClose } from "@arco-design/web-vue/es/icon";

const Translater = defineAsyncComponent(() => import("./Translater.vue"));
const IncreaseWord = defineAsyncComponent(() => import("./IncreaseWord.vue"));
const Settings = defineAsyncComponent(() => import("./Settings.vue"));
const Refresh = defineAsyncComponent(() => import("./Refresh.vue"));
const Progress = defineAsyncComponent(() => import("./Progress.vue"))
const Github = defineAsyncComponent(() => import("./Github.vue"));

const popupVisible2 = ref(true);
</script>

<template>
  <div class="operations">
    <translater />
    <increase-word />
    <settings />
    <refresh />
    <Progress />
    <github />
    <!-- <a-trigger
      :trigger="['click', 'hover']"
      clickToClose
      position="right"
      v-model:popupVisible="popupVisible2"
    >
      <div
        :class="`button-trigger ${
          popupVisible2 ? 'button-trigger-active' : ''
        }`"
      >
        <icon-close v-if="popupVisible2" />
        <icon-menu v-else />
      </div>
      <template #content>
        <a-menu
          mode="popButton"
          :tooltipProps="{ position: 'right' }"
          level-indent
        >
          <a-menu-item key="1">
            <template #icon><IconBug></IconBug></template>
            Bugs
          </a-menu-item>
          <a-menu-item key="2">
            <template #icon><IconBulb></IconBulb></template>
            Ideas
          </a-menu-item>
        </a-menu>
      </template>
    </a-trigger> -->
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
