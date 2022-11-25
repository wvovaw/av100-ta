<script setup lang="ts"></script>

<template>
  <div class="links text-center mx-5">
    <router-link
      to="/normal"
      class="text-gray-500 transition duration-300 ease-in-out m-4"
      :class="{ 'text-green-500': $route.path == '/normal' }"
      >Нормальный порядок</router-link
    >
    <router-link
      to="/reversed"
      class="text-gray-500 transition duration-300 ease-in-out m-4"
      :class="{ 'text-green-500': $route.path == '/reversed' }"
      >Обратный порядок</router-link
    >
  </div>
  <router-view />
</template>

<style scoped></style>
