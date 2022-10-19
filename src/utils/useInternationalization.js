import { computed } from "vue";
import useTranslater from "./useTranslater";
import { localeMap } from "@/assets/constants";

const translater = useTranslater();

export default function useInternationalization(keywords) {
  const i18n = {};
  keywords.forEach((keyword) => {
    if (localeMap[keyword]) {
      i18n[keyword] = computed(() => localeMap[keyword][translater.value]);
    }
  });
  return i18n;
}
