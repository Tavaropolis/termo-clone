<template>
  <div class="account-container h-screen flex flex-col items-center justify-center">
    <div class="account-box rounded flex flex-col items-center justify-center gap-y-4">
      <h1>Criar Nova Conta</h1>
      <form action="" method="post">
        <div class="input-container flex flex-col items-center">
          <div class="flex items-center justify-center">
            <Icon icon="fa6-regular:user" class="icon-account" />
            <input
              @focus="backGroundChange"
              @focusout="backGroundChange"
              required
              type="text"
              placeholder="Usuário"
              class="rounded"
            />
          </div>
          <div class="flex items-center justify-center">
            <Icon
              v-if="isPasswordVisible"
              @click="showPassword"
              icon="fa6-regular:eye-slash"
              class="icon-account password-icon"
            />
            <Icon
              v-else
              @click="showPassword"
              icon="fa6-regular:eye"
              class="icon-account password-icon"
            />
            <input
              v-model="passwordInput"
              @focus="backGroundChange"
              @focusout="backGroundChange"
              required
              type="password"
              placeholder="Senha"
              class="rounded"
              id="passwordInput"
            />
          </div>
          <PasswordStrength v-show="passwordInput" :strength="passwordEntropy"/>
          <div class="flex items-center justify-center">
            <Icon
              v-if="isConfirmVisible"
              @click="showConfirm"
              icon="fa6-regular:eye-slash"
              class="icon-account password-icon"
            />
            <Icon
              v-else
              @click="showConfirm"
              icon="fa6-regular:eye"
              class="icon-account password-icon"
            />
            <input
              @focus="backGroundChange"
              @focusout="backGroundChange"
              required
              type="password"
              placeholder="Confirmar senha"
              class="rounded"
              id="confirmInput"
            />
          </div>
          <div class="flex items-center justify-center">
            <Icon icon="mdi:at" class="icon-account" />
            <input
              @focus="backGroundChange"
              @focusout="backGroundChange"
              required
              type="email"
              placeholder="Email"
              class="rounded"
            />
          </div>
        </div>
        <div class="group-buttons w-1/2 flex flex-row justify-around">
          <button type="reset" class="rounded">Limpar</button>
          <button @click="formReq" type="submit" class="rounded">Criar conta</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

import PasswordStrength from "@/components/PasswordStrength.vue"

const passwordInput = ref<string>("");
const isPasswordVisible = ref<boolean>(false)
const isConfirmVisible = ref<boolean>(false)

const formReq = (e: Event) => {
  e.preventDefault();
}

const passwordEntropy = computed(() => {
  const upperCaseLetters = 26;
  const lowerCaseLetters = 26;
  const numbersChar = 10;
  const specialChar = 32;

  const passwordLength = passwordInput.value.length;
  
  let diversity = 0;

  if(/[A-Z]/.test(passwordInput.value)) {
    diversity += upperCaseLetters;
  }

  if(/[a-z]/.test(passwordInput.value)) {
    diversity += lowerCaseLetters;
  }

  if(/[\d]/.test(passwordInput.value)) {
    diversity += numbersChar;
  }

  if(/[!@#$%^&*()_+]/.test(passwordInput.value)) {
    diversity += specialChar;
  }

  const entropy = passwordLength * (Math.log2(diversity));

  if(entropy <= 40) {
    console.log(`Senha fraca: ${entropy}`);
    return "weak";
  } else if (entropy <= 64) {
    console.log(`Senha média: ${entropy}`);
    return "medium";
  } else if (entropy > 64 ) {
    console.log(`Senha forte: ${entropy}`);
    return "strong";
  } else {
    return "";
  }
});

//Funções de estilização
const backGroundChange = () => {
  const body = document.querySelector('.account-container')

  body?.classList.toggle('dark-background')
}

const showPassword = () => {
  let passwordInputField: HTMLElement | null = document.getElementById('passwordInput')
  !isPasswordVisible.value
    ? passwordInputField?.setAttribute('type', 'text')
    : passwordInputField?.setAttribute('type', 'password')
  isPasswordVisible.value = !isPasswordVisible.value
}

const showConfirm = () => {
  let confirmInputField: HTMLElement | null = document.getElementById('confirmInput')
  !isConfirmVisible.value
    ? confirmInputField?.setAttribute('type', 'text')
    : confirmInputField?.setAttribute('type', 'password')
  isConfirmVisible.value = !isConfirmVisible.value
}
</script>

<style lang="scss" scoped>
@import '../../assets/style.scss';

.account-container {
  transition: all 1s ease-in-out;
}
.account-box {
  background-color: $secondary-color;
  width: 50vw;
  height: 80vh;
  overflow: auto;
}

h1 {
  font-size: 35px;
  padding: 2px;
}

input::placeholder {
  color: $text-main-color;
}

input {
  background-color: $input-login-color;
  width: 25vw;
  height: 35px;
  margin: 3px;
  transition: all 1.5s ease-in-out;
}

input:focus {
  width: 30vw;
}

.group-buttons button {
  background-color: $button-color;
  width: 10vw;
  height: 37px;
  transition: all 1s ease-in-out;
}

button:hover {
  transform: scale(1.1);
}
</style>
