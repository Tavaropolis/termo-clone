<template>
  <Teleport to="#new-account">
      <Transition name="modal-slide">
      <div v-show="openModal" ref="modal" class="basic-modal flex flex-col items-center rounded">
        <Icon
          @click="$emit('closeModal')"
          icon="mdi:close"
          class="self-end m-2 password-icon icon-account"
        />
        <span class="h-full w-full flex items-center justify-center"
          >Usuário criado com sucesso! 😊</span
        >
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { onClickOutside } from '@vueuse/core'

const modal = ref(null)

const props = defineProps({
  openModal: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['closeModal'])

onClickOutside(modal, () => emit('closeModal'))
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
.basic-modal {
  position: fixed;
  z-index: 1;
  background-color: #40a723;
  width: 40vw;
  height: 25vh;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: opacity 1.5s, transform 1s ease-in-out;
}

.modal-slide-enter-from, 
.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>
