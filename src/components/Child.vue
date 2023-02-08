<template>
  <div class="child">
  <h3>我是Child组件</h3>
  {{ sum }}
 </div>
</template>

<script lang="ts">
  import {ref} from 'vue'
  export default {
    name: 'Child',
    async setup() {
      const sum = ref(0)
      const p = new Promise((resolve) => {
        setTimeout(() => {
          resolve({sum})
        }, 3000)
      })
      return await p;
    }
  }
</script>

<style>
.child { background-color: skyblue; padding: 10px; }
</style>