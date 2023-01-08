import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import App from "./App.vue";
import { darkThemeMq, darkModeListener } from "./utils/darkMode";

import "@arco-design/web-vue/dist/arco.css";
import "./assets/main.css";

const app = createApp(App);
app.use(ArcoVue);
app.mount("#app");

darkModeListener(darkThemeMq);
darkThemeMq.addEventListener("change", darkModeListener);
