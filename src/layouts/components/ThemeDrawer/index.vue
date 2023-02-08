<template>
  <div>

  </div>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue'
  import { GlobalStore } from '@/stores/index'

  const globalStore = GlobalStore()
  const themeConfig = computed(() => globalStore.themeConfig)

  // 监听布局变化，在 body 上添加相对应的 layout class
  watch(
    // 监听对象的某个属性
    () => themeConfig.value.layout,
    () => {
      const body = document.body as HTMLElement
      body.setAttribute('class', themeConfig.value.layout)
    },
    { immediate: true }
  )
</script>

<style scoped>
</style>