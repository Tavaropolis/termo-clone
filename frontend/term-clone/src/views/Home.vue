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
    <ContentChip :message="chipMessage" @closeChip="chipActive = false" class="invisible" id="contentchip"/>
    <main class="flex justify-between mt-3">
      <div ref="mainDiv" class="main-content grid grid-cols-5 grid-rows-6 w-[22vw] h-[54vh]">
        <input
          v-for="index in 5"
          :key="index"
          v-model="inputRows[0][index - 1]"
          @input="inputValidation(index - 1)"
          @keyup.right="focusNextElement(index - 1)"
          @keyup.left="focusPreviousElement(index - 1)"
          @keyup.delete="deletePrevious(index - 1)"
          @keyup.enter="confirmTry()"
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
          @keyup.delete="deletePrevious(index - 1)"
          @keyup.enter="confirmTry"
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
          @keyup.delete="deletePrevious(index - 1)"
          @keyup.enter="confirmTry"
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
          @keyup.delete="deletePrevious(index - 1)"
          @keyup.enter="confirmTry"
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
          @keyup.delete="deletePrevious(index - 1)"
          @keyup.enter="confirmTry()"
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
          @keyup.delete="deletePrevious(index - 1)"
          @keyup.enter="confirmTry()"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-5"
        />
      </div>
    </main>
    <div class="letter-row mt-3 w-[55vw]">
      <div class="letter-row-1 flex">
        <button v-for="(letter, index) in firstLetterRow" :key="letter" @click="buttonInput(index, 1)" class="letter-row-button-0 rounded">
          {{ letter }}
        </button>
      </div>
      <div class="letter-row-2 flex ml-4">
        <button v-for="(letter, index) in secondLetterRow" :key="letter" @click="buttonInput(index, 2)" class="letter-row-button-1 rounded">
          {{ letter }}
        </button>
        <button @click="deletePreviousButton" id="backspace-button" class="rounded flex justify-center items-center">
          <Icon icon="material-symbols:backspace-outline" class="w-7 h-7" />
        </button>
      </div>
      <div class="letter-row-3 flex ml-8">
        <button v-for="(letter, index) in thirdLetterRow" :key="letter" @click="buttonInput(index, 3)" class="letter-row-button-2 rounded">
          {{ letter }}
        </button>
        <button @click="confirmTry" id="enter-button" class="rounded">ENTER</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import { Word } from '@andsfonseca/palavras-pt-br'

import ContentChip from "../components/ContentChip.vue";

//Elementos de referência
const mainDiv = ref(null);

//Variáveis
const mainWord = ref<string[]>([])
const mainRow = ref<number>(0)
const endGame = ref<boolean>(false)
const isRowFull = ref<boolean>(false);
const inputRows = ref<string[][]>([
  [], [], [], [], [], []
])

const firstLetterRow = ref<string[]>(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'])
const secondLetterRow = ref<string[]>(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'])
const thirdLetterRow = ref<string[]>(['z', 'x', 'c', 'v', 'b', 'n', 'm'])

const chipActive = ref<boolean>(false);
const chipMessage = ref<string>("");

onMounted(() => {
  getWord()
  focusNextLine()
  getData()
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
  if (/[a-zA-ZÇç]/.test(inputRows.value[mainRow.value][index])) {
    
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
        focusNextElement(i);
        return
      } else if(letterRow == 2) {
        inputRows.value[mainRow.value][i] = secondLetterRow.value[index];
        focusNextElement(i);
        return
      }else if (letterRow == 3) {
        inputRows.value[mainRow.value][i] = thirdLetterRow.value[index];
        focusNextElement(i);
        return
      }
    }
  }
});

//Funções de quando o usuário aperta enter e confirma a tentativa
const confirmTry = (() => {
  wordValidation();

  if (isRowFull.value && !chipActive.value) {
      checkWordResult();
      checkVictory();
      endLineAnimation();
      saveData();
      mainRow.value += 1
      isRowFull.value = false
    }
})

const wordValidation = (() => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);
  let userWord = [];

  for(let value of inputRows.value[mainRow.value]){
    value = value.toLowerCase();
    userWord.push(value);
  }

  if(userWord.length < 5) {
    isRowFull.value = false
    chipActive.value = true;
    chipMessage.value = "Só palavras com 5 letras"

    for(let row of activeRow) {
      if(row.classList.contains("wrong-animation")) {
        row.classList.remove("wrong-animation");
      }

      (row as HTMLInputElement).offsetWidth; //Reseta a animação
      row.classList.add("wrong-animation");
    }

    return
  }

  chipActive.value = (!Word.checkValid(userWord.join("")))
  if(chipActive.value) {
    chipMessage.value = "Esta palavra não é aceita"

    for(let row of activeRow) {
      if(row.classList.contains("wrong-animation")) {
        row.classList.remove("wrong-animation");
      }

      (row as HTMLInputElement).offsetWidth; //Reseta a animação
      row.classList.add("wrong-animation");
    }
  } else {
    isRowFull.value = true;
  }
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

const checkVictory = (() => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);

  for(let element of activeRow) {
    if(!element.classList.contains("success")) {
      return
    }
  }

  chipActive.value = true
  chipMessage.value = "Impressionante"
  endGame.value = true
})

