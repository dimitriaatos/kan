import { defineStore } from "pinia";

export const useArrangeByStore = defineStore("arrangeByStore", () => {
  const isOpen = ref<boolean>(false);
  const parent = ref<string | null>(null);
  const child = ref<string | null>(null);

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  return { isOpen, parent, child, toggle };
});
