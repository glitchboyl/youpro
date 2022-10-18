import { useLocalStorage } from "vueposu";

const reviewNumber = useLocalStorage("review-number", 10);

export default function useReviewNumber() {
  return reviewNumber;
}
