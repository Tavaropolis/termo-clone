<template>
    <div ref="chip" class="content-chip flex flex-col items-center justify-center rounded">
        <p>{{ props.message }}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onClickOutside } from '@vueuse/core'

const chip = ref(null);
const props = defineProps({
    message: {
        type: String,
        required: true
    }
})
const emit = defineEmits(['closeChip']);

onClickOutside(chip, () => emit('closeChip'))
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
.content-chip {
    width: 20vw;
    height: 5vh;
    background-color: $chip-color;
    margin: 10px;
}

</style>