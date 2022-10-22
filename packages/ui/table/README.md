# Table 表格

可容纳多种数据类型的大型数据容器，并可支持多种数据相关和表格属性设置相关的操作，具有强大的统计功能

## 何时使用

当需要管理一定量级的统一结构的数据记录时

当需要对一部分全部数据进行编辑、筛选过滤时

## 特别说明

- 按照 React 的规范，所有的数组组件必须绑定 key。Table 组件的 data 属性的每一列也需要指定一个 key 值来表明每一行数据的唯一性。同时基于综合考虑（性能、维护性、功能间的组合性等），当没有 key 传入的时候，组件内部并不会帮您生成 key。当 key 不存在时可能会引起一系列的问题，还请注意。
- 在进行列冻结时，一定要传入**列宽(width)**！

## Props

| 属性名                | 描述                                                                                                               | 类型                                                      | 可选值                   | 默认值     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ------------------------ | ---------- |
| data                  | 表格数据                                                                                                           | object[]                                                  | -                        | -          |
| fieldKey              | 指定 data 表格数据中某一属性为 key                                                                                 | string                                                    | -                        | 'key'      |
| columns               | 表格列配置信息                                                                                                     | ColumnItem[]                                              | -                        | -          |
| bordered              | 是否显示边框（表头分组模式下，表格自带边框）                                                                       | boolean                                                   | true \| false            | false      |
| sticky                | 是否支持表头吸顶                                                                                                   | boolean                                                   | true \| false            | false      |
| stickyTop             | 表头吸顶距离视口顶部距离                                                                                           | number                                                    | -                        | 0          |
| highlightedColKeys    | 高亮列（受控）                                                                                                     | string[]                                                  | -                        | []         |
| expandedRender        | 表格展开项                                                                                                         | (record: dataItem, index: number) => ReactNode \| Promise | -                        | -          |
| rowExpandable         | 设置是否允许行展开                                                                                                 | (record: dataItem ) => ReactNode \| Boolean               | -                        | true       |
| onExpand              | 表格展开时的回调函数                                                                                               | (expanded, row: object) => void                           | -                        | -          |
| expandedRowKeys       | 内嵌式表格以及树形表格展开的行                                                                                     | number[]                                                  | -                        | -          |
| maxHeight             | 表格最大高度，当穿过该高度时，展示滚动条且表头固定                                                                 | number                                                    | -                        | -          |
| fixedToColumn         | 表格列冻结设置，为 string 时仅支持从左侧冻结至某一列                                                               | string \| FixedOption                                     | columns 中对应的 dataKey | null       |
| size                  | 配置表格尺寸                                                                                                       | string                                                    | 'lg' \| 'md' \| 'sm'     | 'md'       |
| pagination            | 表格分页配置项                                                                                                     | Pagination                                                | -                        | null       |
| errorRowKeys          | 错误列（受控）                                                                                                     | string[]                                                  | -                        | []         |
| highlightedRowKeys    | 高亮行（受控）                                                                                                     | string[]                                                  | -                        | []         |
| rowSelection          | 行可选（受控）                                                                                                     | RowSelection                                              | -                        | null       |
| dataSource            | 异步数据源                                                                                                         | (current: number) => DataSource                           | -                        | null       |
| showColMenu           | 是否支持列操作                                                                                                     | boolean                                                   | -                        | false      |
| striped               | 是否展示为斑马纹效果                                                                                               | boolean                                                   | -                        | false      |
| setting               | 是否集成控制面板功能                                                                                               | boolean                                                   | -                        | false      |
| emptyContent          | 数据为空时的展示内容                                                                                               | string \| () => ReactNode                                 | -                        | '暂无数据' |
| resizable             | 是否能够动态控制列宽                                                                                               | boolean                                                   | true \| false            | false      |
| standard              | 标准模式，默认集成 `showColMenu = true, sticky = true, bordered = true, setting = true, striped = true`            | boolean                                                   | true \| false            | false      |
| loading               | 加载中状态                                                                                                         | boolean                                                   | true \| false            | false      |
| scrollWidth           | 表格滚动的宽度（当表格总设置宽度（含自适应列）大于表格父级容器宽度时需要设置）**3.7.0 版本以后，该属性不建议使用** | number                                                    | -                        | -          |
| showColHighlight      | 表格某一列`hover`时，该列高亮                                                                                      | boolean                                                   | true \| false            | false      |
| draggable             | 表格行可拖拽                                                                                                       | boolean                                                   | true \| false            | false      |
| hiddenColKeys         | 隐藏列（受控） (v3.9.0 新增)                                                                                       | string[]                                                  | -                        | -          |
| onHiddenColKeysChange | 列隐藏设置时回调 (v3.9.0 新增)                                                                                     | (hiddenColKeys: string[]) => void                         | -                        | -          |
| cellRender            | 全局控制单元格自定义渲染，优先级低于 column 的 render 方法                                                         | (text: DataItem[ColumnItem[dataKey]]) => ReactNode        | -                        | -          |

