<script setup lang="ts">
import { generateUID } from "../composables/generateUID";
const props = defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
const id = "winput-" + generateUID(8);
</script>

<template>
  <div class="field flex flex-col lg:flex-row text-sm">
    <label
      v-if="label"
      class="form-label text-sm mr-2 font-semibold lg:font-normal lg:text-base lg:w-96"
      :for="id"
      >{{ label }}</label
    >
    <input
      type="text"
      :id="id"
      class="form-control block max-h-9 px-2 py-2 text-sm border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-green-500 focus:outline-none focus:ring-0"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      v-bind="$attrs"
    />
  </div>
</template>

<style scoped></style>
