import { ActionContext } from "vuex";
import { State } from "../index";
import axios from "axios";

export interface User {
  id: number;
  login: string;
  email: string;
  telegramChat: string;
  clicks: number;
  expire: number;
  autoru: number;
  phone: string;
  sendMethod: number;
  lname: string;
  fname: string;
  timezone: string;
  timezonestring: string;
  notifytype: string;
  notifytypestring: string;
  companyid: number;
  companyname: string;
  calltype: string;
  enableaudio: boolean;
  locklentaupdate: boolean;
  erased: number;
  sipid: string;
  updatePeriod: number;
  filterMaxCount: number;
  turbosip: string;
  turbosip5accessto: string;
  turbosip20accessto: string;
}

export interface UserState {
  token: string;
  id: number;
  user: User;
}

type Context = ActionContext<UserState, State>;

export default {
  namespaced: true,
  state: (): UserState => ({
    id: 0,
    token: "",
    user: {} as User,
  }),
  getters: {
    user: (state: UserState) => state.user,
    token: (state: UserState) => state.token,
  },
  actions: {
    login: async function (
      ctx: Context,
      payload: Record<string, string>
    ): Promise<string> {
      const data = (
        await axios.post(
          "https://api.av100.ru/v3/login/",
          {
            login: payload.login,
            password: payload.password,
            fromuser: 0,
          },
          {
            params: {
              api_key: "8bcfb6e1-4fa8-4fae-872c-a435bbdbe8d9",
            },
            headers: {
              "X-API-KEY": "8bcfb6e1-4fa8-4fae-872c-a435bbdbe8d9",
              "X-DEVICE-OS": "linux",
            },
          }
        )
      ).data;

      ctx.commit("setToken", data.token);
      ctx.commit("setId", data.user.id);
      return ctx.state.token;
    },
    getUserData: async function (ctx: Context) {
      const data = (
        await axios.get(
          "https://api.av100.ru/v3/user/" + String(ctx.state.id),
          {
            params: {
              api_key: "8bcfb6e1-4fa8-4fae-872c-a435bbdbe8d9",
            },
            headers: {
              "X-API-KEY": "8bcfb6e1-4fa8-4fae-872c-a435bbdbe8d9",
              "X-USER-TOKEN": ctx.state.token,
              "X-DEVICE-OS": "linux",
            },
          }
        )
      ).data;

      ctx.commit("setUser", data);
      return ctx.state.token;
    },
    updateUserData: async function (
      ctx: Context,
      payload: Record<string, string>
    ) {
      await axios.put(
        "https://api.av100.ru/v3/user/" + String(ctx.state.id),
        payload,
        {
          params: {
            api_key: "8bcfb6e1-4fa8-4fae-872c-a435bbdbe8d9",
          },
          headers: {
            "X-API-KEY": "8bcfb6e1-4fa8-4fae-872c-a435bbdbe8d9",
            "X-USER-TOKEN": ctx.state.token,
            "X-DEVICE-OS": "linux",
          },
        }
      );
    },
  },
  mutations: {
    setToken: function (state: UserState, token: string): void {
      state.token = token;
    },
    setId: function (state: UserState, id: number): void {
      state.id = id;
    },
    setUser: function (state: UserState, user: User): void {
      state.user = user;
    },
  },
};
