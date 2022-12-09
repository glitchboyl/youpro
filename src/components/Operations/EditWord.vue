<script setup>
import { ref, reactive, watchEffect } from "vue";
import { IconEdit, IconDelete } from "@arco-design/web-vue/es/icon";
import { Notification } from "@arco-design/web-vue";
import useWords, { refresh } from "@/utils/useWords";
import useTranslater from "@/utils/useTranslater";
import useInternationalization from "@/utils/useInternationalization";
import { ChineseRegExp, chineseRule, STATUS } from "@/assets/constants";

const { store, cache, words, reviewed } = useWords();
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
const chineseInputRef = ref();

watchEffect(() => {
  form.chinese = form.english ? [...store.value[form.english]] : [];
});

const handleDelete = () => {
  cache.value.forEach((list, i) => {
    const index = list.findIndex(([word]) => word === form.english);
    if (index !== -1) {
      const s =
        list[index][1] === STATUS.CORRECT
          ? 0
          : list[index][1] === STATUS.LOSER
          ? 1
          : 2;
      if (s < 2) {
        reviewed[i][s].value--;
      }
      list.splice(index, 1);
    }
  });
  delete store.value[form.english];
  handleClose();
  Notification.success(i18n["delete-notification"].value);
};
const handleSplit = (input, e) => {
  if (input && ChineseRegExp.test(input)) {
    const chs = input.split(ChineseRegExp).filter((e) => e);
    form.chinese = [...new Set(form.chinese.concat(chs))];
    chineseInputRef.value.blur();
    chineseInputRef.value.focus();
  }
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
const handleClose = () => {
  formRef.value.resetFields();
  formRef.value.clearValidate();
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
          ref="chineseInputRef"
          placeholder="中文意思"
          v-model="form.chinese"
          unique-value
          :disabled="!form.english"
          @input-value-change="handleSplit"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
