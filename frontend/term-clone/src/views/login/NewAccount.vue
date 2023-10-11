<template>
  <div class="account-container h-screen flex flex-col items-center justify-center">
    <div class="account-box rounded flex flex-col items-center justify-center gap-y-4">
      <h1>Create Account</h1>
      <form action="" method="post">
        <div class="input-container flex flex-col items-center">
          <div class="flex items-center justify-center">
            <Icon icon="fa6-regular:user" class="icon-account"/>
            <input type="text" placeholder="Usuário" class="rounded"/>
          </div>
          <div class="flex items-center justify-center">
            <Icon icon="fa6-regular:eye-slash" class="icon-account"/>
            <input type="password" placeholder="Senha" class="rounded" />
          </div>
          <div class="flex items-center justify-center">
              <Icon icon="fa6-regular:eye-slash" class="icon-account"/>
              <input type="password" placeholder="Confirmar senha" class="rounded" />
          </div>
          <div class="flex items-center justify-center">
              <Icon icon="mdi:at" class="icon-account"/>
              <input type="email" placeholder="Email" class="rounded" />
          </div>
        </div>
        <button class="rounded">Logar</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
</script>

<style scopped>
.account-box {
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

input::placeholder {
  color: var(--vt-c-white);
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

.icon-account {
  width: 3vw;
  height: 3vh;
}

button {
  background-color: #eda571;
  width: 12vw;
  height: 40px;
  transition: all 1s ease-in-out;
}

button:hover {
  transform: scale(1.1);
}
</style>
