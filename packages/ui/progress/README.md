# Progress 进度条

用来展示当前任务、事件或操作的进展程度

## 何时使用

需要显示、掌控某件事务的进展的状态，如百分比等

常用于上传、下载文件等场景

## 使用示例

<!-- Inject Stories -->

## Props

| 参数      | 说明                                           | 类型                | 可选值                                         | 默认值         |
| --------- | ---------------------------------------------- | ------------------- | ---------------------------------------------- | -------------- |
| apperance | 进度条类型                                     | string              | 'bar' \| 'circle' \| 'dashboard'               | 'bar'          |
| size      | 进度条大小                                     | string              | 'lg' \| 'md' \| 'sm'                           | 'md'           |
| active    | 激活的动画效果（仅支持条形用法）               | boolean             | true \| false                                  | false          |
| content   | 显示文本                                       | string \| ReactNode | -                                              | 当前进度百分比 |
| showInfo  | 是否显示文本                                   | boolean             | true \| false                                  | true           |
| type      | 进度条类型                                     | string              | 'primary' \| 'success' \| 'warning' \| 'error' | 'primary'      |
| radius    | 环形进度条半径                                 | number              | -                                              | 40             |
| placement | 文字在进度条内显示，需配合 height 使用         | string              | 'inside' \| 'outside'                          | 'outside'      |
| width     | 进度条宽度度，仅在 `apperance = 'bar'`  时有效 | number \| string    | -                                              | -              |
| height    | 进度条高度，仅在 `apperance = 'bar'`  时有效   | number \| string    | -                                              | -              |
| percent   | 进度条百分比值                                 | number              | -                                              | 0              |

## CHANGELOG

| 参数          | 变更类型 | 变更内容 | 解决的问题 |
| ------------- | -------- | -------- | ---------- |
| bufferPercent | feature  |          |            |
| color         | feature  |          |            |
| formatText    | feature  |          |            |
| indeterminate | feature  |          |            |
| strokeWidth   |          |          |            |
