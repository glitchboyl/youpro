import { defineAsyncComponent } from "vue";
import ButtonSkeleton from "./ButtonSkeleton.vue";

export default function asyncButton(loader) {
  return defineAsyncComponent({
    loader,
    loadingComponent: ButtonSkeleton,
  });
}
