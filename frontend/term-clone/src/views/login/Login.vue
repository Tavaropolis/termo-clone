<template>
  <div class="login-container h-screen flex flex-col items-center justify-center">
    <div class="login-box rounded flex flex-col items-center justify-center gap-y-4">
      <h1>Login</h1>
      <form action="" method="post">
        <div class="input-container flex flex-col items-center">
          <input
            v-model="userLogin"
            @focus="backGroundChange"
            @focusout="backGroundChange"
            type="text"
            required
            autocomplete="on"
            id="login"
            placeholder="Login"
            class="rounded"
          />
          <input
            v-model="userPassword"
            @focus="backGroundChange"
            @focusout="backGroundChange"
            type="password"
            required
            name=""
            id=""
            autocomplete="on"
            placeholder="Senha"
            class="rounded"
          />
        </div>
        <button @click="formReq" type="submit" class="rounded">Logar</button>
      </form>
      <div class="secondary-buttons w-60 flex flex-row justify-between">
        <button type="button" class="rounded"><RouterLink to="newaccount">Criar Conta</RouterLink></button>
        <button type="button" class="rounded">Esqueci senha</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();

const userLogin = ref<string>()
const userPassword = ref<string>()

const backGroundChange = () => {
  const body = document.querySelector('.login-container')

  body?.classList.toggle('dark-background')
}

const formReq = async (e: Event) => {
  e.preventDefault();

  try {
    let response = await axios.post(
      'http://127.0.0.1:5001/user',
      {
        user: userLogin.value,
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
</script>

<style scoped>
.login-box {
  background-color: var(--secondary-color);
  width: 50vw;
  height: 80vh;
  overflow: auto;
}

h1 {
  font-size: 35px;
  padding: 2px;
}

form {
  display: contents;
}

input {
  background-color: #cb8776;
  width: 25vw;
  height: 35px;
  margin: 3px;
  transition: all 1.5s ease-in-out;
}

input:focus {
  width: 30vw;
}

::placeholder {
  color: var(--vt-c-white);
}

button {
  background-color: #eda571;
  width: 12vw;
  height: 40px;
  transition: all 1s ease-in-out;
}

button[type="button"] {
  background-color: #EDA571;
  width: 9vw;
  height: 20px;
  font-size: 12px;
  transition: all 1s ease-in-out;
}

button:hover {
  transform: scale(1.1);
}

div.login-container {
  width: 100vw;
  height: 100vh;
  transition: all 1s ease-in-out;
}

.dark-background {
  background-color: var(--focus-color);
}
</style>
