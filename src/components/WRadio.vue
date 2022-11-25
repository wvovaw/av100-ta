<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { generateUID } from "../composables/generateUID";

const props = defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const isChecked = computed(() => props.modelValue == props.value);
const id = "wradio-" + generateUID(8);
</script>

<template>
  <div class="form-check inline-flex">
    <input
      type="radio"
      :id="id"
      class="form-check-input appearance-none rounded-full h-4 w-4 border border-green-500 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
      :value="value"
      :checked="isChecked"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      v-bind="$attrs"
    />
    <label
      v-if="label"
      class="form-check-label inline-block text-xs cursor-pointer"
      :for="id"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped></style>
