import { ref, computed } from "vue";

export const generateUID = (length: number) =>
  Array(length)
    .fill("")
    .map((v) => Math.random().toString(36).charAt(2))
    .join("");
