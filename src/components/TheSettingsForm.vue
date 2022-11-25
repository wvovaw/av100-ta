<script setup lang="ts">
import { useStore } from "vuex";
import { User } from "../store/modules/auth";
import { ref } from "vue";

import FormSection from "./FormSection.vue";
import WSwitch from "./WSwitch.vue";
import WInput from "./WInput.vue";
import WSelect from "./WSelect.vue";
import WCheckbox from "./WCheckbox.vue";
import WRadio from "./WRadio.vue";
import WTooltip from "./WTooltip.vue";

const store = useStore();

const loginInput = ref<String>("");
const passwordInput = ref<String>("");

const timezones = [
  "Калининград",
  "Москва",
  "Самара",
  "Екатеринбург",
  "Омск",
  "Красноярск",
  "Иркутск",
  "Якутск",
  "Владивосток",
  "Магадан",
  "Камчатка",
];

const SIPSwitch = ref<Boolean>(false);
const companyFormInput = ref<String>("");
const phoneFormInput = ref<String>("");
const loginFormInput = ref<String>("");
const firstnameFormInput = ref<String>("");
const lastnameFormInput = ref<String>("");
const timezoneFormSelect = ref<String>("Москва");
const autoupdateFormCheck = ref<Boolean>(false);
const notificationFormRadio = ref<number>(-1);
const telegramShowFormInput = ref<Boolean>(false);
const emailShowFormInput = ref<Boolean>(false);
const telegramFormInput = ref<String>("");
const emailFormInput = ref<String>("");

const userData = ref<User>();

const login = async () => {
  await store.dispatch("user/login", {
    // login: "79146072045",
    // password: "6876631166",
    login: loginInput.value,
    password: passwordInput.value,
  });
  getUserData();
};

const getUserData = async () => {
  await store.dispatch("user/getUserData");
  const user = store.getters["user/user"];
  userData.value = user;

  SIPSwitch.value = user.calltype == "1" ? true : false;
  companyFormInput.value = user.companyname;
  loginFormInput.value = user.login;
  phoneFormInput.value = user.phone;
  firstnameFormInput.value = user.fname;
  lastnameFormInput.value = user.lname;
  emailFormInput.value = user.email;
  telegramFormInput.value = user.telegramChat;
  notificationFormRadio.value = user.sendMethod;
  timezoneFormSelect.value = timezones[Number(user.timezone) + 1];
  autoupdateFormCheck.value = !user.locklentaupdate;
};

const updateUserData = async () => {
  // Отправляется только email. при желании можно и другие данные модифицировать
  await store.dispatch("user/updateUserData", { email: emailFormInput.value });
  getUserData();
};
</script>

