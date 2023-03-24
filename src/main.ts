import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/styles/main.css";
import "@/plugins/extend";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/theme-chalk/src/index.scss";

import * as dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
