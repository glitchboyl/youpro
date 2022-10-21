<script setup>
import { IconUpload } from "@arco-design/web-vue/es/icon";
import useWords, { refresh } from "@/utils/useWords";
import useInternationalization from "@/utils/useInternationalization";

const { store } = useWords();
const i18n = useInternationalization(["importWords"]);

const reader = new FileReader();
const importWords = ([{ file }]) => {
  reader.readAsText(file, "utf-8");
  reader.onload = function (e) {
    const words = JSON.parse(e.target.result);
    Object.keys(words).forEach(
      (word) =>
        (store.value[word] = !store.value[word]
          ? words[word]
          : [...new Set([...store.value[word], ...words[word]])])
    );
    refresh();
  };
};
</script>

<template>
  <a-tooltip :content="i18n['importWords'].value" position="right" mini>
    <a-upload
      action="/"
      accept=".json"
      :auto-upload="false"
      :show-file-list="false"
      :file-list="[]"
      @change="importWords"
    >
      <template #upload-button>
        <a-button type="primary" shape="circle">
          <template #icon>
            <icon-upload />
          </template>
        </a-button>
      </template>
    </a-upload>
  </a-tooltip>
</template>

<style>
.arco-upload-wrapper {
  width: 32px;
}
</style>
