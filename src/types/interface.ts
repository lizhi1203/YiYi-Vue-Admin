export interface IFunction<T = any> {
  (x?: any): T;
}

export interface IObject<T = any> {
  [key: string]: T;
}

export interface IHttpResponse extends IObject {
  code: number;
  msg: string;
  data: any;
}

export interface IViewHooksOptions {
  createdIsNeed?: boolean;
  activatedIsNeed?: boolean;
  getDataListURL?: string;
  getDataListIsPage?: boolean;
  deleteURL?: string;
  deleteIsBatch?: boolean;
  deleteIsBatchKey?: string;
  exportURL?: string;
  dataForm?: IObject;
  dataList?: IObject[];
  order?: string;
  orderField?: string;
  page?: number;
  limit?: number;
  total?: number;
  dataListLoading?: boolean;
  dataListSelections?: IObject[];
  addOrUpdateVisible?: boolean;
  addOrUpdate?: IObject;
  elTable?: IObject;
}

export interface IViewHooks extends IViewHooksOptions, IObject {
  hasPermission: (key: string) => void;
  getDictLabel: (dictType: string, dictValue: number) => number | string;
  query: () => void;
  dataListSelectionChangeHandle: (list: IObject[]) => void;
  dataListSortChangeHandle: (sort: IObject) => void;
  pageSizeChangeHandle: (pageSize: number) => void;
  pageCurrentChangeHandle: (pageIndex: number) => void;
  getDataList: () => void;
  addHandle: (row: IObject) => void;
  addOrUpdateHandle: (id?: string) => void;
  deleteHandle: (id?: string, pid?: string) => Promise<any>;
  exportHandle: () => void;
}
