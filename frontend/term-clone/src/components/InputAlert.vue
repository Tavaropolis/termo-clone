<template>
  <div
    class="input-alert-container h-full w-[25vw] ml-[3vw] flex justify-end border-b-2 border-red-500"
  >
    <span class="font-semibold text-red-500">{{ alertMsg }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  alertMsg: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
</style>
