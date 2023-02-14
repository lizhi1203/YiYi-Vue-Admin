<template>
  <div class="card table-search" v-if="columns.length">
    <el-form ref="formRef" :model="searchParam">
      <template v-for="(item, index) in columns" :key="index">
        <el-form-item :label="`${item.label}:`">
          <SearchFormItem :column="item" :searchParam="searchParam" />
        </el-form-item>
      </template>
      <div class="operation">
        <el-button type="primary" :icon="Search" @click="search">搜索</el-button>
        <el-button :icon="Delete" @click="reset">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="SearchForm">
import SearchFormItem from './components/SearchFormItem.vue'
import { ColumnProps } from '../ProTable/interface/index'

interface PropTableProps {
  columns?: ColumnProps[];
  searchParam?: { [key: string]: any },
  search: (params: any) => void;
  reset: (params: any) => void;
}

const props = withDefaults(defineProps<PropTableProps>(), {
  columns: () => [],
  searchParam: () => ({})
});

</script>

<style scoped>

</style>