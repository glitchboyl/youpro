import { ref } from "vue";
import { useLocalStorage } from "vueposu";

const reviewNumber = useLocalStorage("review-number", 10);
const reviewed = [ref(0), ref(0)];

export default function useReviewNumber() {
  return { reviewNumber, reviewed };
}
