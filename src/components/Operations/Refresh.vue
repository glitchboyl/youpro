<script setup>
import { IconRefresh } from "@arco-design/web-vue/es/icon";
import { reactive, ref } from "vue";
import { refresh } from "@/utils/useWords";
import useInternationalization from "@/utils/useInternationalization";

const i18n = useInternationalization(["refresh", "confirm", "cancel"]);

const emit = defineEmits(["change", "delete"]);
</script>

<template>
  <a-tooltip :content="i18n['refresh'].value" position="right" mini>
    <a-button @click="refresh" type="primary" shape="circle">
      <template #icon>
        <icon-refresh />
      </template>
    </a-button>
  </a-tooltip>
</template>
