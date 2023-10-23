<template>
  <Transition name="show-alert">
    <div
      class="input-alert-container h-full w-[25vw] ml-[3vw] flex justify-end border-b-2 border-red-500"
    >
      <span class="font-semibold truncate text-red-500">{{ alertMsg }}</span>
    </div>
  </Transition>
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

.show-alert-enter-active {
  animation: show-alert 1.2s linear;
}
.show-alert-leave-active {
  animation: show-alert 1.2s reverse;
}

@keyframes show-alert {
  0% {
    opacity: 0;
    width: 0vw;
    align-self: flex-end;
  }
  100% {
    opacity: 1;
    width: 25vw;
    align-self: flex-end;
  }
}
</style>
