<template>
  <div class="home-container flex flex-col items-center w-screen h-screen">
    <header class="flex justify-between items-center w-[50vw] h-[5vh]">
      <div class="lef-buttons flex justify-center items-center">
        <button class="header-buttons flex justify-center items-center text-gray-300 rounded">
          <Icon icon="ic:baseline-expand-more" />
        </button>
        <button class="header-buttons flex justify-center items-center text-gray-300 rounded">
          <Icon icon="ic:baseline-question-mark" />
        </button>
      </div>
      <h1 class="text-[25px] font-semibold pa-0">TERMO</h1>
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
      <div ref="mainDiv" class="main-content grid grid-cols-5 grid-rows-6 w-[24vw] h-[60vh]">
        <input
          v-for="index in 5"
          :key="index"
          v-model="inputRow1[index - 1]"
          @input="inputValidation(1, index - 1)"
          @keyup.right="focusNextElement(index -1)"
          @keyup.left="focusPreviousElement(index -1)"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-1"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRow2[index - 1]"
          @input="inputValidation(2, index - 1)"
          @keyup.right="focusNextElement(index -1)"
          @keyup.left="focusPreviousElement(index -1)"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-2"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRow3[index - 1]"
          @input="inputValidation(3, index - 1)"
          @keyup.right="focusNextElement(index -1)"
          @keyup.left="focusPreviousElement(index -1)"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-3"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRow4[index - 1]"
          @input="inputValidation(4, index - 1)"
          @keyup.right="focusNextElement(index -1)"
          @keyup.left="focusPreviousElement(index -1)"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-4"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRow5[index - 1]"
          @input="inputValidation(5, index - 1)"
          @keyup.right="focusNextElement(index -1)"
          @keyup.left="focusPreviousElement(index -1)"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-5"
        />
        <input
          disabled
          v-for="index in 5"
          :key="index"
          v-model="inputRow6[index - 1]"
          @input="inputValidation(6, index - 1)"
          @keyup.right="focusNextElement(index -1)"
          @keyup.left="focusPreviousElement(index -1)"
          maxlength="1"
          type="text"
          class="rounded main-input input-row-6"
        />
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const mainDiv = ref(null)

const mainRow = ref<number>(1)
const inputRow1 = ref<string[]>([])
const inputRow2 = ref<string[]>([])
const inputRow3 = ref<string[]>([])
const inputRow4 = ref<string[]>([])
const inputRow5 = ref<string[]>([])
const inputRow6 = ref<string[]>([])

onMounted(() => {
  focusNextLine()
})

const inputValidation = (row: number, index: number) => {
  const activeRow = document.querySelectorAll(`.input-row-${row}`)
  console.log(inputRow1.value[index])
  if (/[a-zA-Z]/.test(inputRow1.value[index])) {
    if (index == 4) {
      mainRow.value += 1
      return
    }

    (activeRow[index + 1] as HTMLElement).focus();
  } else {
    inputRow1.value[index] = ''
  }
}

const focusNextLine = () => {
  const activeRow = document.querySelector(`.input-row-${mainRow.value}`);
  (activeRow as HTMLElement).focus();
}

const focusNextElement = (index: number) => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);
  if(index+1 == 5) {
    (activeRow[0] as HTMLElement).focus();
    return;
  }

  (activeRow[index+1] as HTMLElement).focus();
}

const focusPreviousElement = (index: number) => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`);
  if(index-1 == -1) {
    (activeRow[4] as HTMLElement).focus();
    return
  }

  (activeRow[index-1] as HTMLElement).focus();
} 

watch(mainRow, () => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`)
  const previousRow = document.querySelectorAll(`.input-row-${mainRow.value - 1}`)

  activeRow.forEach((item) => {
    item.removeAttribute('disabled')
  })

  previousRow.forEach((item) => {
    item.setAttribute('disabled', 'true')
    item.classList.add('aswered')
  })

  if (mainRow.value == 7) {
    return
  }

  focusNextLine()
})

onClickOutside(mainDiv, () => {
  const activeRow = document.querySelectorAll(`.input-row-${mainRow.value}`)
  let activeValue: string[] = []

  switch (mainRow.value) {
    case 1:
      activeValue = [...inputRow1.value]
      break
    case 2:
      activeValue = [...inputRow2.value]
      break
    case 3:
      activeValue = [...inputRow3.value]
      break
    case 4:
      activeValue = [...inputRow4.value]
      break
    case 5:
      activeValue = [...inputRow5.value]
      break
    case 6:
      activeValue = [...inputRow6.value]
      break
  }

  for (let i = 0; i < 5; i++) {
    if (!activeValue[i]) {
      ;(activeRow[i] as HTMLElement).focus()
      return
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../assets/style.scss';
.header-buttons {
  width: 22px;
  height: 22px;
  border: 2px solid grey;
}

.main-input {
  background-color: $main-color;
  max-width: 58px;
  max-height: 58px;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  border: 3.5px solid #312a2c;
  margin: 1px;
}

.main-input:focus {
  outline: none;
  caret-color: transparent;
  border-bottom: 8px solid #312a2c;
}

.main-input:disabled {
  background-color: $disabled-color;
  border: none;
}

.main-content .aswered {
  background-color: $aswered-color;
}
</style>
