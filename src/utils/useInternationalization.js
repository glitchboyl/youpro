import { computed } from "vue";
import useTranslater from "./useTranslater";
import { i18nMap } from "@/assets/constants";

const translater = useTranslater();

export default function useInternationalization(keywords) {
  const i18n = {};
  keywords.forEach((keyword) => {
    if (i18nMap[keyword]) {
      i18n[keyword] = computed(() => i18nMap[keyword][translater.value]);
    }
  });
  return i18n;
}
