<template>
 <Transition name="fade">
    <div class="password-strength-container h-full w-[22vw] flex items-center justify-center">
       <div class="box-result h-4 w-1/3 bg-red-500 rounded"></div>
       <div class="box-result h-4 w-1/3 bg-white rounded"></div>
       <div class="box-result h-4 w-1/3 bg-white rounded"></div>
       <span class="font-semibold ml-2">{{ strengthMsg || "Fraco" }}</span>
    </div>
 </Transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    strength: {
        type: String,
        required: true
    }
});

const strengthMsg = computed(() => {
   let boxResults: NodeListOf<Element> = document.querySelectorAll(".box-result");
   console.log(boxResults);
   if(props.strength == "weak") {
      boxResults[1].classList.remove("bg-yellow-500");
      boxResults[2].classList.remove("bg-green-500");
      boxResults[1].classList.add("bg-white");
      boxResults[2].classList.add("bg-white");

      return "Fraco";
   } else if(props.strength == "medium") {
      boxResults[1].classList.add("bg-yellow-500");
      boxResults[2].classList.remove("bg-green-500");
      boxResults[2].classList.add("bg-white");

      return "Médio";
   } else if(props.strength == "strong") {
      boxResults[2].classList.add("bg-green-500");
      boxResults[2].classList.remove("bg-white");

      return "Forte";
   } else {
      return "";
   }
})
</script>

<style lang="scss" scoped>
@import "../assets/style.scss";

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>