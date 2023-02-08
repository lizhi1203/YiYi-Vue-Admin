<template>
  <div>
    <el-row>
      <el-button type="primary" :icon="CirclePlus" v-auth="['add', 'edit', 'delete', 'import', 'export']">新增</el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="authButton">
  import { CirclePlus } from "@element-plus/icons-vue"
</script>

<style lang="scss" scoped>

</style>