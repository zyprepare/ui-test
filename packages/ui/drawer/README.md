# Drawer 抽屉

模态对话框一般会中断当前任务流，在相对无信息干扰的环境下完成微型任务

## 何时使用

当前任务中需要中途填写信息或执行别的动作

常见于后台设置、新建编辑等场景

## 使用示例

<!-- Inject Stories -->

## Props

| 参数         | 说明                     | 类型                | 可选值            | 默认值  |
| ------------ | ------------------------ | ------------------- | ----------------- | ------- |
| title        | 模态框标题               | string \| ReactNode | -                 | -       |
| visible      | 是否显示模态框           | boolean             | true \| false     | false   |
| closable     | 是否展示右上角关闭按钮   | boolean             | true \| false     | true    |
| maskClosable | 是否允许点击蒙层关闭抽屉 | boolean             | true \| false     | true    |
| showMask     | 是否显示蒙层             | boolean             | true \| false     | true    |
| width        | 自定义抽屉宽度           | number              | -                 | 360     |
| footer       | 自定义抽屉底部           | ReactNode \| null   | -                 | -       |
| placement    | 抽屉唤起的方向           | string              | 'left' \| 'right' | 'right' |

## Events

| 名称    | 说明                 | 类型                        | 参数                | 返回值 |
| ------- | -------------------- | --------------------------- | ------------------- | ------ |
| onClose | 关闭事件触发时的回调 | (event: MouseEvent) => void | event: 鼠标事件对象 | -      |

## CHANGELOG

| 参数           | 变更类型   | 变更内容         | 解决的问题 |
| -------------- | ---------- | ---------------- | ---------- |
| preload        | feature    |                  |            |
| unmountOnClose | feature    |                  |            |
| onClose        | update     | 去除  event 参数 |            |
| closeOnEsc     | feature    |                  |            |
| onEscKeyDown   | feature    |                  |            |
| closeIcon      | feature    |                  |            |
| lockScroll     | feature    |                  |            |
| timeout        | feature    |                  |            |
| disabledPortal | feature    |                  |            |
| container      | feature    |                  |            |
| onExited       | feature    |                  |            |
| maskClosable   | deprecated |                  |            |
