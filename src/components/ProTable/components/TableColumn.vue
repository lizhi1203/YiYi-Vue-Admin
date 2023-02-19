<template>
  <component :is="renderLoop(column)"></component>
</template>

<script lang="tsx" setup name="TableColumn">
import { useSlots } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";

defineProps<{ column: ColumnProps }>();

const slots = useSlots();

const renderLoop = (item: ColumnProps) => {
  return (
    <>
      {item.isShow && (
        <el-table-column
          {...item}
          align={item.align ?? 'center'}
          showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== 'operation'}
        >
          {{
            default: (scope: any) => {
              if (item._children) return item._children.map(child => renderLoop(child));
              if (item.render) return item.render(scope);
              if (slots[item.prop!]) return slots[item.prop!]!(scope);
              return scope.row.prop;
            },
            header: () => {
              if (item.headerRender) return item.headerRender(item);
              if (slots[`${item.prop}Header`]) return slots[`${item.prop}Header`]!({ row: item });
              return item.label;
            }
          }}
        </el-table-column>
      )}
    </>
  )
}
</script>

<style lang="scss" scoped>

</style>