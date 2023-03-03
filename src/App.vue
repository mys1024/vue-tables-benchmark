<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useMemory, useVirtualList } from '@vueuse/core'
import { Table as AntdTable } from 'ant-design-vue'
import { ElAutoResizer, ElTable, ElTableColumn, ElTableV2 } from 'element-plus'
import { VxeColumn, VxeTable } from 'vxe-table'

import 'ant-design-vue/dist/antd.css'
import 'vxe-table/lib/vxe-table/style/style.css'
import 'vxe-table/lib/vxe-column/style/style.css'
import 'element-plus/dist/index.css'

import type { TableName } from '~/types'
import TableSelector from '~/components/TableSelector.vue'

const { memory } = useMemory()

const activeTable = ref<TableName>('none')
const colCount = ref(10)
const rowCount = ref(1000)
const cols = computed(() => Array.from(new Array(colCount.value)).map((_, i) => ({
  title: `col${i}`,
  dataIndex: `col${i}`,
  key: `col${i}`,
  dataKey: `col${i}`,
  width: 120,
})))
const rows = computed(() => {
  const _rows: Record<string, string>[] = new Array(rowCount.value)
  for (let i = 0; i < rowCount.value; i++) {
    const _row: Record<string, string> = {}
    _row.key = i.toString()
    for (let j = 0; j < colCount.value; j++)
      _row[cols.value[j].dataIndex] = `row${i}_col${j}`
    _rows[i] = _row
  }
  return _rows
})

const { list: vueuseRows, containerProps, wrapperProps } = useVirtualList(
  rows,
  {
    itemHeight: 24,
  },
)

function friendlySize(byteCount: number) {
  const b = byteCount
  if (b < 1024)
    return `${b.toFixed(2)}B`
  const kb = b / 1024
  if (kb < 1024)
    return `${kb.toFixed(2)}KB`
  const mb = kb / 1024
  return `${mb.toFixed(2)}MB`
}
</script>

<template>
  <div p-8 space-y-8>
    <div v-if="memory" space-x-8>
      <span>内存限制: {{ friendlySize(memory.jsHeapSizeLimit) }}</span>
      <span>已分配内存: {{ friendlySize(memory.totalJSHeapSize) }}</span>
      <span>已使用内存: {{ friendlySize(memory.usedJSHeapSize) }}</span>
      <span>当前表格：{{ activeTable }}</span>
    </div>
    <div space-x-8>
      <span>
        <label>行数：</label>
        <input v-model="rowCount" type="number" pl-2 border outline-none>
      </span>
      <span>
        <label>列数：</label>
        <input v-model="colCount" type="number" pl-2 border outline-none>
      </span>
      <span>
        <label>切换表格：</label>
        <TableSelector v-model:active-table="activeTable" />
      </span>
    </div>
    <!-- 确保 activeTable === 'none' 时触发 computed -->
    <div :style="{ display: 'none' }">
      {{ rows.length }} {{ cols.length }}
    </div>
    <!-- native -->
    <div v-if="activeTable === 'native'" h-600px overflow-auto>
      <table>
        <tr>
          <th v-for="col, i in cols" :key="i" px-1 border>
            {{ col.dataIndex }}
          </th>
        </tr>
        <tr v-for="row, i in rows" :key="i">
          <td v-for="col, j in cols" :key="j" px-1 border>
            {{ row[col.dataIndex] }}
          </td>
        </tr>
      </table>
    </div>
    <!-- ant-design-vue -->
    <AntdTable
      v-if="activeTable === 'ant-design-vue'"
      :columns="cols"
      :data-source="rows"
      :scroll="{ y: 600 }"
      :bordered="true"
      :pagination="false"
      size="small"
    />
    <!-- vxe-table -->
    <VxeTable
      v-if="activeTable === 'vxe-table'"
      :data="rows"
      :max-height="600"
      :row-config="{ height: 24 }"
      :border="true"
      show-header-overflow="ellipsis"
      show-overflow="ellipsis"
    >
      <VxeColumn
        v-for="col, i in cols" :key="i"
        :field="col.dataIndex"
        :title="col.title"
        :width="col.width"
      />
    </VxeTable>
    <!-- element-plus -->
    <ElTable
      v-if="activeTable === 'element-plus'"
      :data="rows"
      :border="true"
      :max-height="600"
    >
      <ElTableColumn
        v-for="col, i in cols" :key="i"
        :prop="col.dataIndex"
        :label="col.title"
        :width="col.width"
      />
    </ElTable>
    <!-- surely-vue -->
    <STable
      v-if="activeTable === 'surely-vue'"
      :columns="cols"
      :data-source="rows"
      :scroll="{ y: 600 }"
      :pagination="false"
      :row-height="24"
      :bordered="true"
    />
    <!-- vueuse -->
    <div
      v-if="activeTable === 'vueuse'"
      v-bind="containerProps"
      h-600px
    >
      <table>
        <div v-bind="wrapperProps">
          <tr h-24px>
            <th v-for="col, i in cols" :key="i" px-1 border>
              {{ col.dataIndex }}
            </th>
          </tr>
          <tr
            v-for="row, i in vueuseRows" :key="i"
            h-24px
          >
            <td v-for="col, j in cols" :key="j" px-1 border>
              {{ row.data[col.dataIndex] }}
            </td>
          </tr>
        </div>
      </table>
    </div>
    <!-- element-plus-v2 -->
    <div v-if="activeTable === 'element-plus-v2'" h-600px>
      <ElAutoResizer>
        <template #default="{ width, height }">
          <ElTableV2
            :data="rows"
            :width="width"
            :height="height"
            :border="true"
            :row-height="24"
            :columns="cols"
            :fixed="true"
          />
        </template>
      </ElAutoResizer>
    </div>
  </div>
</template>
