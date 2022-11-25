import { createApp } from "vue";
import "./style.css";
import "tw-elements";
import App from "./App.vue";
import store from "./store";

store.subscribe((mutation, state) => {
  if (![""].includes(mutation.type)) {
    localStorage.setItem("av100", JSON.stringify(state));
  }
});

createApp(App).use(store).mount("#app");
