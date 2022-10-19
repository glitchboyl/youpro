<script setup>
import { IconSettings } from "@arco-design/web-vue/es/icon";
import { reactive, ref } from "vue";
import { useLocalStorage } from "vueposu";
import useReviewNumber from "@/utils/useReviewNumber";
import useInternationalization from "@/utils/useInternationalization";

const visible = ref(false);

const i18n = useInternationalization([
  "settings",
  "reviewNumber",
  "confirm",
  "cancel",
]);

const reviewNumber = useReviewNumber();
const form = reactive({
  number: reviewNumber.value,
});
const formRef = ref();

const numberRule = {
  validator: (value, cb) => {
    return new Promise((resolve) => {
      if (value < 1) {
        cb("asd");
      }
      resolve();
    });
  },
};

const handleClick = () => (visible.value = true);
const handleBeforeOk = (done) => {
  formRef.value.validate().then((errors) => {
    if (!errors) {
      const { number } = form;
      reviewNumber.value = number;
    }
    done(!errors);
  });
};
const handleCancel = () => (visible.value = false);
</script>

<template>
  <a-tooltip :content="i18n['settings'].value" position="right" mini>
    <a-button
      @click="handleClick"
      type="primary"
      status="warning"
      shape="circle"
    >
      <template #icon>
        <icon-settings />
      </template>
    </a-button>
  </a-tooltip>

  <a-modal
    :width="320"
    v-model:visible="visible"
    :title="i18n['settings'].value"
    :ok-text="i18n['confirm'].value"
    :cancel-text="i18n['cancel'].value"
    :mask-closable="false"
    @before-ok="handleBeforeOk"
    @cancel="handleCancel"
  >
    <a-form :model="form" ref="formRef" label-align="left">
      <a-form-item
        field="number"
        :label="i18n['reviewNumber'].value"
        label-col-flex="100px"
      >
        <a-input-number v-model="form.number" :min="1" :max="100" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
