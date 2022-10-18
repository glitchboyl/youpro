import { computed } from "vue";
import useTranslater from "./useTranslater";

const i18nMap = {
  increaseWord: ["增加新单词", "Increase word"],
  settings: ["设置", "Settings"],
  reviewNumber: ["复习数量", "Review number"],
  refresh: ["刷新", "Refresh"],
  confirm: ["确定", "Confirm"],
  cancel: ["取消", "Cancel"],
  translatePlaceholder: ["翻译", "Translate it"],
};
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
