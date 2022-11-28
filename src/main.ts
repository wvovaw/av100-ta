import { createApp } from "vue";
import "./style.css";
import "tw-elements";
import App from "./App.vue";
import store from "./store";
import router from "./router";

store.subscribe((mutation, state) => {
  if (!["LOAD_STORE"].includes(mutation.type)) {
    localStorage.setItem("av100_User_State", JSON.stringify(state));
  }
});

createApp(App).use(store).use(router).mount("#app");
