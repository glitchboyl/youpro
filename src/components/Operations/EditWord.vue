<script setup>
import { reactive, ref, watchEffect } from "vue";
import { IconEdit, IconDelete } from "@arco-design/web-vue/es/icon";
import { Notification } from "@arco-design/web-vue";
import useWords, { refresh } from "@/utils/useWords";
import useReviewNumber from "@/utils/useReviewNumber";
import useTranslater from "@/utils/useTranslater";
import useInternationalization from "@/utils/useInternationalization";
import { EnglishRegExp, STATUS } from "@/assets/constants";

const { store, cache, words } = useWords();
const i18n = useInternationalization([
  "edit-word",
  "edit-notification",
  "delete-word",
  "delete-prompt",
  "delete-notification",
  "confirm",
  "cancel",
]);

const form = reactive({
  english: "",
  chinese: [],
});
const formRef = ref();
const visible = ref(false);
watchEffect(() => {
  form.chinese = form.english ? [...store.value[form.english]] : [];
});

const handleDelete = () => {
  cache.value.forEach((queue) => {
    const index = queue.findIndex(([word]) => word === form.english);
    if (index !== -1) {
      queue.splice(index, 1);
    }
  });
  delete store.value[form.english];
  form.english = "";
  Notification.success(i18n["delete-notification"].value);
  refresh();
};
const handleEdit = (done) => {
  formRef.value.validate().then((errors) => {
    if (!errors) {
      const { english, chinese } = form;
      store.value[english] = chinese;
      Notification.success(i18n["edit-notification"].value);
    }
    done(!errors);
  });
};
const handleClose = () => formRef.value.resetFields();

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
  <a-tooltip :content="i18n['edit-word'].value" position="right" mini>
    <a-button @click="visible = true" type="primary" shape="circle">
      <template #icon>
        <icon-edit />
      </template>
    </a-button>
  </a-tooltip>

  <a-modal
    :width="520"
    v-model:visible="visible"
    :title="i18n['edit-word'].value"
    :ok-text="i18n['confirm'].value"
    :cancel-text="i18n['cancel'].value"
    :mask-closable="false"
    :ok-button-props="{
      status: 'warning',
    }"
    @cancel="visible = false"
    @before-ok="handleEdit"
    @close="handleClose"
  >
    <a-form :model="form" ref="formRef">
      <a-form-item field="english" label="English">
        <a-select
          v-model="form.english"
          placeholder="English word"
          allow-search
        >
          <a-option v-for="word in words" :key="word">{{ word }}</a-option>
        </a-select>
        <a-popconfirm
          :content="i18n['delete-prompt'].value"
          type="error"
          :ok-text="i18n['confirm'].value"
          :cancel-text="i18n['cancel'].value"
          :ok-button-props="{
            status: 'danger',
          }"
          @ok="handleDelete"
        >
          <a-tooltip :content="i18n['delete-word'].value" position="right" mini>
            <a-button
              type="primary"
              status="danger"
              :style="{ marginLeft: '10px' }"
              :disabled="!form.english"
            >
              <template #icon>
                <icon-delete />
              </template>
            </a-button>
          </a-tooltip>
        </a-popconfirm>
      </a-form-item>
      <a-form-item
        v-show="form.english"
        field="chinese"
        label="中文"
        :rules="chineseRule"
      >
        <a-input-tag
          placeholder="中文意思"
          v-model="form.chinese"
          unique-value
          :disabled="!form.english"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
