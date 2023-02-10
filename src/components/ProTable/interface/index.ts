import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

export interface EnumProps {
  label: string;
  value: any;
  disabled?: boolean;
  tagType?: string;
  children?: EnumProps[];
  [key: string]: any;
}

export type SearchType = 
  | "input"
  | "input-number"
  | "select"
  | "select-v2"
  | "tree-select"
  | "cascader"
  | "date-picker"
  | "time-picker"
  | "time-select"
  | "switch"
	| "slider";

export interface SearchProps {
  el: SearchType;
  props?: any;
  key?: string;
  defaultValue?: string | number | boolean | any[];
}

export interface ColumnProps<T = any> extends Partial<Omit<TableColumnCtx<T>, "children" | "renderHeader" | "renderCell">> {
  tag?: boolean;
  isShow?: boolean;
  search?: SearchType | undefined;
  enum?: EnumProps | ((params?: any) => Promise<any>);
  isFilterEnum?: boolean;
  fieldNames?: { label: string; value: string };
  headerRender?: (row: ColumnProps) => any;
  render?: (scope: { row: T }) => any;
  _children?: ColumnProps<T>[]
}