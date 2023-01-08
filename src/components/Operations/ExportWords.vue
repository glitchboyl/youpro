<script setup lang="ts">
import { IconDownload } from "@arco-design/web-vue/es/icon";
import useWords from "@/utils/useWords";
import useInternationalization from "@/utils/useInternationalization";

const { store } = useWords();
const i18n = useInternationalization(["export-words"]);

const exportWords = () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(store.value, null, 2)], {
      type: "application/json",
    })
  );
  a.setAttribute("download", "youpro.json");
  a.click();
};
</script>

<template>
  <a-tooltip :content="i18n['export-words'].value" position="right" mini>
    <a-button type="primary" @click="exportWords" shape="circle">
      <template #icon>
        <icon-download />
      </template>
    </a-button>
  </a-tooltip>
</template>
