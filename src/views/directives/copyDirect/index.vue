<template>
  <div>
    <el-button v-copy="data">复制</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const data = ref<string>("我是被复制的内容 🍒 🍉 🍊111")
</script>

<style lang="scss" scoped>

</style>