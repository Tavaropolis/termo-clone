<template>
  <div class="login-container flex flex-col items-center justify-center">
    <div class="login-box rounded flex flex-col items-center justify-center gap-y-4">
      <h1>Login</h1>
      <form action="" method="post">
        <div class="input-container flex flex-col items-center">
          <input @focus="backGroundChange" @focusout="backGroundChange" type="text" required id="login" placeholder="Login" class="rounded">
          <input @focus="backGroundChange" @focusout="backGroundChange" type="password" required name="" id="" ref="password" placeholder="Senha" class="rounded">
        </div>
        <button type="submit" class="rounded">Logar</button>
      </form>
      <div class="secondary-buttons w-60 flex flex-row justify-between">
        <button type="button" class="rounded">Criar conta</button>
        <button type="button" class="rounded">Esqueci senha</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  setup() {
    const backGroundChange = () => {
      const body = document.querySelector('.login-container');

      body?.classList.toggle("dark-background");
    }

    return {
      backGroundChange
    };
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
  background-color: #CB8776;
  width: 25vw;
  height: 35px;
  margin: 3px;
  transition: all 1.5s ease-in-out;
}

input:focus {
  width: 30vw
}

::placeholder {
  color: var(--vt-c-white);
}

button[type="submit"] {
  background-color: #EDA571;
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