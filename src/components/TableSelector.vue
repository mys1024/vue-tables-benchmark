<script setup lang="ts">
import type { TableName } from '~/types'

const props = defineProps<{
  activeTable: TableName
}>()
const emits = defineEmits<{
  (e: 'update:activeTable', val: TableName): void
}>()
</script>

<template>
  <span space-x-2>
    <button
      px-2 text-white rounded transition
      :class="{
        'bg-gray hover:bg-sky': props.activeTable !== 'none',
        'bg-sky-5': props.activeTable === 'none',
      }"
      @click="emits('update:activeTable', 'none')"
    >
      none
    </button>
    <button
      px-2 text-white rounded transition
      :class="{
        'bg-gray hover:bg-sky': props.activeTable !== 'native',
        'bg-sky-5': props.activeTable === 'native',
      }"
      @click="emits('update:activeTable', 'native')"
    >
      native
    </button>
    <button
      px-2 text-white rounded transition
      :class="{
        'bg-gray hover:bg-sky': props.activeTable !== 'ant-design-vue',
        'bg-sky-5': props.activeTable === 'ant-design-vue',
      }"
      @click="emits('update:activeTable', 'ant-design-vue')"
    >
      ant-design-vue
    </button>
    <button
      px-2 text-white rounded transition
      :class="{
        'bg-gray hover:bg-sky': props.activeTable !== 'element-plus',
        'bg-sky-5': props.activeTable === 'element-plus',
      }"
      @click="emits('update:activeTable', 'element-plus')"
    >
      element-plus
    </button>
    <button
      px-2 text-white rounded transition
      :class="{
        'bg-gray hover:bg-sky': props.activeTable !== 'element-plus-v2',
        'bg-sky-5': props.activeTable === 'element-plus-v2',
      }"
      @click="emits('update:activeTable', 'element-plus-v2')"
    >
      element-plus-v2
    </button>
    <button
      px-2 text-white rounded transition
      :class="{
        'bg-gray hover:bg-sky': props.activeTable !== 'vxe-table',
        'bg-sky-5': props.activeTable === 'vxe-table',
      }"
      @click="emits('update:activeTable', 'vxe-table')"
    >
      vxe-table
    </button>
    <button
      px-2 text-white rounded transition
      :class="{
        'bg-gray hover:bg-sky': props.activeTable !== 'vueuse',
        'bg-sky-5': props.activeTable === 'vueuse',
      }"
      @click="emits('update:activeTable', 'vueuse')"
    >
      vueuse
    </button>
    <button
      px-2 text-white rounded transition
      :class="{
        'bg-gray hover:bg-sky': props.activeTable !== 'surely-vue',
        'bg-sky-5': props.activeTable === 'surely-vue',
      }"
      @click="emits('update:activeTable', 'surely-vue')"
    >
      surely-vue
    </button>
    <button
      px-2 text-white rounded transition
      :class="{
        'bg-gray hover:bg-sky': props.activeTable !== 'vue-vgrid',
        'bg-sky-5': props.activeTable === 'vue-vgrid',
      }"
      @click="emits('update:activeTable', 'vue-vgrid')"
    >
      vue-vgrid
    </button>
  </span>
</template>
