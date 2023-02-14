<template>
  <SearchForm
    :search="search"
    :reset="reset"
    :columns="columns"
    :searchParam="searchParam"
  ></SearchForm>
</template>

<script setup lang="ts">
import { TableProps } from 'element-plus';
import { ColumnProps } from './interface/index'
import { useTable } from '@/hooks/useTable'
import SearchForm from '../SearchForm/index.vue'

interface ProTableProps extends Partial<Omit<TableProps<any>, "data">> {
  columns: ColumnProps[];
  requestApi: (params: any) => Promise<any>;
  dataCallback?: (data: any) => any;
  title?: string;
  initParam?: any;
  pagination?: boolean;
  toolButton?: boolean;
  border?: boolean;
  selectId?: string;
}

const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  pagination: true,
  initParam: {},
  border: true,
  toolButton: true,
  selectId: "id"
})

const { tableData, pageable, searchParam, searchInitParam, getTableList, search, reset, handleCurrentChange, handleSizeChange } =
  useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback)
</script>

<style lang="scss" scoped>

</style>