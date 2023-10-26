<template>
  <div
    id="new-account"
    class="recovery-password-container h-screen w-screen flex flex-col items-center justify-center"
  >
    <div class="recovery-password-box flex flex-col items-center justify-center gap-y-4 rounded">
      <h1 class="text-[35px]">Recuperar Senha</h1>
      <form action="" method="post">
        <div class="flex items-center justify-center">
          <Icon icon="fa6-regular:user" class="icon-account" />
          <Icon icon="mdi:at" class="icon-account" />
          <input
            v-model.lazy="recoveryInput"
            @focus="backGroundChange"
            @focusout="backGroundChange"
            type="text"
            placeholder="Digite usuário ou email"
            class="rounded"
          />
        </div>
        <button type="submit" class="rounded" @click="formReq">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'

const recoveryInput = ref<string>('')

const formReq = async (e: Event) => {
  e.preventDefault()

  try {
    await axios.post(
      'http://127.0.0.1:5001/sendEmail',
      {
        payload: recoveryInput.value
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
  } catch (e) {
    console.log(e)
  }
}

//Funções de estilização
const backGroundChange = () => {
  const body = document.querySelector('.recovery-password-container')

  body?.classList.toggle('dark-background')
}
</script>

<style lang="scss" scoped>
@import '../../assets/style.scss';

.recovery-password-container {
  transition: all 1s ease-in-out;
}
.recovery-password-box {
  background-color: $secondary-color;
  width: 50vw;
  height: 80vh;
  overflow: auto;
}

input {
  background-color: $input-login-color;
  width: 30vw;
  height: 35px;
  margin: 3px;
  transition: all 1.5s ease-in-out;
}

input:focus {
  width: 35vw;
}

button[type='submit'] {
  background-color: $button-color;
  width: 12vw;
  height: 40px;
  transition: all 1s ease-in-out;
}

button[type='submit']:disabled {
  opacity: 0.2;
}

button[type='submit']:disabled:hover {
  transform: none;
}

button:hover {
  transform: scale(1.1);
}
</style>
