import { createApp } from "vue";
import "./style.css";
import "tw-elements";
import App from "./App.vue";
import store from "./store";
import router from "./router";

createApp(App).use(store).use(router).mount("#app");
