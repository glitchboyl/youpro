import { useLocalStorage } from "vueposu";
import useTranslater from "./useTranslater";
import useReviewNumber from "./useReviewNumber";
import { STATUS, defaultWord, defaultTranslate } from "@/assets/constants";

const defaultWords = {
  [defaultWord]: defaultTranslate,
};

const store = useLocalStorage("words-store", defaultWords);
const cache = useLocalStorage("words-cache", [[], []]);
const translater = useTranslater();
const { reviewNumber } = useReviewNumber();
const now = new Date();
const lastUpdate = useLocalStorage("last-update");

function getShuffled(n) {
  const currentWords = cache.value[translater.value].map(([word]) => word);
  return Object.keys(store.value)
    .filter((word) => !currentWords.includes(word))
    .sort(() => (Math.random() > 0.5 ? -1 : 1))
    .slice(0, n)
    .map((word) => [word, STATUS.DEFAULT]);
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
  const words = Object.keys(store.value);
  cache.value = cache.value.map(c => c.filter(([word]) => words.includes(word)));
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
  };
}
