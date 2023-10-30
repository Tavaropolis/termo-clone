<template>
  <Teleport :to=teleport>
      <Transition name="modal-slide">
      <div v-show="openModal" id="main-modal" ref="modal" class="basic-modal flex flex-col items-center rounded">
        <Icon
          @click="$emit('closeModal')"
          icon="mdi:close"
          class="self-end m-2 password-icon icon-account"
        />
        <span class="h-full w-full flex items-center justify-center"
          >{{ msg }}</span
        >
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { onClickOutside } from '@vueuse/core'

const modal = ref(null)

const props = defineProps({
  teleport: {
    type: String,
    required: true
  },
  openModal: {
    type: Boolean,
    required: true
  },
  msg :{
    type: String,
    required: true
  },
  isSucess: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['closeModal']);

onMounted(() => {
  let mainModal = document.getElementById('main-modal');

  if(props.isSucess) {
    mainModal?.classList.add("sucess");
  } else {
    mainModal?.classList.add("failure");
  }
})

onClickOutside(modal, () => props.openModal? emit('closeModal'): null)
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
.basic-modal {
  position: fixed;
  z-index: 1;
  width: 40vw;
  height: 25vh;
}

.sucess {
  background-color: $sucess-color;
}

.failure {
  background-color: $fail-color;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: opacity 0.7s, transform 0.7s ease-in-out;
}

.modal-slide-enter-from, 
.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>
