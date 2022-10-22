import React, { useCallback, useState } from 'react'
import { useLatestCallback } from '@hi-ui/use-latest'
import { CheckCascaderDataItem, CheckCascaderItemEventData } from '../types'
import { addChildrenById, cloneTree, getTopDownAncestors } from '@hi-ui/tree-utils'

export const useAsyncSwitch = (
  setCascaderData: React.Dispatch<React.SetStateAction<CheckCascaderDataItem[]>>,
  onExpand?: (selectedOption: CheckCascaderItemEventData) => void,
  onLoadChildren?: (
    item: CheckCascaderItemEventData,
    idPaths: React.ReactText[]
  ) => Promise<CheckCascaderDataItem[] | void> | void
) => {
  const [loadingIds, addLoadingIds, removeLoadingIds] = useList<React.ReactText>()

  // 加载节点
  const loadChildren = useCallback(
    async (node: CheckCascaderItemEventData) => {
      if (!onLoadChildren) return
      const childrenNodes = await onLoadChildren(
        node,
        getTopDownAncestors(node).map(({ id }) => id)
      )

      if (Array.isArray(childrenNodes)) {
        setCascaderData((prev) => {
          const nextTreeData = cloneTree(prev)
          addChildrenById(nextTreeData, node.id, childrenNodes)
          return nextTreeData
        })
      }
    },
    [onLoadChildren, setCascaderData]
  )

  const onExpandLatest = useLatestCallback(onExpand)

  const onNodeSwitch = useCallback(
    async (node: CheckCascaderItemEventData) => {
      const { id, children, isLeaf } = node

      onExpandLatest(node)

      if (children) {
        return
      }

      if (isLeaf) return

      if (onLoadChildren) {
        addLoadingIds(id)
        try {
          await loadChildren(node)
          removeLoadingIds(id)
        } catch {
          removeLoadingIds(id)
        }
      }
    },
    [loadChildren, onLoadChildren, onExpandLatest, addLoadingIds, removeLoadingIds]
  )

  const isLoadingId = (id: React.ReactText) => loadingIds.indexOf(id) !== -1

  return [isLoadingId, onNodeSwitch] as const
}

const useList = <T>(initialValue: T[] = []) => {
  const [keyList, setKeyList] = useState<T[]>(initialValue)

  const remove = useCallback((targetKey: T) => {
    setKeyList((prev) => prev.filter((key) => key !== targetKey))
  }, [])

  const add = useCallback((targetKey: T) => {
    setKeyList((prev) => (prev.indexOf(targetKey) === -1 ? prev.concat(targetKey) : prev))
  }, [])

  return [keyList, add, remove] as const
}
