<template>
  <el-container class="layout">
    <el-aside>
      <el-menu
        :default-active="activeMenu"
        :router="false"
        :collapse="isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        background-color="#191a20"
        text-color="#bdbdc0"
        active-text-color="#ffffff"
      >
        <SubMenu :menuList="menuList" />
      </el-menu>
    </el-aside>
    <el-container>
      <Main />
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { AuthStore } from '@/stores/modules/auth'
  import SubMenu from '../components/Menu/SubMenu.vue'
  import Main from '../components/Main/index.vue'

  const authStore = AuthStore()
  const route = useRoute()
  const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
  const isCollapse = ref(false)
  const menuList = computed(() => authStore.showMenuListGet)
</script>
<style lang="scss" scoped>
.layout {
  .el-header {
    padding: 0;
  }
  .el-footer,
  .el-main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-header,
  .el-footer {
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
    text-align: center;
  }

  .el-aside {
    background-color: var(--el-color-primary-light-8);
    color: var(--el-text-color-primary);
    text-align: center;
  }

  .el-main {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-text-color-primary);
    text-align: center;
    height: calc(100vh - 60px);
  }
}
</style>