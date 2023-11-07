<template>
  <div class="home-container flex flex-col items-center w-screen h-screen">
    <header class="flex justify-between items-center w-[55vw] h-[5vh] mt-1">
      <div class="lef-buttons flex justify-center items-center">
        <button class="header-buttons flex justify-center items-center text-gray-300 rounded">
          <Icon icon="ic:baseline-expand-more" />
        </button>
        <button class="header-buttons flex justify-center items-center text-gray-300 rounded">
          <Icon icon="ic:baseline-question-mark" />
        </button>
      </div>
      <h1 class="text-[24px] font-semibold pa-0">TERMO</h1>
      <div class="right-buttons flex justify-center items-center">
        <button class="header-buttons flex justify-center items-center text-gray-300 rounded">
          <Icon icon="ic:baseline-bar-chart" />
        </button>
        <button class="header-buttons flex justify-center items-center text-gray-300 rounded">
          <Icon icon="ic:baseline-settings" />
        </button>
      </div>
    </header>
    <main class="flex justify-between mt-12">
      <div ref="mainDiv" class="main-content grid grid-cols-5 grid-rows-6 w-[22vw] h-[54vh]">
        <input
          v-for="index in 5"
          :key="index"
          v-model="inputRow1[index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-1"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRow2[index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-2"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRow3[index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-3"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRow4[index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-4"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRow5[index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-5"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRow6[index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-6"
        />
      </div>
    </main>
    <div class="letter-row-1 flex">
      <button v-for="letter in firstLetterRow" :key="letter" class="letter-row-button rounded">{{ letter }}</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import axios from 'axios'

//Elementos de referência
const mainDiv = ref(null)

//Variáveis
const mainWord = ref<string>("");
const mainRow = ref<number>(1)
const inputRow1 = ref<string[]>([])
const inputRow2 = ref<string[]>([])
const inputRow3 = ref<string[]>([])
const inputRow4 = ref<string[]>([])
const inputRow5 = ref<string[]>([])
const inputRow6 = ref<string[]>([])

const firstLetterRow = ref<string[]>(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]);
onMounted(() => {
  getWord();
  focusNextLine();
})

//Recupera uma palavra aleatória do banco de dados
const getWord = async () => {
  let response = await axios.post('http://127.0.0.1:5001/getRandomWord', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  let { data } = response;
  mainWord.value = data
}

const inputValidation = (index: number) => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);
  switch (mainRow.value) {
    case 1:
      if (/[a-zA-Z]/.test(inputRow1.value[index])) {
        if (index == 4) {
          mainRow.value += 1;
          return;
        }
        
        (activeRow[index + 1] as HTMLInputElement).setSelectionRange(0, 1);
        (activeRow[index + 1] as HTMLInputElement).focus();
      } else {
        inputRow1.value[index] = '';
      }
      break;
    case 2:
      if (/[a-zA-Z]/.test(inputRow2.value[index])) {
        if (index == 4) {
          mainRow.value += 1;
          return;
        }

        (activeRow[index + 1] as HTMLInputElement).setSelectionRange(0, 1);
        (activeRow[index + 1] as HTMLInputElement).focus();
      } else {
        inputRow2.value[index] = '';
      }
      break;
    case 3:
      if (/[a-zA-Z]/.test(inputRow3.value[index])) {
        if (index == 4) {
          mainRow.value += 1;
          return;
        }

        (activeRow[index + 1] as HTMLInputElement).setSelectionRange(0, 1);
        (activeRow[index + 1] as HTMLInputElement).focus();
      } else {
        inputRow3.value[index] = ''
      }
      break
    case 4:
      if (/[a-zA-Z]/.test(inputRow4.value[index])) {
        if (index == 4) {
          mainRow.value += 1;
          return;
        }

        (activeRow[index + 1] as HTMLInputElement).setSelectionRange(0, 1);
        (activeRow[index + 1] as HTMLInputElement).focus();
      } else {
        inputRow4.value[index] = '';
      }
      break;
    case 5:
      if (/[a-zA-Z]/.test(inputRow5.value[index])) {
        if (index == 4) {
          mainRow.value += 1
          return
        }

        (activeRow[index + 1] as HTMLInputElement).setSelectionRange(0, 1);
        (activeRow[index + 1] as HTMLInputElement).focus();
      } else {
        inputRow5.value[index] = '';
      }
      break;
    case 6:
      if (/[a-zA-Z]/.test(inputRow6.value[index])) {
        if (index == 4) {
          mainRow.value += 1;
          return;
        }

        (activeRow[index + 1] as HTMLInputElement).setSelectionRange(0, 1);
        (activeRow[index + 1] as HTMLInputElement).focus();
      } else {
        inputRow6.value[index] = '';
      }
      break;
  }
}

//Foca o primeiro elemento da linha de baixo
const focusNextLine = () => {
  const activeRow = document.querySelector(`.input-row-${mainRow.value}`);
  (activeRow as HTMLInputElement).setSelectionRange(0, 1);
  (activeRow as HTMLInputElement).focus();
}

// Foca próximo elemento quando usuário aperta seta para a direita
const focusNextElement = (index: number) => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);

  if (index + 1 == 5) {
    (activeRow[0] as HTMLInputElement).setSelectionRange(0, 1);
    (activeRow[0] as HTMLInputElement).focus();
    return;
  }

  (activeRow[index + 1] as HTMLInputElement).setSelectionRange(0, 1);
  (activeRow[index + 1] as HTMLInputElement).focus();
}

