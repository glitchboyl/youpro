<script setup>
import { IconExport } from "@arco-design/web-vue/es/icon";
import useWords from "@/utils/useWords";
import useInternationalization from "@/utils/useInternationalization";

const { store } = useWords();
const i18n = useInternationalization(["exportWords"]);

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
  <a-tooltip :content="i18n['exportWords'].value" position="right" mini>
    <a-button
		type="primary" @click="exportWords" shape="circle">
      <template #icon>
        <icon-export />
      </template>
    </a-button>
  </a-tooltip>
</template>
