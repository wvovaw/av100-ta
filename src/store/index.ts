import Vuex, { createLogger } from "vuex";
import userModule, { UserState } from "./modules/auth";

const debug = import.meta.env.NODE_ENV !== "production";

export interface State {
  user: UserState;
}

export default new Vuex.Store<State>({
  modules: {
    user: userModule,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],

  mutations: {
    LOAD_STORE: (state: State) => {
      if (localStorage.getItem("av100_User_State")) {
        try {
          const lsStateString =
            localStorage.getItem("av100_User_State") || "{}";
          Object.assign(state, JSON.parse(lsStateString));
        } catch (e) {
          console.group();
          console.error("Could not initialize store.");
          console.error(e);
          console.groupEnd();
        }
      }
    },
  },
});
