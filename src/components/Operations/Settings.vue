<script setup>
import { reactive, ref, computed } from "vue";
import { IconSettings } from "@arco-design/web-vue/es/icon";
import { Notification } from "@arco-design/web-vue";
import { useLocalStorage } from "vueposu";
import useWords, { refresh } from "@/utils/useWords";
import useSettings from "@/utils/useSettings";
import useTranslater from "@/utils/useTranslater";
import useInternationalization from "@/utils/useInternationalization";

const visible = ref(false);
const translater = useTranslater();
const i18n = useInternationalization([
  "settings",
  "store-number",
  "review-number",
  "translation-number",
  "random-single-zh",
  "listening-mode",
  "review-number-validator",
  "setting-notification",
  "confirm",
  "cancel",
]);

const { store } = useWords();
const storeNumber = computed(() => Object.keys(store.value).length);
const { reviewNumber, translationNumber, randomSingleZH, listeningMode } =
  useSettings();
const form = reactive({
  reviewNumber: reviewNumber.value,
  translationNumber: translationNumber.value,
  randomSingleZH: randomSingleZH.value,
  listeningMode: listeningMode.value,
});
const formRef = ref();

const reviewNumberRule = {
  validator: (value, cb) => {
    return new Promise((resolve) => {
      if (value < 1) {
        cb(i18n["review-number-validator"].value);
      }
      resolve();
    });
  },
};

const handleSetting = (done) => {
  formRef.value.validate().then((errors) => {
    if (!errors) {
      reviewNumber.value = form.reviewNumber;
      translationNumber.value = form.translationNumber;
      randomSingleZH.value = form.randomSingleZH;
      listeningMode.value = form.listeningMode;
      refresh();
      Notification.success(i18n["setting-notification"].value);
    }
    done(!errors);
  });
};
</script>

<template>
  <a-tooltip :content="i18n['settings'].value" position="right" mini>
    <a-button @click="visible = true" type="primary" shape="circle">
      <template #icon>
        <icon-settings />
      </template>
    </a-button>
  </a-tooltip>

  <a-modal
    :width="400"
    v-model:visible="visible"
    :title="i18n['settings'].value"
    :ok-text="i18n['confirm'].value"
    :cancel-text="i18n['cancel'].value"
    :mask-closable="false"
    @before-ok="handleSetting"
    @cancel="visible = false"
  >
    <a-form :model="form" ref="formRef" label-align="left">
      <a-form-item :label="i18n['store-number'].value" label-col-flex="180px">
        {{ storeNumber }}
      </a-form-item>
      <a-form-item
        field="reviewNumber"
        :label="i18n['review-number'].value"
        :rules="reviewNumberRule"
        label-col-flex="180px"
      >
        <a-input-number v-model="form.reviewNumber" :min="1" :max="300" />
      </a-form-item>
      <a-form-item
        field="translationNumber"
        :label="i18n['translation-number'].value"
        label-col-flex="180px"
        v-show="translater"
      >
        <a-input-number v-model="form.translationNumber" :min="1" :max="300" />
      </a-form-item>
      <a-form-item
        field="randomSingleZH"
        :label="i18n['random-single-zh'].value"
        label-col-flex="180px"
        v-show="!translater"
      >
        <a-switch
          :checked-value="1"
          :unchecked-value="0"
          v-model="form.randomSingleZH"
        />
      </a-form-item>
      <a-form-item
        field="listeningMode"
        :label="i18n['listening-mode'].value"
        label-col-flex="180px"
      >
        <a-switch
          :checked-value="1"
          :unchecked-value="0"
          v-model="form.listeningMode"
        />
        <!-- <template #extra> will be hard! </template> -->
      </a-form-item>
    </a-form>
  </a-modal>
</template>
