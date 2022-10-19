<script setup>
import { ref, computed, watch } from "vue";
import { STATUS } from "@/assets/constants";
import {
  IconCheckCircleFill,
  IconCloseCircleFill,
  IconThumbDownFill,
  IconQuestionCircleFill,
  IconEye,
} from "@arco-design/web-vue/es/icon";
import { useThrottleFn } from "vueposu";
import useWords from "@/utils/useWords";
import useReviewNumber from "@/utils/useReviewNumber";
import useInternationalization from "@/utils/useInternationalization";

const props = defineProps(["type", "index"]);
const { type, index } = props;

const { store, cache } = useWords();
const { reviewed } = useReviewNumber();

const word = computed(() => cache.value[type][index]);
const english = word.value[0];
const chinese = store.value[word.value[0]];
const status = ref(word.value[1]);

const i18n = useInternationalization(["translatePlaceholder", "cheat"]);

let speech = null;
const synth = window.speechSynthesis;
const speak = useThrottleFn(() => {
  if (!speech) {
    speech = new window.SpeechSynthesisUtterance(english);
  }
  if (!synth.speaking) {
    synth.speak(speech);
  }
}, 500);

function translate(text) {
  status.value = cache.value[type][index][1] = type
    ? text
        .split("；")
        .filter((e) => e)
        .every((ch) => chinese.includes(ch))
      ? STATUS.TRUE
      : STATUS.FALSE
    : text === english
    ? STATUS.TRUE
    : STATUS.FALSE;
}
watch(
  status,
  (n, o) => {
    if (n === STATUS.TRUE || o === STATUS.TRUE) {
      reviewed[type].value++;
    }
  },
  {
    immediate: true,
  }
);
function cheat() {
  status.value = cache.value[type][index][1] = STATUS.LOSER;
}
</script>

<template>
  <div class="word-item">
    <span class="status">
      <icon-check-circle-fill
        v-if="status === STATUS.TRUE"
        style="color: rgb(var(--green-4))"
      />
      <icon-close-circle-fill
        v-else-if="status === STATUS.FALSE"
        style="color: rgb(var(--red-4))"
      />
      <icon-thumb-down-fill
        v-else-if="status === STATUS.LOSER"
        style="color: rgb(var(--orange-4))"
      />
      <icon-question-circle-fill v-else />
    </span>
    <div class="content">
      <a-typography-title :heading="6" @click="type && speak()">
        {{ type ? english : chinese.join("；") }}
      </a-typography-title>
      <template v-if="status === STATUS.TRUE || status === STATUS.LOSER">
        <span class="translation" @click="!type && speak()">
          {{ type ? chinese.join("；") : english }}
        </span>
      </template>
      <template v-else>
        <a-input
          :placeholder="i18n['translatePlaceholder'].value"
          @change="translate"
          :error="status === STATUS.FALSE"
        >
          <template #append>
            <a-tooltip :content="i18n['cheat'].value" position="top" mini>
              <a-button type="primary" status="warning" @click="cheat">
                <template #icon>
                  <icon-eye />
                </template>
              </a-button>
            </a-tooltip>
          </template>
        </a-input>
      </template>
    </div>
  </div>
  <a-divider class="half-divider" />
</template>

<style>
.word-item {
  display: flex;
  justify-content: center;
}
.word-item .status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  margin-top: 12px;
  color: var(--color-text-4);
  font-size: 40px;
  border-radius: 50%;
}
.word-item .content {
  flex: 1;
  color: var(--color-text-2);
  font-size: 12px;
  line-height: 20px;
}
.word-item .translation {
  line-height: 32px;
}
.word-item .arco-input-append {
  padding: 0;
  border: 0;
}
.half-divider {
  --half-divider-left: 55px;
  left: var(--half-divider-left);
  width: calc(100% - var(--half-divider-left)) !important;
  min-width: auto !important;
  margin: 16px 0 !important;
}
</style>
