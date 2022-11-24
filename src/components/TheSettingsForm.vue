<script setup lang="ts">
import { ref, watchEffect } from "vue";
import FormSection from "./FormSection.vue";
import WSwitch from "./WSwitch.vue";
import WInput from "./WInput.vue";
import WSelect from "./WSelect.vue";
import WCheckbox from "./WCheckbox.vue";
import WRadio from "./WRadio.vue";
import WTooltip from "./WTooltip.vue";

const SIPSwitch = ref<Boolean>(false);
const companyInput = ref<String>("");
const phoneInput = ref<String>("");
const loginInput = ref<String>("");
const firstnameInput = ref<String>("");
const lastnameInput = ref<String>("");
const timezoneSelect = ref<String>("Москва");
const autoupdateCheck = ref<Boolean>(false);
const notificationRadio = ref<String>("off");
const telegramShowInput = ref<Boolean>(false);
const emailShowInput = ref<Boolean>(false);
const telegramInput = ref<String>("12345678");
const emailInput = ref<String>("foo@bar.bas");
</script>

<template>
  <div class="form">
    <div class="form__heading">
      <h1 class="p-5 text-3xl font-semibold">Настройки</h1>
    </div>
    <div class="form__body m-5">
      <FormSection>
        <template #heading>
          <label class="" for="SIPToggle">Звонок через SIP</label>
          <WSwitch :value="SIPSwitch" />
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
            :value="companyInput"
            @update:model-value="(newVal : string) => { companyInput = newVal }"
            label="Компания"
          />
          <WInput
            :value="loginInput"
            @update:model-value="(newVal : string) => loginInput = newVal"
            label="Логин"
          />
          <WInput
            :value="phoneInput"
            @update:model-value="(newVal : string) => phoneInput = newVal"
            label="Номер телефона"
          />
          <WInput
            :value="firstnameInput"
            @update:model-value="(newVal : string) => firstnameInput = newVal"
            label="Имя"
          />
          <WInput
            :value="lastnameInput"
            @update:model-value="(newVal : string) => lastnameInput = newVal"
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
                <WRadio value="off" label="Выкл" v-model="notificationRadio" />
              </li>
              <li
                class="py-2 w-full border-b border-gray-200 inline-flex justify-between"
              >
                <WRadio
                  value="email"
                  label="E-mail"
                  v-model="notificationRadio"
                />
                <span class="flex items-center">
                  <p v-if="!emailShowInput" class="text-sm">
                    {{ emailInput }}
                  </p>
                  <WInput
                    v-else
                    :value="emailInput"
                    @update:model-value="(newVal : string) => { emailInput = newVal }"
                  />
                  <button
                    v-if="!emailShowInput"
                    class="ml-5"
                    @click="emailShowInput = true"
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
                  value="telegram"
                  label="Telegram ID"
                  v-model="notificationRadio"
                />
                <span class="flex items-center">
                  <p v-if="!telegramShowInput" class="text-sm">
                    {{ telegramInput }}
                  </p>
                  <WInput
                    v-else
                    :value="telegramInput"
                    @update:model-value="(newVal : string) => { telegramInput = newVal }"
                  />
                  <button
                    v-if="!telegramShowInput"
                    class="ml-5"
                    @click="telegramShowInput = true"
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
            :value="timezoneSelect"
            @update:model-value="(newVal : string) => timezoneSelect = newVal"
            :options="[
              'Калининград',
              'Москва',
              'Самара',
              'Екатеринбург',
              'Омск',
              'Красноярск',
              'Иркутск',
              'Якутск',
              'Владивосток',
              'Магадан',
              'Камчатка',
            ]"
          />
          <div class="flex flex-row sm:justify-between">
            <WCheckbox
              label="Автоматически переходить к новым объявлениям"
              :value="autoupdateCheck"
              @update:model-value="(newVal : boolean) => autoupdateCheck = newVal"
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
          >
            Сохранить
          </button>
        </template>
      </FormSection>
    </div>
  </div>
</template>

<style scoped></style>