## Event

| 属性名         | 描述               | 类型                                                                              | 可选值                                                                                  | 默认值                                                                                                |
| -------------- | ------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| onHeaderRow    | 行标题事件处理函数 | (item: ColumnItem[], index: number) => object                                     | -                                                                                       | -                                                                                                     |
| onLoadChildren | 点击异步加载子项   | (row: DataItem) => object[] \| Promise                                            | -                                                                                       | -                                                                                                     |
| onDragStart    | 开始拖拽时触发     | (rowData: object) => void                                                         | rowData: 当前行的数据                                                                   | -                                                                                                     |
| onDrop         | 拖拽行放开时触发   | (dragRowData: object, dropRowData: object, data: object, level: Level) => boolean | Promise                                                                                 | dragRowData: 拖拽的行数据 <br/>dropRowData: 目标行数据 <br/>data:当前结构数据 <br/>level:当前级别数据 | - |
| onDropEnd      | 拖拽成功时触发     | (dragRowData: object, dropRowData: object, data: object) => void                  | dragRowData: 拖拽的行数据 <br/>dropRowData: 目标行数据 <br/> data: 拖拽完成后的结构数据 | -                                                                                                     |

> 在 onLoadChildren 方法中，返回的数据中会根据 `isLeaf` 字符控制左侧展开按钮的显示状态

### onHeaderRow 使用方法

```js
// demo 见【行操作-标题事件处理】

<Table
  onHeaderRow={(columns, index) => {
    return {
      onClick: (event) => {}, // 点击行
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {}, // 鼠标移入行
      onMouseLeave: (event) => {},
    };
  }}
/>
```

### Type

### ColumnItem

