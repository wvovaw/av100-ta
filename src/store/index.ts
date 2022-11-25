import Vuex from "vuex";
import userModule, { UserState } from "./modules/auth";

export interface State {
  user: UserState;
}

export default new Vuex.Store<State>({
  modules: {
    user: userModule,
  },
});