// Foca o elemento anterior quando usuário aperta seta para a esquerda
const focusPreviousElement = (index: number) => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);
  if (index - 1 == -1) {
    (activeRow[4] as HTMLInputElement).setSelectionRange(0, 1);
    (activeRow[4] as HTMLInputElement).focus();
    return;
  }

  (activeRow[index - 1] as HTMLInputElement).setSelectionRange(0, 1);
  (activeRow[index - 1] as HTMLInputElement).focus();
}

watch(mainRow, () => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);
  const previousRow = document.querySelectorAll(`.input-row-${mainRow.value - 1}`);

  activeRow.forEach((item) => {
    item.removeAttribute('disabled');
  })

  previousRow.forEach((item) => {
    item.setAttribute('disabled', 'true');
    item.classList.add('aswered');
  })

  if (mainRow.value == 7) {
    return;
  }

  focusNextLine();
})

//Foca primeiro input vazio quando o usuário clica fora
onClickOutside(mainDiv, () => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);
  let activeValue: string[] = [];

  switch (mainRow.value) {
    case 1:
      activeValue = [...inputRow1.value];
      break;
    case 2:
      activeValue = [...inputRow2.value];
      break;
    case 3:
      activeValue = [...inputRow3.value];
      break;
    case 4:
      activeValue = [...inputRow4.value];
      break;
    case 5:
      activeValue = [...inputRow5.value];
      break;
    case 6:
      activeValue = [...inputRow6.value];
      break;
  }

  for (let i = 0; i < 5; i++) {
    if (!activeValue[i]) {
      (activeRow[i] as HTMLInputElement).focus();
      return;
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../assets/style.scss';
.header-buttons {
  width: 22px;
  height: 22px;
  border: 2px solid $border-button-color;
  margin: 2px;
}

.main-input {
  background-color: $main-color;
  max-width: 58px;
  max-height: 58px;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  border: 3.5px solid $focus-color;
  margin: 2px;
}

.main-input::selection {
  background: none;
}

.main-input:focus {
  outline: none;
  caret-color: transparent;
  border-bottom: 8px solid $focus-color;
}

.main-input:disabled {
  background-color: $disabled-color;
  border: none;
}

.main-content .aswered {
  background-color: $aswered-color;
}

.letter-row-button {
  width: 60px;
  height: 45px;
  background-color: $focus-color;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
  margin: 2px
}
</style>
