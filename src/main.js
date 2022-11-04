import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import App from "./App.vue";

import "@arco-design/web-vue/dist/arco.css";
import "./assets/main.css";

const app = createApp(App);
app.use(ArcoVue);
app.mount("#app");

const darkThemeMq = window.matchMedia("(prefers-color-scheme:dark)");
const callback = (e) => {
  if (e.matches) {
    document.body.setAttribute("arco-theme", "dark");
  } else {
    document.body.removeAttribute("arco-theme");
  }
};
callback(darkThemeMq);
darkThemeMq.addEventListener("change", callback);