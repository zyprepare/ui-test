import React, { useState, useCallback } from 'react'
import { TreeDataItem, TreeNodeEventData } from '../types'
import { useLatestCallback } from '@hi-ui/use-latest'
import { cloneTree } from '@hi-ui/tree-utils'
import { addChildrenById } from '../utils'
import { UseDataSource, useDataSource } from '@hi-ui/use-data-source'

export const useAsyncSwitch = (
  setTreeData: React.Dispatch<React.SetStateAction<TreeDataItem[]>>,
  onExpand?: (expandedNode: TreeNodeEventData, isExpanded: boolean) => void,
  onLoadChildren?:
    | UseDataSource<TreeDataItem[]>
    | ((node: TreeNodeEventData) => void | Promise<TreeDataItem[] | void>)
) => {
  const [loadingIds, addLoadingIds, removeLoadingIds] = useList<React.ReactText>()

  const { loadRemoteData } = useDataSource({
    dataSource: onLoadChildren,
    validate: Array.isArray,
    abort: false,
  })

  // 加载节点
  const loadChildren = useCallback(
    async (node: TreeNodeEventData) => {
      if (!onLoadChildren) return

      const childrenNodes = await loadRemoteData(node).catch(() => {})

      if (Array.isArray(childrenNodes)) {
        setTreeData((prev) => {
          const nextTreeData = cloneTree(prev)
          addChildrenById(nextTreeData, node.id, childrenNodes)
          return nextTreeData
        })
      }
    },
    [onLoadChildren, setTreeData, loadRemoteData]
  )

  const onExpandLatest = useLatestCallback(onExpand)

  const onNodeSwitch = useCallback(
    async (node: TreeNodeEventData, shouldExpanded: boolean) => {
      const { id, children, isLeaf } = node

      if (children) {
        onExpandLatest(node, shouldExpanded)
        return
      }

      if (isLeaf) return

      if (onLoadChildren) {
        addLoadingIds(id)
        try {
          await loadChildren(node)
          // Using latest  onExpand function at nextTick
          window.requestAnimationFrame(() => {
            onExpandLatest(node, shouldExpanded)
          })

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
