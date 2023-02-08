<template>
  <component :is="LayoutComponents[themeConfig.layout]" />
  <ThemeDrawer />
</template>

<script setup lang="ts">
  import { computed, type Component } from 'vue'
  import { GlobalStore } from '@/stores/index'
  import LayoutVertical from './LayoutVertical/index.vue'
  import ThemeDrawer from './components/ThemeDrawer/index.vue'

  const LayoutComponents: {[key: string]: Component} = {
    vertical: LayoutVertical
  }
  const globalStore = GlobalStore()
  const themeConfig = computed(() => globalStore.themeConfig)
</script>

<style scoped>

</style>