<template>
  <div v-if="userData !== undefined">
    Loged in!
    <button
      type="button"
      class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
      @click="getUserData"
    >
      fetch data
    </button>
  </div>
  <div v-else class="px-5 py-5 flex flex-col gap-2 sm:flex-row">
    <label class="label">Логин</label>
    <WInput
      :value="loginInput"
      @update:model-value="(newVal : string) => { loginInput = newVal }"
    />
    <label class="label">Пароль</label>
    <WInput
      :value="passwordInput"
      @update:model-value="(newVal : string) => passwordInput = newVal"
    />
    <button
      type="button"
      class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
      @click="login"
    >
      Войти
    </button>
  </div>
  <div class="form">
    <div class="form__heading">
      <h1 class="p-5 text-3xl font-semibold">Настройки</h1>
    </div>
    <div class="form__body m-5">
      <FormSection>
        <template #heading>
          <label class="" for="SIPToggle">Звонок через SIP</label>
          <WSwitch
            :value="SIPSwitch"
            @update:value="(newVal : boolean) => SIPSwitch = newVal"
          />
        </template>
        <template #content>
          <p class="text-gray-500 font-light">
            Включите эту функцию чтобы Авито и другие площадки не блокировали
            ваш аккаунт. Будет выглядеть так, будто звонки совершаются с разных
            номеров.
          </p>
        </template>
      </FormSection>

      <FormSection>
        <template #heading>Учётная запись</template>
        <template #content>
          <WInput
            :value="companyFormInput"
            @update:model-value="(newVal : string) => { companyFormInput = newVal }"
            label="Компания"
          />
          <WInput
            :value="loginFormInput"
            @update:model-value="(newVal : string) => loginFormInput = newVal"
            label="Логин"
          />
          <WInput
            :value="phoneFormInput"
            @update:model-value="(newVal : string) => phoneFormInput = newVal"
            label="Номер телефона"
          />
          <WInput
            :value="firstnameFormInput"
            @update:model-value="(newVal : string) => firstnameFormInput = newVal"
            label="Имя"
          />
          <WInput
            :value="lastnameFormInput"
            @update:model-value="(newVal : string) => lastnameFormInput = newVal"
            label="Фамилия"
          />
        </template>
      </FormSection>
      <FormSection>
        <template #heading>Оповещения о новых подборках</template>
        <template #content>
          <p class="text-gray-500 font-light">
            Выберите, куда будут приходить уведомления при появлении
            автомобилей, которые подходят под критерии вашей подборки.
          </p>
          <h3 class="text-base font-semibold">Уведомления</h3>
          <div class="flex">
            <ul class="border-gray-200 w-full sm:w-max">
              <li class="py-2 border-b border-gray-200 rounded-t-lg">
                <WRadio
                  value="-1"
                  label="Выкл"
                  v-model="notificationFormRadio"
                />
              </li>
              <li
                class="py-2 w-full border-b border-gray-200 inline-flex justify-between"
              >
                <WRadio
                  value="2"
                  label="E-mail"
                  v-model="notificationFormRadio"
                />
                <span class="flex items-center">
                  <p v-if="!emailShowFormInput" class="text-sm">
                    {{ emailFormInput }}
                  </p>
                  <WInput
                    v-else
                    :value="emailFormInput"
                    @update:model-value="(newVal : string) => { emailFormInput = newVal }"
                  />
                  <button
                    v-if="!emailShowFormInput"
                    class="ml-5"
                    @click="emailShowFormInput = true"
                  >
                    <!-- pencil icon -->
                    <svg width="20" height="20" viewBox="0 0 256 256">
                      <path
                        class="text-green-500"
                        fill="currentColor"
                        d="M226.7 88a14.1 14.1 0 0 0-4.1-9.9l-44.7-44.7a14.1 14.1 0 0 0-19.8 0l-120 120a13.7 13.7 0 0 0-3.1 4.8h-.1a14.3 14.3 0 0 0-.9 5V208a14 14 0 0 0 14 14h168a6 6 0 0 0 0-12H110.5L222.6 97.9a14.1 14.1 0 0 0 4.1-9.9ZM76.5 188l87.5-87.5l19.5 19.5L96 207.5Zm-8.5-8.5L48.5 160L136 72.5L155.5 92ZM46 208v-33.5L81.5 210H48a2 2 0 0 1-2-2ZM214.1 89.4L192 111.5L144.5 64l22.1-22.1a1.9 1.9 0 0 1 2.8 0l44.7 44.7a1.9 1.9 0 0 1 0 2.8Z"
                      />
                    </svg>
                  </button>
                </span>
              </li>
              <li
                class="py-2 w-full border-gray-200 inline-flex justify-between"
              >
                <WRadio
                  value="1"
                  label="Telegram ID"
                  v-model="notificationFormRadio"
                />
                <span class="flex items-center">
                  <p v-if="!telegramShowFormInput" class="text-sm">
                    {{ telegramFormInput }}
                  </p>
                  <WInput
                    v-else
                    :value="telegramFormInput"
                    @update:model-value="(newVal : string) => { telegramFormInput = newVal }"
                  />
                  <button
                    v-if="!telegramShowFormInput"
                    class="ml-5"
                    @click="telegramShowFormInput = true"
                  >
                    <!-- pencil icon -->
                    <svg width="20" height="20" viewBox="0 0 256 256">
                      <path
                        class="text-green-500"
                        fill="currentColor"
                        d="M226.7 88a14.1 14.1 0 0 0-4.1-9.9l-44.7-44.7a14.1 14.1 0 0 0-19.8 0l-120 120a13.7 13.7 0 0 0-3.1 4.8h-.1a14.3 14.3 0 0 0-.9 5V208a14 14 0 0 0 14 14h168a6 6 0 0 0 0-12H110.5L222.6 97.9a14.1 14.1 0 0 0 4.1-9.9ZM76.5 188l87.5-87.5l19.5 19.5L96 207.5Zm-8.5-8.5L48.5 160L136 72.5L155.5 92ZM46 208v-33.5L81.5 210H48a2 2 0 0 1-2-2ZM214.1 89.4L192 111.5L144.5 64l22.1-22.1a1.9 1.9 0 0 1 2.8 0l44.7 44.7a1.9 1.9 0 0 1 0 2.8Z"
                      />
                    </svg>
                  </button>
                </span>
              </li>
            </ul>
          </div>
        </template>
      </FormSection>
      <FormSection>
        <template #heading>Прочие настройки</template>
        <template #content>
          <WSelect
            class=""
            label="Часовой пояс"
            :value="timezoneFormSelect"
            @update:model-value="(newVal : string) => timezoneFormSelect = newVal"
            :options="timezones"
          />
          <div class="flex flex-row sm:justify-between">
            <WCheckbox
              label="Автоматически переходить к новым объявлениям"
              :value="autoupdateFormCheck"
              @update:value="(newVal : boolean) => autoupdateFormCheck = newVal"
            />
            <WTooltip
              text="Лента будет автоматически обновляться 1 раз в 3 секунды"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  class="text-gray-400"
                  fill="currentColor"
                  d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-4.025q0-.425-.287-.7Q12.425 11 12 11t-.712.287Q11 11.575 11 12v4.025q0 .425.288.7q.287.275.712.275Zm0-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"
                />
              </svg>
            </WTooltip>
          </div>
        </template>
      </FormSection>
      <FormSection>
        <template #content>
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
            @click="updateUserData"
          >
            Сохранить
          </button>
        </template>
      </FormSection>
    </div>
  </div>
</template>

<style scoped></style>
