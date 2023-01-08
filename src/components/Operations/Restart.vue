<script setup lang="ts">
import { IconRefresh } from "@arco-design/web-vue/es/icon";
import { Modal } from "@arco-design/web-vue";
import useWords, { refresh } from "@/utils/useWords";
import useTranslater from "@/utils/useTranslater";
import useInternationalization from "@/utils/useInternationalization";

const { cache, reviewed } = useWords();
const translater = useTranslater();
const i18n = useInternationalization([
  "restart",
  "restart-title",
  "restart-prompt",
  "restart",
  "confirm",
  "cancel",
]);
const handleRestart = () =>
  Modal.warning({
    title: i18n["restart-title"].value,
    content: i18n["restart-prompt"].value,
    titleAlign: "start",
    okText: i18n["confirm"].value,
    okButtonProps: {
      status: "warning",
    },
    cancelText: i18n["cancel"].value,
    hideCancel: false,
    onOk: () => {
      cache.value[translater.value].length = 0;
      reviewed[translater.value].forEach((s) => (s.value = 0));
      setTimeout(refresh);
    },
  });
</script>

<template>
  <a-tooltip :content="i18n['restart'].value" position="right" mini>
    <a-button @click="handleRestart" type="primary" shape="circle">
      <template #icon>
        <icon-refresh />
      </template>
    </a-button>
  </a-tooltip>
</template>
