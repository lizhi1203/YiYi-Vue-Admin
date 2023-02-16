<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="用户列表"
      :columns="columns"
      :requestApi="getTableList"
      :initParam="initParam"
      :dataCallback="dataCallback"
    >
    </ProTable>
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { reactive } from 'vue';
import ProTable from '@/components/ProTable/index.vue';
import { ColumnProps } from '@/components/ProTable/interface/index';
import { ElMessage } from 'element-plus';
import { 
  getUserList,
  getUserGender
} from '@/api/modules/user';

const initParam = reactive({
  type: 1
});

const getTableList = (params: any) => {
  const newParams = JSON.parse(JSON.stringify(params));
  return getUserList(newParams);
}

const dataCallback = (data: any) => {
  return {
    list: data.list,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    total: data.total
  }
}

const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 80 },
  { type: 'index', label: '#', width: 80 },
  { type: 'expand', label: 'Expand', width: 100 },
  {
    prop: 'username',
    label: '用户名',
    search: { el: 'input' },
    render: scope => {
      return (
        <el-button type="primary" link onClick={() => ElMessage.success("我是通过 tsx 语法渲染的内容")}>
          { scope.row.username }
        </el-button>
      )
    }
  },
  {
    prop: 'gender',
    label: '姓别',
    enum: getUserGender,
    search: { el: 'select', props: { filterable: true } },
    fieldNames: { label: 'genderLabel', value: 'genderLabel' }
  },
  { prop: 'user.detail.age', label: '年龄', search: { el: 'input' } },
  { prop: 'idCard', label: '身份证号', search: { el: 'input' } },
  { prop: 'email', label: '邮箱' },
  { prop: 'address', label: '居住地址' }
]
</script>

<style lang="scss" scoped>

</style>