<script setup>
import { reactive, ref, watch } from "vue";
import { IconPlus } from "@arco-design/web-vue/es/icon";
import useWords from "@/utils/useWords";
import useReviewNumber from "@/utils/useReviewNumber";
import useTranslater from "@/utils/useTranslater";
import useInternationalization from "@/utils/useInternationalization";
import { EnglishRegExp, STATUS } from "@/assets/constants";

const visible = ref(false);

const i18n = useInternationalization(["increaseWord", "confirm", "cancel"]);

const form = reactive({
  english: "",
  chinese: [],
});
const formRef = ref();

const { store, cache } = useWords();
const reviewNumber = useReviewNumber();
const translater = useTranslater();

const handleClick = () => (visible.value = true);
const handleBeforeOk = (done) => {
  formRef.value.validate().then((errors) => {
    if (!errors) {
      const { english, chinese } = form;
      store.value[english] = chinese;
      if (cache.value[translater.value].length < reviewNumber.value) {
        cache.value[translater.value].push([english, STATUS.DEFAULT]);
      }
    }
    done(!errors);
  });
};
const handleCancel = () => (visible.value = false);
watch(visible, (value) => {
  if (!value) {
    formRef.value.resetFields();
  }
});

const englishRule = {
  validator: (value, cb) => {
    return new Promise((resolve) => {
      if (!value) {
        cb("Word can't be empty.");
      }
      if (!EnglishRegExp.test(value)) {
        cb("Word can only be in English.");
      }
      if (Object.keys(store.value).includes(value)) {
        cb("Word already Exists.");
      }
      resolve();
    });
  },
};
const chineseRule = {
  validator: (value, cb) => {
    return new Promise((resolve) => {
      if (!value.length) {
        cb("中文不能为空。");
      }
      resolve();
    });
  },
};
</script>

<template>
  <a-tooltip :content="i18n['increaseWord'].value" position="right" mini>
    <a-button
      style="margin-top: 12px"
      @click="visible = true"
      type="primary"
      status="success"
      shape="circle"
    >
      <template #icon>
        <icon-plus />
      </template>
    </a-button>
  </a-tooltip>

  <a-modal
    v-model:visible="visible"
    :title="i18n['increaseWord'].value"
    :ok-text="i18n['confirm'].value"
    :cancel-text="i18n['cancel'].value"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form" ref="formRef">
      <a-form-item field="english" label="English" :rules="englishRule">
        <a-input v-model="form.english" placeholder="English word" />
      </a-form-item>
      <a-form-item field="chinese" label="中文" :rules="chineseRule">
        <a-input-tag
          placeholder="中文意思"
          v-model="form.chinese"
          unique-value
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
