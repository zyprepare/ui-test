import React from 'react'
import { useUncontrolledState } from '@hi-ui/use-uncontrolled-state'
import { useCascadeCheck } from '@hi-ui/use-check'
import { CheckCascaderItemEventData, FlattedCheckCascaderDataItem } from '../types'
import { parseCheckDataDirty, processCheckedIds } from '../utils'

const NOOP_ARRAY = [] as []

export const useCheck = (
  checkedMode: string,
  disabled: boolean,
  flattedData: FlattedCheckCascaderDataItem[],
  defaultCheckedIds: React.ReactText[] = NOOP_ARRAY,
  checkedIdsProp?: React.ReactText[],
  onCheck?: (
    checkedInfo: {
      checkedIds: React.ReactText[]
      semiCheckedIds: React.ReactText[]
    },
    node: CheckCascaderItemEventData,
    checked: boolean
  ) => void
) => {
  const [checkedIds, trySetCheckedIds] = useUncontrolledState(
    defaultCheckedIds,
    checkedIdsProp,
    (checkedIds, checkedNode, shouldChecked, semiCheckedIds) => {
      // 出口数据处理
      onCheck?.({ checkedIds, semiCheckedIds }, checkedNode, shouldChecked)
    }
  )

  // 入口数据处理
  const parsedCheckedIds = parseCheckDataDirty(checkedMode, checkedIds, flattedData, allowCheck)

  const cascaded = checkedMode !== 'SEPARATE'

  return useCascadeCheck({
    cascaded,
    disabled,
    flattedData,
    checkedIds: parsedCheckedIds,
    onCheck: (checkedIds, checkedNode, shouldChecked, semiCheckedIds) => {
      // 出口数据处理
      const processedIds = processCheckedIds(checkedMode, checkedIds, flattedData, allowCheck)

      trySetCheckedIds(processedIds, checkedNode, shouldChecked, semiCheckedIds)
    },
    allowCheck,
  })
}

const allowCheck = (targetItem: CheckCascaderItemEventData) => {
  if (targetItem.disabled || targetItem.disabledCheckbox || targetItem.checkable === false) {
    return false
  }
  return true
}
