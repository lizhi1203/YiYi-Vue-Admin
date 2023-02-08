<template>
  <div :style="fontStyle">
    <slot></slot>
    <div class="rate" @mouseout="mouseOut">
      <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
      <span class="hollow" :style="fontWidth">
        <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for="num in 5" :key="num">★</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { IObject } from '@/types/interface'
  import { ref, computed, defineProps, defineEmits } from 'vue'
  const props = defineProps({
    modelValue: Number,
    theme: {type: String, default: 'orange'}
  })
  const emits = defineEmits(['update:modelValue'])
  const themeObj: IObject = {
    'black': '#00',
    'white': '#fff',
    'red': '#f5222d',
    'orange': '#fa541c',
    'yellow': '#fadb14',
    'green': '#73d13d',
    'blue': '#40a9ff',
  }

  const fontStyle = computed(() => {
    return `color:${themeObj[props.theme]}`;
  })

  const width = ref(props.modelValue)
  function mouseOut() {
    width.value = props.modelValue
  }

  function mouseOver(i: number) {
    width.value = i
  }

  function onRate(num: number) {
    emits('update:modelValue', num)
  }

  const fontWidth = computed(() => {
    return `width:${width.value}em`
  })
</script>

<style scoped>
.rate {
  position: relative;
  display: inline-block;
}
.rate > span.hollow {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>