# Rate 评分

评分是通过离散型数据来设置某一个指标优劣的组件

## 何时使用

需要对某一个指标或事件进行评级评分时

## 使用示例

<!-- Inject Stories -->

## Props

| 参数            | 说明                                | 类型                                       | 可选值        | 默认值 |
| --------------- | ----------------------------------- | ------------------------------------------ | ------------- | ------ |
| clearable       | 是否允许再次点击后清除              | boolean                                    | true \| false | true   |
| allowHalf       | 是否允许半选                        | boolean                                    | true \| false | true   |
| useEmoji        | 是否使用表情                        | boolean                                    | true \| false | false  |
| count           | star 数量，Emoji 时不可用           | number                                     | -             | 5      |
| defaultValue    | 默认值                              | number                                     | -             | 0      |
| disabled        | 禁用，无法进行交互,鼠标禁用交互效果 | boolean                                    | true \| false | false  |
| readOnly        | 只读，无法进行交互                  | boolean                                    | true \| false | false  |
| tooltips        | 自定义每项的提示信息                | string[]                                   | -             | -      |
| descRender      | 自定义辅助文字函数                  | (value: number,index: number) => ReactNode | -             | -      |
| value           | 当前数，受控值                      | number                                     | -             | -      |
| character       | 自定义字符                          | ReactNode \|string                         | -             | -      |
| color           | 自定义颜色（只对 icon、字体有效）   | string                                     | -             | -      |
| characterRender | 自定义渲染 character 函数           | (value: number,index: number) => ReactNode | -             | -      |

## Events

| 名称     | 说明         | 类型                    | 参数            | 返回值 |
| -------- | ------------ | ----------------------- | --------------- | ------ |
| onChange | 选择时的回调 | (value: number) => void | value: 当前分值 | -      |

## CHANGELOG

| 参数          | 变更类型                        | 变更内容                        | 解决的问题                   |
| ------------- | ------------------------------- | ------------------------------- | ---------------------------- |
| propName      | feature \| deprecated \| update | 变更了什么                      | 之前是什么样子，解决什么问题 |
| ----          | ----                            | ----                            | ----                         |
| 组件名        | update                          | Rate -> Rating                  | 命名专业化，符合英语理解认知 |
| autoFocus     | feature                         | -                               | 表单输入控件统一支持         |
| halfPlacement | update                          | 类型：vertical -> halfPlacement | 统一使用类 placement 命名    |
| 快捷键强化    | feature                         | 支持左右键最大最小值无缝切换    | 强化功能                     |
