# Upload 上传

用来上传多种格式的附件

## 何时使用

上传本地文档

上传图片附件或照片墙

## 使用示例

<!-- Inject Stories -->

## Upload Props

| 参数            | 说明                                                                                                                                               | 类型                                         | 可选值                                            | 默认值                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------- | ----------------------------------------- |
| type            | 上传组件类型                                                                                                                                       | string                                       | default \| drag \| pictureCard \| avatar \| photo | default                                   |
| accept          | 接收上传的文件类型， 用逗号隔开的 MIME 类型列表，参考 [MDN-MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_Types) | string                                       | -                                                 | -                                         |
| content         | 上传按钮文案，仅在 type === 'default' 的时候有效                                                                                                   | ReactNode                                    | -                                                 | 本地上传                                  |
| tips            | 上传文件信息提示                                                                                                                                   | string \| ReactNode                          | -                                                 | 本地上传                                  |
| maxSize         | 接收上传的文件体积上限（单位：KB）                                                                                                                 | number                                       | -                                                 | -                                         |
| maxCount        | 接收上传的文件最大数量                                                                                                                             | number                                       | -                                                 | -                                         |
| uploadAction    | 必选，上传的地址 \| (file) => Promise                                                                                                              | string                                       | -                                                 | -                                         |
| data            | 除了上传文件外的其它 form 参数                                                                                                                     | object                                       | -                                                 | -                                         |
| name            | 发到后台文件参数名                                                                                                                                 | string                                       | -                                                 | file                                      |
| disabled        | 是否禁用                                                                                                                                           | boolean                                      | true \| false                                     | false                                     |
| headers         | 设置上传的请求头部                                                                                                                                 | object                                       | -                                                 | { 'Content-type': 'multipart/form-data' } |
| withCredentials | 上传请求时是否携带 cookie                                                                                                                          | boolean                                      | true \| false                                     | false                                     |
| showUploadList  | 是否展示 uploadList, 仅在 type === 'default' 和 type === 'pictureCard' 时有效                                                                      | boolean                                      | true \| false                                     | true                                      |
| multiple        | 是否支持多选文件                                                                                                                                   | boolean                                      | true \| false                                     | false                                     |
| defaultFileList | 默认已上传文件列表                                                                                                                                 | File[]                                       | -                                                 | []                                        |
| fileList        | 已上传文件列表（受控）                                                                                                                             | File[]                                       | -                                                 | -                                         |
| beforeUpload    | 上传文件前的钩子，返回 true 继续上传，其他终止上传                                                                                                 | (files: File[], fileList: File[]) => boolean | -                                                 | () => true                                |
| customUpload    | 自定义上传，此时不会再触发 onChange，所有上传逻辑转移到该函数                                                                                      | (files: Files[]) => void                     | -                                                 | -                                         |
| loading         | 文件上传按钮是否 loading，为 true 时按钮不可点击。仅在 type='default' 时有效                                                                       | boolean                                      | true \| false                                     | false                                     |
| photoSize       | 设置上传按钮大小,仅在 type === 'photo' 时有效                                                                                                      | string                                       | 'sm' \| 'md' \| 'lg'                              | 'md'                                      |

## Events

| 名称       | 说明                     | 类型                                                        | 参数                                                                                 | 返回值                                                                           |
| ---------- | ------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| onChange   | 上传回调                 | (file: File, fileList: File[], response: object) => boolean | file: 上传的文件对象 <br/> fileList: 当前已上传文件列表集合 <br/> response: 响应对象 | boolean \| `Promise<boolean>`: 返回 false 则已上传文件列表不展示该文件           |
| onRemove   | 删除上传的文件           | (file: File, fileList: File[], index: number) => boolean    | file: 移除的文件对象, fileList: 当前已上传文件列表集合, index 索引                   | boolean \| `Promise<boolean>`: 返回 false 则不可删除，返回 true 时在前端删除文件 |
| onDownload | 点击已上传的文件时的回调 | (file: File) => void                                        | file: 点击的文件对象                                                                 | -                                                                                |

## Type

### File

| 参数        | 说明         | 类型   | 可选值                              | 默认值 |
| ----------- | ------------ | ------ | ----------------------------------- | ------ |
| fileId      | 上传文件 id  | string | -                                   | -      |
| fileType    | 文件类型     | string | -                                   | -      |
| name        | 文件名       | string | -                                   | -      |
| uploadState | 上传文件状态 | string | 'success' \| 'uploading' \| 'error' | -      |
| url         | 上传文件地址 | string | -                                   | -      |

## CHANGELOG

| 参数                | 变更类型                        | 变更内容   | 解决的问题                   |
| ------------------- | ------------------------------- | ---------- | ---------------------------- |
| propName            | feature \| deprecated \| update | 变更了什么 | 之前是什么样子，解决什么问题 |
| ----                | ----                            | ----       | ----                         |
| File.abort          | feature                         | -          | 功能强化                     |
| File.progressNumber | feature                         | -          | 功能强化                     |
