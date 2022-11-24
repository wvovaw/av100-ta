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
  options: {
    type: Array<String>,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
const id = "wselect-" + generateUID(8);
</script>

<template>
  <div class="field flex flex-col sm:flex-row text-sm">
    <label v-if="label" class="form-label sm:w-96 mr-2" :for="id">{{
      label
    }}</label>
    <select
      class="form-select appearance-none block max-h-9 sm:w-96 px-2 py-2 text-sm text-gray-500 bg-clip-padding bg-white bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-green-500 focus:outline-none focus:ring-0"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
      v-bind="$attrs"
    >
      <option v-for="item of options" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
