import { computed, type ComputedRef } from "vue";
import useTranslater from "./useTranslater";
import { i18nMap } from "@/assets/constants";

type Keyword = keyof typeof i18nMap;

const translater = useTranslater();

export default function useInternationalization(keywords: Keyword[]) {
  const i18n: { [K in Keyword]?: ComputedRef<string> } = {};
  keywords.forEach((keyword) => {
    if (i18nMap[keyword]) {
      i18n[keyword] = computed(() => i18nMap[keyword][translater.value!]);
    }
  });
  return i18n;
}
