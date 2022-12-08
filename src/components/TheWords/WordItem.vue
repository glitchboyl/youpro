<script setup>
import { ref, computed, watch, toRef, watchEffect } from "vue";
import { STATUS } from "@/assets/constants";
import {
  IconFaceSmileFill,
  IconFaceFrownFill,
  IconFaceMehFill,
  IconThumbDownFill,
  IconQuestionCircleFill,
  IconSoundFill,
  IconEye,
} from "@arco-design/web-vue/es/icon";
import { useThrottleFn } from "vueposu";
import useWords from "@/utils/useWords";
import useSettings from "@/utils/useSettings";
import useInternationalization from "@/utils/useInternationalization";
import shuffle from "@/utils/shuffle";
import { ChineseRegExp } from "@/assets/constants";

const props = defineProps(["type", "index"]);
const { type } = props;
const index = toRef(props, "index");

const { store, cache, reviewed } = useWords();
const { translationNumber, randomSingleZH, listeningMode } = useSettings();

const word = computed(() => cache.value[type][index.value]);
const english = ref("");
const chinese = ref([]);
const status = ref(word.value[1]);
const randomZH = computed(
  () => chinese.value[Math.floor(Math.random() * chinese.value.length)]
);

watchEffect(() => {
  if (word.value) {
    english.value = word.value[0];
    chinese.value = shuffle(store.value[english.value]);
  }
});
watch(
  status,
  (n, o) => {
    const s =
      n === STATUS.CORRECT || o === STATUS.CORRECT
        ? 0
        : n === STATUS.LOSER || o === STATUS.LOSER
        ? 1
        : 2;
    if (s < 2) {
      reviewed[type][s].value++;
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

function setStatus(s) {
  return (status.value = cache.value[type][index.value][1] = s);
}

function translate(text) {
  let translation;
  let resultStatus = STATUS.INCORRECT;
  if (type) {
    translation = [...new Set(text.split(ChineseRegExp).filter((e) => e))];
    let validate = true;
    let n = 0;
    const minimumTransilations = Math.min(
      chinese.value.length,
      translationNumber.value
    );
    for (const ch of translation) {
      if (!ch) {
        continue;
      }
      if (chinese.value.includes(ch)) {
        n++;
      } else if (validate) {
        validate = false;
      }
    }
    if (validate && n >= minimumTransilations) {
      resultStatus = STATUS.CORRECT;
    } else if (n > 0) {
      resultStatus = STATUS.CLOSER;
    }
  } else {
    translation = text;
    if (translation === english.value) {
      resultStatus = STATUS.CORRECT;
    }
  }
  setStatus(resultStatus);
}

function cheat() {
  setStatus(STATUS.LOSER);
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
      <a-typography-title :heading="6">
        <button
          class="listen-button"
          v-show="
            listeningMode &&
            status !== STATUS.CORRECT &&
            status !== STATUS.LOSER
          "
          @click="speak"
        >
          <icon-sound-fill />
        </button>
        <span
          v-show="
            !listeningMode ||
            status === STATUS.CORRECT ||
            status === STATUS.LOSER
          "
          :class="[type && 'speech']"
          style="display: inline-block"
          @click="type && speak()"
        >
          {{ type ? english : randomSingleZH ? randomZH : chinese.join("；") }}
        </span>
      </a-typography-title>
      <template v-if="status === STATUS.CORRECT || status === STATUS.LOSER">
        <span
          :class="[!type && 'speech']"
          @click="!type && speak()"
          style="line-height: 32px; display: inline-block"
        >
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
  font-size: 13px;
  line-height: 20px;
}
.word-item .arco-input-append {
  padding: 0;
  border: 0;
}
.word-item .listen-button {
  height: 24px;
  padding: 0;
  font-size: 22px;
  color: var(--color-text-1);
  background-color: transparent;
  border: 0;
  display: flex;
  align-items: center;
  transform: color 0.3s;
  cursor: pointer;
}
.word-item .listen-button:hover {
  color: var(--color-text-2);
}
.word-item .speech {
  cursor: url("./horn.cur"), help;
  transform: color 0.3s;
}
.word-item .speech:hover {
  color: var(--color-text-1);
}
.word-item .listen-button + .speech:hover {
  color: var(--color-text-2);
}
.half-divider {
  --half-divider-left: 55px;
  left: var(--half-divider-left);
  width: calc(100% - var(--half-divider-left)) !important;
  min-width: auto !important;
  margin: 16px 0 !important;
}
</style>