const saveData = (() => {
  let inputRowsData = Object.assign({}, inputRows.value);
  localStorage.setItem("inputRows", JSON.stringify(inputRowsData));
  
})

const getData = (() => {
  let inputStorage = localStorage.getItem("inputRows")

  if(inputStorage) {
    let inputStorageJSON = JSON.parse(inputStorage!);
    inputRows.value = Object.values(inputStorageJSON)
  }
})

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

const deletePrevious = ((index: number) => {
  if(index == 0) {
    return
  }

  if(!inputRows.value[mainRow.value][index]) {
    inputRows.value[mainRow.value][index - 1] = "";
    focusPreviousElement(index);
  }
});

const deletePreviousButton = (() => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`)

  for(let i = 0; i < 5; i++) {
    if(activeRow[i] === document.activeElement) {
      if(i == 0) {
        return
      }
      
      if(!inputRows.value[mainRow.value][i]) {
        inputRows.value[mainRow.value][i - 1] = "";
        focusPreviousElement(i);
        return
      }
  }
}})
//Foca primeiro input vazio quando o usuário clica fora
onClickOutside(mainDiv, () => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`)
    for (let i = 0; i < 5; i++) {
      if (!inputRows.value[mainRow.value][i]) {
        (activeRow[i] as HTMLInputElement).focus()
        return
      } 

    (activeRow[0] as HTMLInputElement).focus()
  }
})

watch(mainRow, () => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`)
  const previousRow = document.querySelectorAll(`.input-row-${mainRow.value - 1}`)

  for(let row of activeRow) {
    row.removeAttribute('disabled');
  }

  for(let row of previousRow) {
    row.setAttribute('disabled', 'true');
  }

  if (mainRow.value == 7) {
    return
  }

  focusNextLine()
})

watch(chipActive, () => {
  const contentchip = document.getElementById("contentchip");

  if(chipActive.value == true) {
    contentchip?.classList.remove("invisible");
  } else {
    contentchip?.classList.add("invisible");
  }
})

watch(endGame, () => {
  if(endGame.value) {
    for(let i = 0; i < 6; i++) {
      const activeRow = document.querySelectorAll(`.input-row-${i}`);
      for(let j = 0; j < 5; j++) {
        activeRow[j].setAttribute('disabled', 'true');
      }
    }

    for(let i = 0; i < 3; i++) {
      const letterRow = document.querySelectorAll(`.letter-row-button-${i}`);
      for(let letter of letterRow) {
        letter.setAttribute("disabled", "true");
      }
    }

    const enterButton = document.getElementById("enter-button");
    enterButton?.setAttribute("disabled", "true");

    const backspaceButton = document.getElementById("backspace-button");
    backspaceButton?.setAttribute("disabled", "true")
  }
})

//Funções de estilização
const endLineAnimation = () => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);

  for(let row of activeRow) {
    if((row as HTMLInputElement).classList.contains("wrong-animation")) {
      row.classList.remove("wrong-animation");
    }
    if((row as HTMLInputElement).classList.contains("input-animation")) {
      row.classList.remove("input-animation");  
    }
  }

  activeRow[0].classList.add("flip-animation"); 
  if(activeRow[0].classList.contains("success")) { 
    activeRow[0].classList.add("letter-success"); 
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
        activeRow[i+1].classList.add("letter-success");   
      } else if(activeRow[i+1].classList.contains("warn")) {
        activeRow[i+1].classList.add("flip-animation");   
        activeRow[i+1].classList.add("letter-warn");        
      }else {
        activeRow[i+1].classList.add("flip-animation"); 
        activeRow[i+1].classList.add('aswered');
      }
    })
  }
  buttonColorization();
}

const buttonColorization = (() => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);

  for(let row of activeRow) {
    for(let i = 0; i < 3; i++) {
      const letterRow = document.querySelectorAll(`.letter-row-button-${i}`);
      for(let letter of letterRow) {
      if((row as HTMLInputElement).value == letter.textContent) {
        if(row.classList.contains("success")) {
          letter.classList.add("letter-success")
        } else if(row.classList.contains("warn")) {
          letter.classList.add("letter-warn")
        }
      }
    }
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

.letter-row-button-0, .letter-row-button-1, .letter-row-button-2 {
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

.letter-row-button-0:disabled, .letter-row-button-1:disabled, .letter-row-button-2:disabled, 
#enter-button:disabled, #backspace-button:disabled  {
  opacity: 0.4;
}

.input-animation {
  animation-duration: 0.2s;
  animation-name: input-animation;
}

.flip-animation {
  animation-duration: 0.5s;
  animation-name: flip-animation;
}

.wrong-animation {
  animation-duration: 0.3s;
  animation-name: wrong-animation;
}

.main-content .letter-success {
  background-color: $success-color
}
.main-content .letter-warn {
  background-color: $attention-color
}

.letter-row-button-0.letter-success, .letter-row-button-1.letter-success, .letter-row-button-2.letter-success {
  background-color: $success-color
}

.letter-row-button-0.letter-warn, .letter-row-button-1.letter-warn, .letter-row-button-2.letter-warn {
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

@keyframes wrong-animation {
  20% {
    transform: translateX(-20px);
  } 
  40% {
    transform: translateX(20px);
  }
  60% {
    transform: translateX(-10px);
  }
  80% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0px);
  } 

}

</style>
