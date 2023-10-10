import { ref } from 'vue';
import { defineStore } from 'pinia';

export const authUser = defineStore('authUser', () => {
    const token = ref<string>();
  
    return { token };
  })