<script setup lang="ts">
import { generateUID } from "../composables/generateUID";

const props = defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

const id = "wswitch-" + generateUID(8);
</script>

<template>
  <div class="form-switch p-0 inline">
    <input
      class="form-check-input appearance-none w-9 ml-3 rounded-full h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
      type="checkbox"
      role="switch"
      :id="id"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      v-bind="$attrs"
    />
    <label
      v-if="label"
      class="form-switch-label inline-block text-xs w-64 cursor-pointer"
      :for="id"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
.form-check-input:checked {
  @apply bg-green-500;
}
</style>
