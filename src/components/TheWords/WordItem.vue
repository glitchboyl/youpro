<script setup>
import { ref, computed, watch, watchEffect } from "vue";
import { STATUS } from "@/assets/constants";
import {
  IconFaceSmileFill,
  IconFaceFrownFill,
  IconFaceMehFill,
  IconThumbDownFill,
  IconQuestionCircleFill,
  IconEye,
} from "@arco-design/web-vue/es/icon";
import { useThrottleFn } from "vueposu";
import useWords from "@/utils/useWords";
import useSettings from "@/utils/useSettings";
import useInternationalization from "@/utils/useInternationalization";
import shuffle from "@/utils/shuffle";

const props = defineProps(["type", "index"]);
const { type, index } = props;

const { store, cache } = useWords();
const { reviewed, translationNumber, randomSingleZH } = useSettings();

const word = computed(() => cache.value[type][index]);
const english = ref("");
const chinese = ref([]);
const status = ref(word.value[1]);

watchEffect(() => {
  if (word.value) {
    english.value = word.value[0];
    chinese.value = shuffle(store.value[english.value]);
  }
});
watch(
  status,
  (n, o) => {
    if (n === STATUS.CORRECT || o === STATUS.CORRECT) {
      reviewed[type].value++;
    }
  },
  {
    immediate: true,
  }
);

const i18n = useInternationalization(["translate-placeholder", "cheat"]);

let speech = null;
const synth = window.speechSynthesis;
const speak = useThrottleFn(() => {
  if (!speech) {
    speech = new window.SpeechSynthesisUtterance(english.value);
  }
  if (!synth.speaking) {
    synth.speak(speech);
  }
}, 500);

function translate(text) {
  let translation;
  let resultStatus = STATUS.INCORRECT;
  if (type) {
    translation = text.split("；").filter((e) => e);
    let i = 0;
    const minimumTransilations = Math.min(
      chinese.value.length,
      translationNumber.value
    );
    if (
      translation.length &&
      translation.every((ch) => ch && chinese.value.includes(ch) && ++i) &&
      i >= minimumTransilations
    ) {
      resultStatus = STATUS.CORRECT;
    } else if (i > 0 && i < minimumTransilations) {
      resultStatus = STATUS.CLOSER;
    }
  } else {
    translation = text;
    if (translation === english.value) {
      resultStatus = STATUS.CORRECT;
    }
  }
  status.value = cache.value[type][index][1] = resultStatus;
}

function cheat() {
  status.value = cache.value[type][index][1] = STATUS.LOSER;
}
</script>

<template>
  <div class="word-item">
    <span class="status">
      <icon-face-smile-fill
        v-if="status === STATUS.CORRECT"
        style="color: rgb(var(--green-4))"
      />
      <icon-face-frown-fill
        v-else-if="status === STATUS.INCORRECT"
        style="color: rgb(var(--red-4))"
      />
      <icon-face-meh-fill
        v-else-if="status === STATUS.CLOSER"
        style="color: rgb(var(--gold-4))"
      />
      <icon-thumb-down-fill
        v-else-if="status === STATUS.LOSER"
        style="color: rgb(var(--orange-4))"
      />
      <icon-question-circle-fill v-else />
    </span>
    <div class="content">
      <a-typography-title :heading="6" @click="type && speak()">
        {{
          type
            ? english
            : randomSingleZH
            ? chinese[Math.floor(Math.random() * chinese.length)]
            : chinese.join("；")
        }}
      </a-typography-title>
      <template v-if="status === STATUS.CORRECT || status === STATUS.LOSER">
        <span class="translation" @click="!type && speak()">
          {{ type ? chinese.join("；") : english }}
        </span>
      </template>
      <template v-else>
        <a-input
          :placeholder="i18n['translate-placeholder'].value"
          @change="translate"
          :error="status === STATUS.INCORRECT"
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
