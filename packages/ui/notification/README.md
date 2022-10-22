# Notification 通知

系统发布通知、公布、公告等类型的全局信息

## 何时使用

系统级推送

用于通知、通告、公告、广播等场景

## 使用示例

<!-- Inject Stories -->

## Methods

`Notification.open({ key, type, title, content, closesable, confirmText, onConfirm, size, duration })`

| 参数          | 说明           | 类型                      | 可选值                                         | 默认值    |
| ----------- | ------------ | ----------------------- | ------------------------------------------- | ------ |
| type        | 通知框类型        | string                  | 'info' \| 'success' \| 'error' \| 'warning' | 'info' |
| key         | 通知框唯一标识      | string                  | -                                           | -      |
| title       | 通知框标题        | string                  | -                                           | -      |
| content     | 通知框内容        | string                  | -                                           | -      |
| closeable   | 是否可关闭        | boolean                 | true \| false                               | true   |
| onClose     | 关闭事件触发时的回调   | (e: MouseEvent) => void | -                                           | -      |
| duration    | 自动关闭时间，单位为毫秒 | number                  | -                                           | 3000   |
| confirmText | 确认按钮展示文案     | string                  | -                                           | -      |
| onConfirm   | 确认事件触发时的回调   | () => void              | -                                           | -      |

`Notification.close(key)`

| 参数  | 说明      | 类型     | 可选值 | 默认值 |
| --- | ------- | ------ | --- | --- |
| key | 通知框唯一标识 | string | -   | -   |

## CHANGELOG

| 参数          | 变更类型       | 变更内容                 | 解决的问题 |
| ----------- | ---------- | -------------------- | ----- |
| id          | feature    |                      |       |
| title       | update     | 变更类型为React.ReactNode |       |
| timeout     | feature    |                      |       |
| autoClose   | feature    |                      |       |
| confirmText | deprecated |                      |       |
| key         | deprecated |                      |       |
| onConfirm   |            |                      |       |
