import React, { useCallback } from 'react'
import { useLatestRef } from '@hi-ui/use-latest'
import { UseCheckItem } from './types'

const NOOP_ID = ''

/**
 * 用于单项选择的 hook
 */
export const useSelect = ({
  disabled = false,
  selectedId,
  onSelect,
  allowSelect,
  idFieldName = 'id',
}: UseSelectProps) => {
  const allowSelectRef = useLatestRef(allowSelect)

  const onItemSelect = useCallback(
    <T extends UseCheckItem>(targetItem: T, shouldSelected = true) => {
      if (disabled) return
      if (allowSelectRef.current && allowSelectRef.current(targetItem) === false) return

      if (shouldSelected) {
        onSelect(targetItem[idFieldName], targetItem, true)
      } else {
        onSelect(NOOP_ID, targetItem, false)
      }
    },
    [disabled, allowSelectRef, onSelect, idFieldName]
  )

  const isSelectedId = useCallback(
    (id: React.ReactText) => selectedId !== NOOP_ID && selectedId === id,
    [selectedId]
  )

  return [onItemSelect, isSelectedId] as const
}

export interface UseSelectProps<T extends UseCheckItem = any> {
  /**
   * 开启禁用选择
   */
  disabled?: boolean
  /**
   * 选中的 id（受控）
   */
  selectedId: React.ReactText
  /**
   * 选择时回调
   */
  onSelect: (selectedId: React.ReactText, targetItem: T, shouldSelected: boolean) => void
  /**
   * 返回 true 允许选中
   */
  allowSelect?: (targetItem: T) => boolean
  /**
   * id 映射的字段
   */
  idFieldName?: string
}
