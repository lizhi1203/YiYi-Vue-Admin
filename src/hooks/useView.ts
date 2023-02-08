import baseService from '@/service/baseService';
import { IObject } from '@/types/interface';
import { IViewHooksOptions, IViewHooks } from '@/types/interface';
import { onActivated, onMounted, nextTick } from 'vue';
import app from '@/constants/app'
import qs from 'qs'

const useView = (props: IViewHooksOptions | IObject): any => {
  const defaultOptions: IViewHooksOptions = {
    createdIsNeed: true,
    activatedIsNeed: false,
    getDataListURL: "",
    getDataListIsPage: false,
    deleteURL: "",
    deleteIsBatch: false,
    deleteIsBatchKey: "id",
    exportURL: "",
    dataForm: {},
    dataList: [],
    order: "",
    orderField: "",
    page: 1,
    limit: 10,
    total: 0,
    dataListLoading: false,
    dataListSelections: [],
    addOrUpdateVisible: false,
    addOrUpdate: {},
    elTable: {}
  };
  const mergeDefaultStateToPageState = (options: IObject, props: IObject): IViewHooksOptions => {
    for (const key in options) {
      if (!Object.getOwnPropertyDescriptor(props, key)) {
        props[key] = options[key];
      }
    }
    return props;
  }
  const state = mergeDefaultStateToPageState(defaultOptions, props);

  onMounted(() => {
    if (state.createdIsNeed && !state.activatedIsNeed) {
      viewFns.query();
    }
  })
  onActivated(() => {
    if (state.activatedIsNeed) {
      viewFns.query();
    }
  })
  const viewFns = {
    query() {
      if (!state.getDataListURL) {
        return;
      }
      state.dataListLoading = true;
      baseService
        .get(state.getDataListURL, {
          order: state.order,
          orderField: state.orderField,
          page: state.getDataListIsPage ? state.page : null,
          limit: state.getDataListIsPage ? state.limit : null,
          ...state.dataForm
        })
        .then((res) => {
          state.dataListLoading = false;
          if (res.code !== 0) {
            state.dataList = [];
            state.total = 0;
            return
          }
          state.dataList = state.getDataListIsPage ? res.data.list : res.data;
          state.total = state.getDataListIsPage ? res.data.total : 0;
        })
        .catch(() => {
          state.dataListLoading = false;
        })
    },
    dataListSelectionChangeHandle(val: IObject[]) {
      state.dataListSelections = val;
    },
    dataListSortChangeHandle(data: IObject) {
      if (!data.order || !data.prop) {
        state.order = '';
        state.orderField = '';
        return false;
      }
      state.order = data.order.replace(/ending$/, "");
      state.orderField = data.prop.replace(/(A-Z)/g, '_$1').toLowerCase();
      viewFns.query()
    },
    pageSizeChangeHandle(val: number) {
      state.page = 1;
      state.limit = val;
      viewFns.query();
    },
    pageCurrentChangeHandle(val: number) {
      state.page = val;
      viewFns.query();
    },
    getDataList() {
      state.page = 1;
      viewFns.query();
    },
    addHandle(row: IObject) {
      state.addOrUpdateVisible = true;
      nextTick(() => {
        state.addOrUpdate?.init(row);
      })
    },
    addOrUpdateHandle(id?: string) {
      state.addOrUpdateVisible = true;
      nextTick(() => {
        if (state.addOrUpdate && !state.addOrUpdate.visible) {
          state.addOrUpdate.dataForm.id = id || '';
          state.addOrUpdate?.init();
        }
      })
    },
    deleteHandle(id?: string, pid?: string): Promise<any> {
      return new Promise(resolve => {
        resolve({})
      })
    },
    exportHandle() {
      window.location.href=`${app.api}${state.exportURL}?${qs.stringify({
        ...state.dataForm,
        access_token: '111'
      })}`
    }
  }
  const rejectFns = {

  }

  return {
    ...viewFns,
    ...rejectFns
  };
};

export default useView;