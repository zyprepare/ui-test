# Collapse 折叠面板

将信息以折叠的形式收入面板，以节省空间，减少信息干扰，应用时打开

## 何时使用

信息复杂，有主次之分时，将次要信息折叠进面板

一级信息需优先识别，二级信息多为辅助信息或描述信息

## 使用示例

<!-- Inject Stories -->

## Props

### Collapse

| 参数              | 说明                      | 类型                 | 可选值               | 默认值    |
| --------------- | ----------------------- | ------------------ | ----------------- | ------ |
| accordion       | 是否启用手风琴模式，手风琴模式下最多只展开一项 | boolean            | true \| false     | false  |
| defaultActiveId | 默认展开的面板                 | string \| string[] | -                 | -      |
| activeId        | 指定展开的面板                 | string \| string[] | -                 | -      |
| arrowPlacement  | 箭头所在位置                  | string             | 'left' \| 'right' | 'left' |
| showArrow       | 是否显示展开箭头                | boolean            | true \| false     | true   |

### Collapse.Panel

| 参数       | 说明      | 类型                  | 可选值           | 默认值   |
| -------- | ------- | ------------------- | ------------- | ----- |
| id       | 面板唯一标识  | string              | -             | -     |
| title    | 面板标题    | string \| ReactNode | -             | -     |
| disabled | 是否禁用面板  | boolean             | true \| false | false |
| extra    | 添加额外的元素 | ReactNode           | -             | -     |

## Events

| 名称       | 说明     | 类型                         | 参数                                    | 返回值 |
| -------- | ------ | -------------------------- | ------------------------------------- | --- |
| onChange | 切换时的回调 | (indexs: string[]) => void | indexs: 当前展开的节点 ID 集合，如果 ID 不存在则为索引集合 | -   |

## Tips

- V3文档存在错误，title -> header(真实)，该采用文档还是代码

## CHANGELOG

| 参数    | 变更类型       | 变更内容 | 解决的问题                 |
| ----- | ---------- | ---- | --------------------- |
| extra | deprecated |      | extra的功能完全可以通过title实现 |
