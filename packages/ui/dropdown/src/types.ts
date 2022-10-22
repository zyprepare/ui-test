import React from 'react'
import { ValueOf } from '@hi-ui/core'

export const DropdownTriggerActionEnum = {
  CLICK: 'click',
  CONTEXTMENU: 'contextmenu',
  HOVER: 'hover',
} as const

// 对外暴露同名联合类型

// eslint-disable-next-line no-redeclare
export type DropdownTriggerActionEnum = ValueOf<typeof DropdownTriggerActionEnum>

export interface DropdownDataItem {
  /**
   * 唯一标识 id
   */
  id?: React.ReactText
  /**
   * 点击跳转的路径
   */
  href?: string
  /**
   * 同 a 标签的 target 属性，仅在设置 href 后有效
   */
  target?: '_self' | '_blank' | '_parent' | '_top'
  /**
   * 标题的内容
   */
  title?: React.ReactNode
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否在其底部建立分隔线
   */
  split?: boolean
}
