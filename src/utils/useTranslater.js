import { useLocalStorage } from "vueposu";

const translater = useLocalStorage("translater", 1);

export default function useTranslater() {
  return translater;
}
