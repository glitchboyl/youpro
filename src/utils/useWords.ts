import { ref, computed } from "vue";
import { useLocalStorage } from "vueposu";
import useTranslater, { type Translater } from "./useTranslater";
import useSettings from "./useSettings";
import shuffle from "./shuffle";
import { STATUS, defaultWord, defaultTranslate } from "@/assets/constants";

type WordsStore = { [word: string]: string[] };
type WordCache = [string, Translater];
type WordsCache = [WordCache[], WordCache[]];

const defaultWords: WordsStore = {
  [defaultWord]: defaultTranslate,
};

const store = useLocalStorage("words-store", defaultWords);
const cache = useLocalStorage<WordsCache>("words-cache", [[], []]);
const words = computed(() => Object.keys(store.value || {}));

const translater = useTranslater();
const { reviewNumber } = useSettings();
const now = new Date();
const lastUpdate = useLocalStorage<number>("last-update");
const reviewed = [
  [ref(0), ref(0)],
  [ref(0), ref(0)],
];

function getShuffled(n: number) {
  const currentWords = cache?.value?.[translater.value!].map(([word]) => word);
  const shuffled = shuffle(
    words.value.filter((word) => !currentWords?.includes(word))
  );
  return shuffled.slice(0, n).map((word: string) => [word, STATUS.DEFAULT] as WordCache);
}

if (
  new Date(lastUpdate.value!).toDateString() !== now.toDateString() ||
  !cache?.value?.[0].length ||
  !cache?.value?.[1].length
) {
  lastUpdate.value = now.getTime();
  cache.value = [
    getShuffled(reviewNumber.value),
    getShuffled(reviewNumber.value),
  ];
} else {
  cache.value = cache.value.map((c) =>
    c.filter(([word]) => words.value.includes(word))
  ) as WordsCache;
}

export function refresh() {
  cache?.value?.forEach((currentWords) => {
    if (currentWords.length < reviewNumber.value) {
      currentWords.push(
        ...getShuffled(reviewNumber.value - currentWords.length)
      );
    }
  });
}

export default function useWords() {
  return {
    store,
    cache,
    words,
    reviewed,
  };
}