| 参数                          | 说明                                                                                                               | 类型                                                                                              | 可选值                       | 默认值 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ---------------------------- | ------ |
| title                         | 列标题                                                                                                             | string \| () => ReactNode                                                                         | -                            | -      |
| dataKey                       | 列对应数据项的唯一标识                                                                                             | string \| number                                                                                  | -                            | -      |
| align                         | 列对齐方式                                                                                                         | string                                                                                            | 'left' \| 'right' \|'center' | 'left' |
| selectFilters                 | 表头的筛选菜单, 更多配置请参考 [Select 组件](https://infra.mioffice.cn/hiui/zh-CN/components/select) (v3.7.1 新增) | object                                                                                            | -                            | null   |
| sorter                        | 列排序函数 (v3.7.1 新增)                                                                                           | () => boolean                                                                                     | -                            | null   |
| defaultSortOrder              | 默认排序顺序 (v3.7.1 新增)                                                                                         | ascend \| descend                                                                                 | -                            | null   |
| filterIcon                    | 自定义 filter 图标 (v3.7.1 新增)                                                                                   | ReactNode                                                                                         | -                            | null   |
| filterDropdown                | 自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互 (v3.7.1 新增)                                           | (props: {ColumnItem, setFilterDropdownVisible}) => ReactNode                                      | -                            | null   |
| filterDropdownWidth           | 自定义筛选菜单宽度 (v3.7.1 新增)                                                                                   | number                                                                                            | -                            | 150    |
| filterDropdownClassName       | 自定义筛选菜单 className (v3.7.1 新增)                                                                             | string                                                                                            | -                            | -      |
| onFilterDropdownVisibleChange | 自定义筛选下拉选项显示状态改变时的回调方法 (v3.7.1 新增)                                                           | (filterDropdownVisible, ColumnItem) => void                                                       | true \| false                | false  |
| avg                           | 该列是否支持平均值                                                                                                 | boolean                                                                                           | -                            | false  |
| total                         | 该列是否支持合计                                                                                                   | boolean                                                                                           | -                            | -      |
| width                         | 该列宽度                                                                                                           | number                                                                                            | -                            | -      |
| children                      | 多级表头                                                                                                           | ColumnItem[]                                                                                      | -                            | -      |
| render                        | 控制单元格自定义渲染                                                                                               | (text: DataItem[ColumnItem[dataKey]], row: DataItem, index: number, dataKey: string) => ReactNode | -                            | -      |

### DataSource

| 参数              | 说明                                      | 类型                              | 可选值                                             | 默认值        |
| ----------------- | ----------------------------------------- | --------------------------------- | -------------------------------------------------- | ------------- |
| url               | 请求的 url                                | string                            | -                                                  | -             |
| type              | 请求方法                                  | string                            | get \| post                                        | get           |
| data              | post 请求时请求体参数                     | object                            | -                                                  | -             |
| params            | url 查询参数                              | object                            | -                                                  | -             |
| headers           | 请求头                                    | object                            | -                                                  | -             |
| mode              | 请求模式                                  | string                            | 'same-origin' \| 'cors' \| 'no-cors' \| 'navigate' | 'same-origin' |
| transformResponse | 成功时的回调，需要返回注入 table 的配置项 | (response: object) => TableConfig | -                                                  | -             |

### Pagination

| 参数             | 说明                                                       | 类型                                                      | 可选值                            | 默认值    |
| ---------------- | ---------------------------------------------------------- | --------------------------------------------------------- | --------------------------------- | --------- |
| type             | 分页的类型                                                 | string                                                    | 'default' \| 'simple' \| 'shrink' | 'default' |
| defaultCurrent   | 默认的当前页数                                             | number                                                    | -                                 | 1         |
| current          | 当前页数                                                   | number                                                    | -                                 | -         |
| max              | 最大显示的页数                                             | number                                                    | -                                 | 2         |
| pageSize         | 每页条数                                                   | number                                                    | -                                 | 10        |
| pageSizeOptions  | 指定每页可以显示多少条                                     | number[]                                                  | -                                 | []        |
| total            | 数据总数                                                   | number                                                    | -                                 | -         |
| autoHide         | 只有一页时是否隐藏分页器                                   | boolean                                                   | true \| false                     | false     |
| showJumper       | 是否显示跳转                                               | boolean                                                   | true \| false                     | false     |
| onJump           | 快速跳转时触发，回调值为当前页数                           | (current: number) => void                                 | -                                 | -         |
| onChange         | 页码改变时的回调，回调值为当前页数、之前的页数和每页条数   | (current: number, prev: number, pageSize: number) => void | -                                 | -         | - |
| onPageSizeChange | 每页显示条数改变的回调函数，返回改变后的每页条数及当前页数 | (pageSize: number, current: number) => void               | -                                 | -         | - |

### FixedOption

| 参数  | 说明                 | 类型   | 可选值                   | 默认值 |
| ----- | -------------------- | ------ | ------------------------ | ------ |
| left  | 表格从左侧冻结至某列 | string | columns 中对应的 dataKey | -      |
| right | 表格从右侧冻结至某列 | string | columns 中对应的 dataKey | -      |

### RowSelection

| 参数              | 说明                                                             | 类型                                                                                         | 可选值           | 默认值 |
| ----------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------- | ------ |
| selectedRowKeys   | 选中的行（受控）                                                 | string[]                                                                                     | row 中对应的 key | -      |
| getCheckboxConfig | 行选择的配置项                                                   | rowData => object                                                                            | -                | -      |
| onChange          | 选中项发生变化时的回调，如果是全选操作，`targetRow` 将是数组结构 | (selectedRowKeys: string[], targetRow?: object \| object[], shouldChecked?: boolean) => void | -                | -      |
| checkboxColWidth  | 列选择 checkbox 所在列宽度                                       | number                                                                                       | -                | -      |
| checkAllOptions   | 全选操作的配置项                                                 | { filterIcon?: React.ReactNode }                                                             | -                | -      |

## CHANGELOG

| 参数                  | 变更类型   | 变更内容                                    | 解决的问题                                  |
| --------------------- | ---------- | ------------------------------------------- | ------------------------------------------- |
| selectFilters         | deprecated | 取消内嵌 Select                             | -                                           | 使用 filterDropdown 能替代满足场景 |
| onLoadChildren        | feature    | 必须返回数据 -> 返回 undefined 不做任何处理 | -                                           | 强化功能：支持自定义控制更新 |
| expandedEmbedRowKeys  | feature    | -                                           | 字段：expandRowKeys -> expandedEmbedRowKeys | 强化功能：支持内嵌面板独立控制 |
| onEmbedExpand         | feature    | 字段：onExpand -> onEmbedExpand             | 强化功能：支持内嵌面板独立控制              |
| stickyFooter          | feature    | boolean                                     | 强化功能：支持底部吸底                      |
| stickyFooterBottom    | feature    | 底部吸底距离视口底部距离                    | 强化功能                                    |
| defaultFixedToColumn  | feature    | 1. 定义：非受控；2. 类型：对象              | 强化功能持久化                              |
| fixedToColumn         | feature    | 1. 定义：受控；2. 类型：对象                | 强化功能持久化                              |
| onFixedToColumn       | feature    | 1. 定义：冻结列回调；2. 类型：对象          | 强化功能持久化                              |
| showRowHighlight      | feature    | -                                           | 强化功能受控化                              |
| sortedColKeys         | feature    | 列排序受控                                  | 强化功能持久化                              |
| onSortedColKeysChange | feature    | 列排序设置回调                              | 强化功能持久化                              |
