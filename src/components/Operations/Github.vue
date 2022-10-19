<script setup>
import { IconGithub } from "@arco-design/web-vue/es/icon";
import useInternationalization from "@/utils/useInternationalization";

const i18n = useInternationalization(["github"]);
</script>

<template>
  <a-tooltip :content="i18n['github'].value" position="right" mini>
    <a-button
			style="background-color: #333333; color: #FFFFFF;"
      shape="circle"
      html-type="a"
      href="https://github.com/glitchboyl/youpro"
      target="_blank"
    >
      <template #icon>
        <icon-github />
      </template>
    </a-button>
  </a-tooltip>
</template>
