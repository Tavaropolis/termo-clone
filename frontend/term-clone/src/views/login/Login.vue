<template>
  <div class="login-container w-sreen h-screen flex flex-col items-center justify-center">
    <h1 class="font-semibold">TERMO CLONE</h1>
    <div class="login-box rounded flex flex-col items-center justify-center gap-y-4 mt-3">
      <h1>Login</h1>
      <form action="" method="post">
        <div class="flex flex-col items-center">
          <div class="flex items-center justify-center">
            <Icon icon="fa6-regular:user" class="icon-account"/>
            <input
              v-model="userLogin"
              @focus="backGroundChange"
              @focusout="backGroundChange"
              type="text"
              autocomplete="on"
              id="login"
              placeholder="Login"
              class="rounded"
            />
          </div>
          <div class="flex items-center justify-center">
            <Icon v-if="isPasswordVisible" @click="showPassword" icon="fa6-regular:eye-slash" class="icon-account password-icon"/>
            <Icon v-else @click="showPassword" icon="fa6-regular:eye" class="icon-account password-icon"/>
            <input
              v-model="userPassword"
              @focus="backGroundChange"
              @focusout="backGroundChange"
              type="password"
              autocomplete="on"
              placeholder="Senha"
              id="passwordInput"
              class="rounded"
            />
          </div>
        </div>
        <button @click="formReq" type="submit" class="rounded" :disabled="!userLogin || !userPassword? true : false">Logar</button>
      </form>
      <div class="secondary-buttons w-1/2 flex flex-row justify-center">
        <RouterLink to="newaccount"><button type="button" class="rounded">Criar Conta</button></RouterLink>
        <RouterLink to="recoverypassword"><button type="button" class="rounded">Esqueci senha</button></RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router';
import axios from 'axios'
import { Icon } from '@iconify/vue'

const router = useRouter();

const isPasswordVisible = ref<boolean>(false);

const userLogin = ref<string>();
const userPassword = ref<string>();

const formReq = async (e: Event) => {
  e.preventDefault();

  try {
    let response = await axios.post(
      'http://127.0.0.1:5001/login',
      {
        username: userLogin.value,
        password: userPassword.value
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    let { data } = response;

    tokkenValidate(data);
  } catch (e) {
    console.log(e)
  }
}

const tokkenValidate = async(user: any) => {
  try {
    let response = await axios.post(
      'http://127.0.0.1:5001/authtoken',
      { ...user }, 
      {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if(response) {
        localStorage.setItem("accessToken", user.token)
        router.push({ path: "/" });
      }
      
      console.log(response);
  } catch(e) {
    console.log(e)
  }
}

//Funções de estilização
const backGroundChange = () => {
  const body = document.querySelector('.login-container')

  body?.classList.toggle('dark-background')
}

const showPassword = () => {
    let passwordInputField: HTMLElement | null = document.getElementById("passwordInput");
    !isPasswordVisible.value ? passwordInputField?.setAttribute("type", "text") : passwordInputField?.setAttribute("type", "password");
    isPasswordVisible.value = !isPasswordVisible.value;
}
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
.login-box {
  background-color: $secondary-color;
  width: 50vw;
  height: 80vh;
  overflow: auto;
}

h1 {
  font-size: 35px;
  padding: 2px;
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

button[type="submit"] {
  background-color: $button-color;
  width: 12vw;
  height: 40px;
  transition: all 1s ease-in-out;
}

button[type="submit"]:disabled {
  opacity: 0.2;
}

button[type="button"] {
  background-color: $button-color;
  width: 9vw;
  height: 30px;
  font-size: 12px;
  margin: 0 5px;
  transition: all 1s ease-in-out;
}

button:hover {
  transform: scale(1.1);
}

div.login-container {
  transition: all 1s ease-in-out;
}

</style>
