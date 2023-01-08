import { useLocalStorage } from "vueposu";

export type Translater = 0 | 1;

const translater = useLocalStorage<Translater>("translater", 1);

export default function useTranslater() {
  return translater;
}