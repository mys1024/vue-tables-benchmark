# 一些 Vue 表格库的性能测试

## 说明

表格是一种常用的数据展示形式。本文从加载速度、滚动流畅度、内存分配量这三个角度对一些 Vue 的表格库的性能进行了测试。

以下是表格名的释义：

- **none**: 未使用任何表格来展示数据，此项下的内存分配量可看作本测试的 Web 页面 + 数据的内存使用量

- **native**: 直接使用原生的 `<table>`、`<tr>`、`<td>` 等标签来构建表格

- **ant-design-vue**: 使用 ant-design-vue 的 Table 组件

- **element-plus**: 使用 element-plus 的 ElTable 组件

- **element-plus-v2**: 使用 element-plus 的 ElTableV2 组件

- **vxe-table**: 使用 vxe-table 的 VxeTable 组件

- **vueuse**: 使用 @vueuse/core 的 useVirtualList 函数提供虚拟滚动，并搭配原生的 `<table>`、`<tr>`、`<td>` 等标签来构建表格

- **surely-vue**: 使用 @surely-vue/table 的默认导出组件

## 测试环境

- CPU: Intel Core i5-12400
- GPU: NVIDIA GeForce GT730
- RAM: 32 GB
- OS: Windows 10 19044.2604
- Browser: Microsoft Edge 110.0.1587.57

## 依赖库版本

- vue: ^3.2.45
- ant-design-vue: ^3.2.15
- element-plus: ^2.2.32
- vxe-table: ^4.3.10
- @vueuse/core: ^9.6.0
- @surely-vue/table: ^3.0.0

## 测试结果

### 测试1：1000 行 10 列

| 对比项\表格名 | none | native | ant-design-vue | element-plus | element-plus-v2 | vxe-table | vueuse | surely-vue |
| - | - | - | - | - | - | - | - | - |
| 加载速度 | N/A | 快 | 较慢 | 较慢 | 快 | 快 | 快 | 快 |
| 滚动流畅度 | N/A | 流畅 | 流畅 | 流畅 | 流畅 | 流畅 | 流畅 | 流畅 |
| 加载后的内存分配 | 36MB | 44MB | 203MB | 76MB | 44MB | 45MB | 36MB | 45MB |
| 快速来回滚动 5 次后的内存分配 | N/A | 44MB | 204MB | 76MB | 86MB | 47MB | 39MB | 72MB |

### 测试2：10000 行 10 列

| 对比项\表格名 | none | native | ant-design-vue | element-plus | element-plus-v2 | vxe-table | vueuse | surely-vue |
| - | - | - | - | - | - | - | - | - |
| 加载速度 | N/A | 非常慢 | 卡死 | 非常慢 | 快 | 快 | 快 | 快 |
| 滚动流畅度 | N/A | 较卡 | N/A | 卡顿 | 流畅 | 流畅 | 流畅 | 流畅 |
| 加载后的内存分配 | 46MB | 129MB | N/A | 257MB | 47MB | 48MB | 46MB | 51MB |
| 快速来回滚动 5 次后的内存分配 | N/A | 227MB | N/A | 302MB | 92MB | 50MB | 46MB | 91MB |

### 测试3：100000 行 10 列

| 对比项\表格名 | none | native | ant-design-vue | element-plus | element-plus-v2 | vxe-table | vueuse | surely-vue |
| - | - | - | - | - | - | - | - | - |
| 加载速度 | N/A | 卡死 | 卡死 | 卡死 | 快 | 快 | 快 | 快 |
| 滚动流畅度 | N/A | N/A | N/A | N/A | 流畅 | 流畅 | 流畅 | 流畅 |
| 加载后的内存分配 | 90MB | N/A | N/A | N/A | 92MB | 114MB | 87MB | 139MB |
| 快速来回滚动 5 次后的内存分配 | N/A | N/A | N/A | N/A | 145MB | 120MB | 95MB | 169MB |

### 测试4：100000 行 100 列

| 对比项\表格名 | none | native | ant-design-vue | element-plus | element-plus-v2 | vxe-table | vueuse | surely-vue |
| - | - | - | - | - | - | - | - | - |
| 加载速度 | N/A | 卡死 | 卡死 | 卡死 | 快 | 普通 | 快 | 快 |
| 滚动流畅度 | N/A | N/A | N/A | N/A | 卡顿 | 流畅 | 流畅 | 流畅 |
| 加载后的内存分配 | 777MB | N/A | N/A | N/A | 802MB | 806MB | 779MB | 829MB |
| 快速来回滚动 5 次后的内存分配 | N/A | N/A | N/A | N/A | 1092MB | 824MB | 835MB | 893MB |

### 测试5：1000000 行 10 列

| 对比项\表格名 | none | native | ant-design-vue | element-plus | element-plus-v2 | vxe-table | vueuse | surely-vue |
| - | - | - | - | - | - | - | - | - |
| 加载速度 | N/A | 卡死 | 卡死 | 卡死 | 快 | 慢 | 快 | 慢 |
| 滚动流畅度 | N/A | N/A | N/A | N/A | 流畅 | 流畅 | 流畅 | 流畅 |
| 加载后的内存分配 | 742MB | N/A | N/A | N/A | 746MB | 921MB | 742MB | 1165MB |
| 快速来回滚动 5 次后的内存分配 | N/A | N/A | N/A | N/A | 842MB | 943MB | 751MB | 1211MB |

## 结论

只有 **element-plus-v2**、**vxe-table**、**vueuse**、**surely-vue** 这四个使用了虚拟滚动技术的表格能不卡死地通过了所有的测试。

**element-plus-v2** 中使用的 ElTableV2 组件是 element-plus 的一个仍在测试中的新组件。在本测试中发现其存在着快速滚动时内存分配增长较多、列数过多时卡顿、滚动感生硬的问题。

**vueuse** 中使用的 useVirtualList 是一个渲染虚拟列表的函数。从测试结果看，useVirtualList 的性能表现很优秀，但如果需要丰富的表格功能，还需要自行实现。

**vxe-table** 在滚动流畅度和内存上表现不错。但在加载大量行数的情况下，加载速度较慢。且可视区域的行数越多，在滚动时渲染新行的速度越慢，此时未渲染的新行会形成白屏。

**surely-vue** 的滚动流畅度也不错，且滚动时不会出现白屏，但在内存上的表现逊于 vxe-table。

## 测试页面与代码

本测试的页面：[https://mys1024.github.io/vue-tables-benchmark/](https://mys1024.github.io/vue-tables-benchmark/)

本测试的代码：[https://github.com/mys1024/vue-tables-benchmark](https://github.com/mys1024/vue-tables-benchmark)
