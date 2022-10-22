# Carousel 走马灯

又叫图片轮播器，是用于在同一空间展示一组图片的容器。

## 何时使用

在空间有限的情况下，需要展示多张图片时

常用于宣传营销 Banner、新功能上线等场景

## 使用示例

<!-- Inject Stories -->

## Props

| 参数          | 说明                         | 类型    | 可选值        | 默认值 |
| ------------- | ---------------------------- | ------- | ------------- | ------ |
| duration      | 自动切换间隔，默认不自动切换 | number  | -             | 0      |
| showDots      | 是否显示分页指示器           | boolean | true \| false | true   |
| showArrows    | 是否显示箭头指示器           | boolean | true \| false | true   |
| defaultActive | 默认激活索引，从 0 开始      | number  | -             | 0      |
| showPages     | 是否显示页码指示器           | boolean | true \| false | false  |

## CHANGELOG

| 参数         | 变更类型 | 变更内容       | 解决的问题  |
| ------------ | -------- | -------------- | ----------- |
| arrowSize    | feature  | 箭头指示器尺寸 | UI 新增功能 |
| dotType      | feature  | 分页指示器类型 | UI 新增功能 |
| dotPlacement | feature  | 分页指示器位置 |             |
