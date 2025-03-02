import { Table } from "./interface"
import { reactive, computed, onMounted, toRefs } from "vue"

export const useTable = (
  api: (params: any) => Promise<any>,
  initParam: object = {},
  isPageable: boolean = true,
  dataCallback?: (data: any) => any
) => {
  const state = reactive<Table.TableStateProps>({
    tableData: [],
    pageable: {
      pageNum: 1,
      pageSize: 10,
      total: 0
    },
    searchParam: {},
    // 设置搜索表单项的默认值
    searchInitParam: {},
    totalParam: {}
  });

  const pageParam = computed({
    get: () => {
      return {
        pageNum: state.pageable.pageNum,
        pageSize: state.pageable.pageSize
      }
    },
    set: (newVal: any) => {

    }
  });

  onMounted(() => {
    reset();
  })

  const search = () => {
    state.pageable.pageNum = 1;
    updatedTotalParam();
    getTableList();
  }

  const reset = () => {
    state.pageable.pageNum = 1;
    state.searchParam = {};
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    Object.keys(state.searchInitParam).forEach(key => {
      state.searchParam[key] = state.searchInitParam[key]
    })
    updatedTotalParam()
    getTableList()
  }

  const updatedTotalParam = () => {
    state.totalParam = {}
    let nowSearchParam: {[key: string]: any} = {}
    for (let key in state.searchParam) {
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
        nowSearchParam[key] = state.searchParam[key]
      }
    }
    Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {})
  }

  const getTableList = async() => {
    try {
      Object.assign(state.totalParam, initParam, isPageable ? pageParam.value : {})
      let { data } = await api(state.totalParam)
      dataCallback && ( data = dataCallback(data))
      state.tableData = isPageable ? data.list : data;
      const { pageNum, pageSize, total } = data
      isPageable && updatePageable({ pageNum, pageSize, total })
    } catch(error) {
      console.log(error)
    }
  }

  const updatePageable = (resPageable: Table.Pageable) => {
    Object.assign(state.pageable, resPageable)
  }

  const handleCurrentChange = (val: number) => {
    state.pageable.pageNum = val;
    getTableList()
  }

  const handleSizeChange = (val: number) => {
    state.pageable.pageNum = 1;
    state.pageable.pageSize = val;
    getTableList()
  }

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleCurrentChange,
    handleSizeChange
  }
}