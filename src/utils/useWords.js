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
const now = new Date();
const lastUpdate = useLocalStorage("last-update");

export function getShuffled(n) {
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
  const { reviewNumber } = useReviewNumber();
  lastUpdate.value = now.getTime();
  cache.value = [
    getShuffled(reviewNumber.value),
    getShuffled(reviewNumber.value),
  ];
}

export default function useWords() {
  return {
    store,
    cache,
  };
}
