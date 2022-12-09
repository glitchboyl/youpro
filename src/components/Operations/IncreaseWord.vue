<script setup>
import { reactive, ref } from "vue";
import { IconPlus } from "@arco-design/web-vue/es/icon";
import { Notification } from "@arco-design/web-vue";
import useWords from "@/utils/useWords";
import useSettings from "@/utils/useSettings";
import useTranslater from "@/utils/useTranslater";
import useInternationalization from "@/utils/useInternationalization";
import {
  EnglishRegExp,
  ChineseRegExp,
  chineseRule,
  STATUS,
} from "@/assets/constants";

const { store, cache, words } = useWords();
const { reviewNumber } = useSettings();
const translater = useTranslater();
const i18n = useInternationalization([
  "increase-word",
  "increase-notification",
  "confirm",
  "cancel",
]);

const form = reactive({
  english: "",
  chinese: [],
});
const formRef = ref();
const visible = ref(false);
const chineseInputRef = ref();

const englishRule = {
  validator: (value, cb) =>
    new Promise((resolve) => {
      if (!value) {
        cb("Word can't be empty.");
      }
      if (!EnglishRegExp.test(value)) {
        cb("Word can only be in English.");
      }
      if (words.value.includes(value)) {
        cb("Word already exists.");
      }
      resolve();
    }),
};

const handleSplit = (input, e) => {
  if (input && ChineseRegExp.test(input)) {
    const chs = input.split(ChineseRegExp).filter((e) => e);
    form.chinese = [...new Set(form.chinese.concat(chs))];
    chineseInputRef.value.blur();
    chineseInputRef.value.focus();
  }
};

const handleIncrease = (done) => {
  formRef.value.validate().then((errors) => {
    if (!errors) {
      const { english, chinese } = form;
      store.value[english] = chinese;
      cache.value.forEach((c) => {
        if (c.length < reviewNumber.value) {
          c.push([english, STATUS.DEFAULT]);
        }
      });
      Notification.success(i18n["increase-notification"].value);
    }
    done(!errors);
  });
};
const handleClose = () => {
  formRef.value.resetFields();
  formRef.value.clearValidate();
};
</script>

<template>
  <a-tooltip :content="i18n['increase-word'].value" position="right" mini>
    <a-button @click="visible = true" type="primary" shape="circle">
      <template #icon>
        <icon-plus />
      </template>
    </a-button>
  </a-tooltip>

  <a-modal
    :width="400"
    v-model:visible="visible"
    :title="i18n['increase-word'].value"
    :ok-text="i18n['confirm'].value"
    :cancel-text="i18n['cancel'].value"
    :mask-closable="false"
    @cancel="visible = false"
    @before-ok="handleIncrease"
    @close="handleClose"
  >
    <a-form :model="form" ref="formRef">
      <a-form-item field="english" label="English" :rules="englishRule">
        <a-input v-model="form.english" placeholder="English word" />
      </a-form-item>
      <a-form-item
        field="chinese"
        label="中文"
        :rules="chineseRule"
        v-show="form.english"
      >
        <a-input-tag
          ref="chineseInputRef"
          placeholder="中文意思"
          v-model="form.chinese"
          unique-value
          @input-value-change="handleSplit"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
