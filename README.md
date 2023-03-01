# 一些 Vue 表格库的性能测试

## 说明

表格是一种常用的数据展示形式。本文从加载速度、滚动流畅度、内存分配量这三个角度对一些表格库的性能进行了测试。

以下是测试中的表格名的释义：

- **none**: 未使用任何表格来展示数据，此项下的内存分配量可看作本测试的 Web 页面 + 数据的内存使用量

- **native**: 直接使用原生的 `<table>`、`<tr>`、`<td>` 等标签构建表格

- **ant-design-vue**: 使用 ant-design-vue 的 Table 组件

- **element-plus**: 使用 element-plus 的 ElTable 组件

- **element-plus-v2**: 使用 element-plus 的 ElTableV2 组件

- **vxe-table**: 使用 vxe-table 的 VxeTable 组件

- **vueuse**: 使用 @vueuse/core 的 useVirtualList 函数提供虚拟滚动，并搭配原生的 `<table>`、`<tr>`、`<td>` 等标签构建表格

## 测试环境

- CPU: Intel Core i5-12400
- GPU: Intel UHD Graphics 730
- RAM: 32 GB
- OS: Windows 10 19044.2604
- Browser: Microsoft Edge 110.0.1587.57

## 依赖库版本

- vue: ^3.2.45
- ant-design-vue: ^3.2.15
- element-plus: ^2.2.32
- vxe-table: ^4.3.10
- @vueuse/core: ^9.6.0

## 测试结果

### 测试1：1000 行 10 列

| 对比项\表格名 | none | native | ant-design-vue | element-plus | element-plus-v2 | vxe-table | vueuse |
| - | - | - | - | - | - | - | - |
| 加载速度 | N/A | 快 | 较慢 | 较慢 | 快 | 快 | 快 |
| 滚动流畅度 | N/A | 流畅 | 流畅 | 流畅 | 流畅 | 流畅 | 流畅 |
| 加载后的内存分配 | 36MB | 47MB | 206MB | 85MB | 45MB | 45MB | 36MB |
| 滚动时的内存分配 | N/A | 48MB | 208MB | 85MB | 520MB | 49MB | 47MB |

备注：在快速滚动时，element-plus-v2 使用非常多的内存。

### 测试2：10000 行 10 列

| 对比项\表格名 | none | native | ant-design-vue | element-plus | element-plus-v2 | vxe-table | vueuse |
| - | - | - | - | - | - | - | - |
| 加载速度 | N/A | 非常慢 | 出现无响应 | 非常慢 | 快 | 快 | 快 |
| 滚动流畅度 | N/A | 较卡 | 卡顿 | 卡顿 | 流畅 | 流畅 | 流畅 |
| 加载后的内存分配 | 46MB | 250MB | 1577MB | 257MB | 47MB | 48MB | 47MB |
| 滚动时的内存分配 | N/A | 250MB | 1601MB | 257MB | 971MB | 58MB | 63MB |

### 测试3：100000 行 10 列

| 对比项\表格名 | none | native | ant-design-vue | element-plus | element-plus-v2 | vxe-table | vueuse |
| - | - | - | - | - | - | - | - |
| 加载速度 | N/A | 卡死 | 卡死 | 卡死 | 快 | 快 | 快 |
| 滚动流畅度 | N/A | N/A | N/A | N/A | 流畅 | 流畅 | 流畅 |
| 加载后的内存分配 | 87MB | N/A | N/A | N/A | 92MB | 116MB | 87MB |
| 滚动时的内存分配 | N/A | N/A | N/A | N/A | 1114MB | 131MB | 112MB |

### 测试4：100000 行 100 列

| 对比项\表格名 | none | native | ant-design-vue | element-plus | element-plus-v2 | vxe-table | vueuse |
| - | - | - | - | - | - | - | - |
| 加载速度 | N/A | 卡死 | 卡死 | 卡死 | 快 | 普通 | 快 |
| 滚动流畅度 | N/A | N/A | N/A | N/A | 卡顿 | 流畅 | 流畅 |
| 加载后的内存分配 | 777MB | N/A | N/A | N/A | 804MB | 817MB | 779MB |
| 滚动时的内存分配 | N/A | N/A | N/A | N/A | 2284MB | 869MB | 911MB |

### 测试5：1000000 行 10 列

| 对比项\表格名 | none | native | ant-design-vue | element-plus | element-plus-v2 | vxe-table | vueuse |
| - | - | - | - | - | - | - | - |
| 加载速度 | N/A | 卡死 | 卡死 | 卡死 | 快 | 慢 | 快 |
| 滚动流畅度 | N/A | N/A | N/A | N/A | 流畅 | 流畅 | 流畅 |
| 加载后的内存分配 | 722MB | N/A | N/A | N/A | 721MB | 911MB | 723MB |
| 滚动时的内存分配 | N/A | N/A | N/A | N/A | 1912MB | 905MB | 753MB |

## 结论

只有 **element-plus-v2**、**vxe-table**、**vueuse** 这三个使用了虚拟滚动技术的表格能不卡死地通过了所有的测试。

在 **element-plus-v2** 中使用的 ElTableV2 组件是 element-plus 的一个仍在测试中的新组件，并存在着快速滚动时内存分配量激增、列数过多时卡顿的问题。

在 ****vueuse**** 中使用的 useVirtualList 是工具库 @vueuse/core 提供的一个用于渲染虚拟列表的函数。从测试结果看，useVirtualList 的性能表现很优秀，但如果你需要一个功能丰富的表格组件，那么你需要做大量的开发与封装。

综合来看，vxe-table 的 VxeTable 组件是本文的测试中最“拿来就能用”的表格了。

## 测试页面与代码

本测试的页面：TBD

本测试的代码：[https://github.com/mys1024/vue-tables-benchmark](https://github.com/mys1024/vue-tables-benchmark)
