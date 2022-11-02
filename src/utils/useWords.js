import { computed } from "vue";
import { useLocalStorage } from "vueposu";
import useTranslater from "./useTranslater";
import useSettings from "./useSettings";
import shuffle from './shuffle';
import { STATUS, defaultWord, defaultTranslate } from "@/assets/constants";

const defaultWords = {
  [defaultWord]: defaultTranslate,
};

const store = useLocalStorage("words-store", defaultWords);
const cache = useLocalStorage("words-cache", [[], []]);
const words = computed(() => Object.keys(store.value));

const translater = useTranslater();
const { reviewNumber } = useSettings();
const now = new Date();
const lastUpdate = useLocalStorage("last-update");

function getShuffled(n) {
  const currentWords = cache.value[translater.value].map(([word]) => word);
  const shuffled = shuffle(words.value.filter((word) => !currentWords.includes(word)));
  return shuffled.slice(0, n).map((word) => [word, STATUS.DEFAULT]);
}

if (
  new Date(lastUpdate.value).toDateString() !== now.toDateString() ||
  !cache.value[0].length ||
  !cache.value[1].length
) {
  lastUpdate.value = now.getTime();
  cache.value = [
    getShuffled(reviewNumber.value),
    getShuffled(reviewNumber.value),
  ];
} else {
  cache.value = cache.value.map((c) =>
    c.filter(([word]) => words.value.includes(word))
  );
}

export function refresh() {
  const currentWords = cache.value[translater.value];
  if (currentWords.length < reviewNumber.value) {
    currentWords.push(...getShuffled(reviewNumber.value - currentWords.length));
  }
}

export default function useWords() {
  return {
    store,
    cache,
    words,
  };
}
