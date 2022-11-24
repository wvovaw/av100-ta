<script setup lang="ts"></script>

<template>
  <div class="form__section md:flex md:flex-row md:gap-5">
    <div class="form__section-heading md:w-64">
      <h2 class="text-base md:text-lg font-semibold">
        <slot name="heading"></slot>
      </h2>
    </div>
    <div
      class="form__section-content sm:max-w-sm md:max-w-md lg:max-w-xl flex flex-col gap-3 lg:gap-5 py-3"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
