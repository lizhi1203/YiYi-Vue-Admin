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
      <!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<el-button type="primary" :icon="CirclePlus">新增用户</el-button>
				<el-button type="primary" :icon="Upload" plain>批量添加用户</el-button>
				<el-button type="primary" :icon="Download" plain>导出用户数据</el-button>
				<el-button type="primary" plain>To 子集详情页面</el-button>
				<el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected">
					批量删除用户
				</el-button>
			</template>
			<!-- Expand -->
			<template #expand="scope">
				{{ scope.row }}
			</template>
			<!-- usernameHeader -->
			<template #usernameHeader="scope">
				<el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
					{{ scope.row.label }}
				</el-button>
			</template>
			<!-- createTime -->
			<template #createTime="scope">
				<el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
					{{ scope.row.createTime }}
				</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View">查看</el-button>
				<el-button type="primary" link :icon="EditPen">编辑</el-button>
				<el-button type="primary" link :icon="Refresh">重置密码</el-button>
				<el-button type="primary" link :icon="Delete">删除</el-button>
			</template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { reactive } from 'vue';
import ProTable from '@/components/ProTable/index.vue';
import { ColumnProps } from '@/components/ProTable/interface/index';
import { ElMessage } from 'element-plus';
import { User } from '@/api/interface/index'
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from "@element-plus/icons-vue";

import { 
  getUserList,
  getUserGender,
  getUserStatus
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

// 定义表格配置项(如果该列可搜索，指定列的search配置el字段指定搜索框的类型)
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
  { prop: 'address', label: '居住地址' },
  {
    prop: 'status',
    label: '用户状态',
    enum: getUserStatus,
    search: { el: 'select', props: { filterable: true } },
    fieldNames: { label: 'userLabel', value: 'userStatus' },
    render: (scope: { row: User.ResUserList }) => {
      return (
        <>
          <el-switch
            model-value={scope.row.status}
            active-text={scope.row.status ? '启用' : '禁用' }
            active-value={1}
            inactive-value={0}
            onClick={() => ElMessage.success('开发中...') }
          >
          </el-switch>
        </>
      )
    }
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 180,
    search: {
      el: 'date-picker',
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss'},
      defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"]
    }
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right',
    width: 330
  }
]
</script>

<style lang="scss" scoped>

</style>