<template>
  <SearchForm
    :search="search"
    :reset="reset"
    :columns="searchColumns"
    :searchParam="searchParam"
  ></SearchForm>
  <div class="card table-main">
    <div class="table-header">
      <div class="header-button-lf">
        <slot name="tableHeader" />
      </div>
      <div class="header-button-ri">
        <el-button :icon="Refresh" circle></el-button>
        <el-button :icon="Printer" circle v-if="columns.length"></el-button>
        <el-button :icon="Operation" circle v-if="columns.length"></el-button>
        <el-button :icon="Search" circle v-if="searchParam.length"></el-button>
      </div>
    </div>
    <el-table
      v-bind="$attr"
      :data="tableData"
    >
      <slot></slot>
      <template v-for="item in tableColumns" :key="item">
        <el-table-column
          v-bind="item"
          :align="item.align ?? 'center'"
          v-if="item.type == 'selection' || item.type == 'index'"
        >
        </el-table-column>
        <el-table-column v-if="item.type == 'expand'" v-bind="item" :align="item.align ?? 'center'" v-slot="scope">
					<component :is="item.render" :row="scope.row" v-if="item.render"> </component>
					<slot :name="item.type" :row="scope.row" v-else></slot>
				</el-table-column>
        <TableColumn v-if="!item.type && item.prop && item.isShow" :column="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" :row="scope.row"></slot>
          </template>
        </TableColumn>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts" name="ProTable">
import { ref, provide } from 'vue';
import { TableProps } from 'element-plus';
import { ColumnProps } from './interface/index'
import { useTable } from '@/hooks/useTable'
import SearchForm from '../SearchForm/index.vue'
import TableColumn from './components/TableColumn.vue'
import { handleProp } from "@/utils/util";
import { Refresh, Printer, Operation, Search } from "@element-plus/icons-vue";

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
  useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback);

const tableColumns = ref<ColumnProps[]>(props.columns);
const enumMap = ref(new Map<string, { [key: string]: any }>())
provide("enumMap", enumMap);
const setEnumMap = async(col: ColumnProps) => {
  if (!col.enum) return;
  if (typeof col.enum !== 'function') return enumMap.value.set(col.prop!, col.enum!);
  const {data} = await col.enum();
  enumMap.value.set(col.prop!, data);
}
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
  columns.forEach(col => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
    col.isShow = col.isShow ?? true;
    flatArr.push(col);
    setEnumMap(col)
  });
  return flatArr.filter(item => !item._children?.length);
}

const flatColumns = ref<ColumnProps[]>();
flatColumns.value = flatColumnsFunc(tableColumns.value)
// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter(item => item.search?.el)
searchColumns.forEach((column, index) => {
  if (column.search?.defaultValue !== undefined && column.search?.defaultValue !== null) {
    searchInitParam.value[column.search.key ?? handleProp(column.prop!)] = column.search?.defaultValue;
  }
})
</script>

<style lang="scss" scoped>

</style>