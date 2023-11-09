<template>
  <div class="home-container flex flex-col items-center w-screen h-screen">
    <header class="flex justify-between items-center w-[55vw] h-[5vh] mt-2">
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
    <main class="flex justify-between mt-16">
      <div ref="mainDiv" class="main-content grid grid-cols-5 grid-rows-6 w-[22vw] h-[54vh]">
        <input
          v-for="index in 5"
          :key="index"
          v-model="inputRows[0][index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          @keyup.enter="confirmTry(inputRows[0])"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-0"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRows[1][index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          @keyup.enter="confirmTry(inputRows[1])"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-1"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRows[2][index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          @keyup.enter="confirmTry(inputRows[2])"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-2"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRows[3][index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          @keyup.enter="confirmTry(inputRows[3])"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-3"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRows[4][index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          @keyup.enter="confirmTry(inputRows[4])"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-4"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRows[5][index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          @keyup.enter="confirmTry(inputRows[5])"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-5"
        />
      </div>
    </main>
    <div class="letter-row mt-3 w-[55vw]">
      <div class="letter-row-1 flex">
        <button v-for="(letter, index) in firstLetterRow" :key="letter" @click="buttonInput(index, 1)" class="letter-row-button rounded">
          {{ letter }}
        </button>
      </div>
      <div class="letter-row-2 flex ml-4">
        <button v-for="(letter, index) in secondLetterRow" :key="letter" @click="buttonInput(index, 2)" class="letter-row-button rounded">
          {{ letter }}
        </button>
        <button id="backspace-button" class="rounded flex justify-center items-center">
          <Icon icon="material-symbols:backspace-outline" class="w-7 h-7" />
        </button>
      </div>
      <div class="letter-row-3 flex ml-8">
        <button v-for="(letter, index) in thirdLetterRow" :key="letter" @click="buttonInput(index, 3)" class="letter-row-button rounded">
          {{ letter }}
        </button>
        <button @click="confirmTry(inputRows[mainRow])" id="enter-button" class="rounded">ENTER</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import axios from 'axios'

//Elementos de referência
const mainDiv = ref(null);

//Variáveis
const mainWord = ref<string[]>([])
const mainRow = ref<number>(0)
const isRowFull = ref<boolean>(false);
const inputRows = ref<string[][]>([
  [], [], [], [], [], []
])

const firstLetterRow = ref<string[]>(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'])
const secondLetterRow = ref<string[]>(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'])
const thirdLetterRow = ref<string[]>(['z', 'x', 'c', 'v', 'b', 'n', 'm'])

onMounted(() => {
  getWord()
  focusNextLine()
})

//Recupera uma palavra aleatória do banco de dados
const getWord = async () => {
  let response = await axios.post('http://127.0.0.1:5001/getRandomWord', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  let { data } = response
  mainWord.value = data.word.split("");
  console.log(mainWord.value);
}

const inputValidation = (index: number) => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`)
  if (/[a-zA-Z]/.test(inputRows.value[mainRow.value][index])) {
    
    (activeRow[index] as HTMLInputElement).classList.add('input-animation');
    (activeRow[index + 1] as HTMLInputElement).setSelectionRange(0, 1);
    (activeRow[index + 1] as HTMLInputElement).focus();
  } else {
    inputRows.value[mainRow.value][index] = ''
  }
}

const buttonInput = ((index: number, letterRow: number) => {
  for (let i = 0; i < 5; i++) {
    if (!inputRows.value[mainRow.value][i]) {
      if(letterRow == 1) {
        inputRows.value[mainRow.value][i] = firstLetterRow.value[index];
        return
      } else if(letterRow == 2) {
        inputRows.value[mainRow.value][i] = secondLetterRow.value[index];
        return
      }else if (letterRow == 3) {
        inputRows.value[mainRow.value][i] = thirdLetterRow.value[index];
        return
      }
    }
  }
});

//Funções de quando o usuário aperta enter e confirma a tentativa
const confirmTry = ((row: any) => {
  rowValidation(row);
  if (isRowFull.value) {
      checkWordResult();
      endLineAnimation();
      mainRow.value += 1
      isRowFull.value = false
      return
    }
})


const rowValidation = ((row: any) => {
  for(let i = 0; i < 5; i++) {
    if(!row[i]) {
      return;
    }
  }
  isRowFull.value = true;
})

const checkWordResult = (() => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);

  //Checa as letras certas nas posições certas
  for(let i = 0; i < inputRows.value[mainRow.value].length; i++) {
    inputRows.value[mainRow.value][i] = inputRows.value[mainRow.value][i].toLocaleLowerCase();
    if(inputRows.value[mainRow.value][i] == mainWord.value[i]) {
      (activeRow[i] as HTMLInputElement).classList.add("success")
   }
  }

  //Checa as letras certas nas posições erradas
  for(let i = 0; i < inputRows.value[mainRow.value].length; i++) {
    for(let j = 0;  j < mainWord.value.length; j++) {
      if(inputRows.value[mainRow.value][i] == mainWord.value[j]) {
        if(!(activeRow[i] as HTMLInputElement).classList.contains("success")) {
          (activeRow[i] as HTMLInputElement).classList.add("warn")
        }
      }
    }
  }
});

//Foca o primeiro elemento da linha de baixo
const focusNextLine = () => {
  const activeRow = document.querySelector(`.input-row-${mainRow.value}`)
  ;(activeRow as HTMLInputElement).setSelectionRange(0, 1)
  ;(activeRow as HTMLInputElement).focus()
}

// Foca próximo elemento quando usuário aperta seta para a direita
const focusNextElement = (index: number) => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`)

  if (index + 1 == 5) {
    (activeRow[0] as HTMLInputElement).setSelectionRange(0, 1);
    (activeRow[0] as HTMLInputElement).focus();
    return
  }

  ;(activeRow[index + 1] as HTMLInputElement).setSelectionRange(0, 1)
  ;(activeRow[index + 1] as HTMLInputElement).focus()
}

// Foca o elemento anterior quando usuário aperta seta para a esquerda
const focusPreviousElement = (index: number) => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`)
  if (index - 1 == -1) {
    ;(activeRow[4] as HTMLInputElement).setSelectionRange(0, 1)
    ;(activeRow[4] as HTMLInputElement).focus()
    return
  }

  ;(activeRow[index - 1] as HTMLInputElement).setSelectionRange(0, 1)
  ;(activeRow[index - 1] as HTMLInputElement).focus()
}

watch(mainRow, () => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`)
  const previousRow = document.querySelectorAll(`.input-row-${mainRow.value - 1}`)

  activeRow.forEach((item) => {
    item.removeAttribute('disabled')
  })

  previousRow.forEach((item) => {
    item.setAttribute('disabled', 'true');
  })

  if (mainRow.value == 7) {
    return
  }

  focusNextLine()
})

//Foca primeiro input vazio quando o usuário clica fora
onClickOutside(mainDiv, () => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`)

  for (let i = 0; i < 5; i++) {
    if (!inputRows.value[mainRow.value][i]) {
      (activeRow[i] as HTMLInputElement).focus()
      return
    }
  }
})

//Funções de estilização
const endLineAnimation = () => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);
  activeRow[0].classList.add("flip-animation"); 
  if(activeRow[0].classList.contains("success")) { 
    activeRow[0].classList.add("letter-sucess"); 
  } else if (activeRow[0].classList.contains("warn")) {
    activeRow[0].classList.add("flip-animation");   
    activeRow[0].classList.add("letter-warn");  
  } else {
    activeRow[0].classList.add('aswered');
  }

  for(let i = 0; i < activeRow.length; i++) {
    activeRow[i].addEventListener("animationend", ()=> {
      if(activeRow[i+1].classList.contains("success")) {
        activeRow[i+1].classList.add("flip-animation");   
        activeRow[i+1].classList.add("letter-sucess");   
      } else if(activeRow[i+1].classList.contains("warn")) {
        activeRow[i+1].classList.add("flip-animation");   
        activeRow[i+1].classList.add("letter-warn");        
      }else {
        activeRow[i+1].classList.add("flip-animation"); 
        activeRow[i+1].classList.add('aswered');
      }
    })
  }
}

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
  margin: 2px;
}

#backspace-button {
  width: 60px;
  height: 45px;
  background-color: $focus-color;
  margin: 2px;
  margin-left: 30px;
}

#enter-button {
  width: 180px;
  height: 45px;
  background-color: $focus-color;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
  margin: 2px;
  margin-left: 30px;
}

.input-animation {
  animation-duration: 0.2s;
  animation-name: input-animation;
}

.flip-animation {
  animation-duration: 0.4s;
  animation-name: flip-animation;
}

.main-content .letter-sucess {
  background-color: $sucess-color
}
.main-content .letter-warn {
  background-color: $attention-color
}

@keyframes input-animation {
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes flip-animation {
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}

</style>
