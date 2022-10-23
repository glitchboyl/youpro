import { computed } from "vue";
import { useLocalStorage } from "vueposu";
import useTranslater from "./useTranslater";
import useReviewNumber from "./useReviewNumber";
import { STATUS, defaultWord, defaultTranslate } from "@/assets/constants";

const defaultWords = {
  [defaultWord]: defaultTranslate,
};

const store = useLocalStorage("words-store", defaultWords);
const cache = useLocalStorage("words-cache", [[], []]);
const words = computed(() => Object.keys(store.value));
const translater = useTranslater();
const { reviewNumber } = useReviewNumber();
const now = new Date();
const lastUpdate = useLocalStorage("last-update");

function getShuffled(n) {
  const currentWords = cache.value[translater.value].map(([word]) => word);
  const shuffled = words.value.filter((word) => !currentWords.includes(word));
  const lastIndex = shuffled.length - 1;
  for (let i = 0; i < lastIndex; i++) {
    const random = Math.floor(Math.random() * (lastIndex - i + 1)) + i;
    let temp = shuffled[random];
    shuffled[random] = shuffled[i];
    shuffled[i] = temp;
  }
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
