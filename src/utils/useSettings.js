import { ref, computed } from "vue";
import { useLocalStorage } from "vueposu";

const settings = useLocalStorage("settings", [10, 1, 0]);

const computeSetting = (i) => ({
  get: () => settings.value[i],
  set: (v) => (settings.value[i] = v),
});

const reviewNumber = computed(computeSetting(0));
const translationNumber = computed(computeSetting(1));
const randomSingleZH = computed(computeSetting(2));
const reviewed = [
  [ref(0), ref(0)],
  [ref(0), ref(0)],
];

export default function useSettings() {
  return {
    settings,
    reviewNumber,
    translationNumber,
    randomSingleZH,
    reviewed,
  };
}
