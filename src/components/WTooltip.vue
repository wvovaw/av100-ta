<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <button
    type="button"
    class="cursor-help"
    data-bs-toggle="tooltip"
    data-bs-placement="bottom"
    :title="text"
  >
    <slot />
  </button>
</template>

<style scoped></style>
