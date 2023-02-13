<template>
  <component
    v-if="column.search?.el"
    :is="`el-${column.search.el}`"
    v-bind="handleSearchProps"
    v-model="searchParam[column.search.key ?? handleProp(column.prop!)]"
    :data="column.search?.el === 'tree-select' ? columnEnum : []"
    :options="['cascader', 'select-v2'].includes(column.search?.el) ? columnEnum : []"
    :placeholder="placeholder"
    :clearable="clearable"
    range-separator="至"
    start-placeholder="开始时间"
		end-placeholder="结束时间"
  >
    <template #default="{ data }" v-if="column.search?.el === 'cascader'">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="column.search?.el=== 'select'">
      <component
        :is="`el-option`"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      >
      </component>
    </template>
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts" name="SearchFormItem">
import { computed } from 'vue'
import { handleProp } from '@/utils/util'
import { ColumnProps } from '@/components/ProTable/interface/index'
interface SearchFormItem {
  column: ColumnProps;
  searchParam: { [key: string]: any }
}

const props = defineProps<SearchFormItem>();

const fieldNames = computed(() => {
  return  {
    label: props.column.fieldNames?.label ?? 'label',
    value: props.column.fieldNames?.value ?? 'value'
  }
})

const handleSearchProps = computed(() => {
  const label = fieldNames.value.label;
  const value = fieldNames.value.value;
  const searchEl = props.column.search?.el;
	const searchProps = props.column.search?.props ?? {};
  let handleProps = searchProps;
  if (searchEl === "tree-select") handleProps = { ...searchProps, props: { label, ...searchProps.props }, nodeKey: value };
  if (searchEl === "cascader") handleProps = { ...searchProps, props: { label, value, ...searchProps.props } };
  return handleProps;
})

const columnEnum = computed(() => {
  return [];
})

const placeholder = computed(() => {
  const search = props.column.search;
	return search?.props?.placeholder ?? (search?.el === "input" ? "请输入" : "请选择");
})

const clearable = computed(() => {
  const search = props.column.search;
  return search?.props?.clearable ?? (search?.defaultValue == null || search?.defaultValue == undefined)
})
</script>

<style scoped>

</style>