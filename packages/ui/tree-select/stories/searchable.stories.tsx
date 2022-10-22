import React from 'react'
import TreeSelect from '../src'

/**
 * @title 带搜索
 */
export const Searchable = () => {
  const [data] = React.useState([
    {
      title: '手机类',
      id: '0',
      disabled: true,
      children: [
        {
          title: 'Redmi系列',
          id: '0-0',
          children: [
            {
              id: '0-0-1',
              title: 'Redmi K30',
            },
            {
              id: '0-0-2',
              title: 'Redmi K30 Pro',
            },
            {
              id: '0-0-3',
              title: 'Redmi 10X 5G',
            },
            {
              id: '0-0-4',
              title: 'Redmi Note 8',
            },
            {
              id: '0-0-5',
              title: 'Redmi 9',
            },
            {
              id: '0-0-6',
              title: 'Redmi 9A',
            },
          ],
        },
        {
          title: '小米手机',
          id: '0-1',
          children: [
            {
              id: '0-1-1',
              title: '小米10 Pro',
            },
            {
              id: '0-1-2',
              title: '小米10',
            },
            {
              id: '0-1-3',
              title: '小米10 青春版 5G',
            },
            {
              id: '0-1-4',
              title: '小米MIX Alpha',
            },
          ],
        },
      ],
    },
    {
      title: '电视',
      id: '1',
      children: [
        {
          title: '小米电视 大师 65英寸OLED',
          id: '1-0',
        },
        {
          title: 'Redmi 智能电视 MAX 98',
          id: '1-1',
        },
        {
          title: '小米电视4A 60英寸',
          id: '1-2',
        },
      ],
    },
  ])

  // 注意 filterOption 是影响搜索渲染的，是完全受控的，useCallback 包裹可以减少无效的重渲染，提升性能
  const filterOptionMemo = React.useCallback((keyword: string, item: any) => {
    console.log(keyword, item)

    const match = (node: any) =>
      typeof node.title === 'string' && node.title.indexOf(keyword) !== -1

    const matchUp = (node: any) => {
      let found = match(node)
      const { children } = node

      if (children && !found) {
        found = children.some((item: any) => matchUp(item))
      }

      return found
    }

    return matchUp(item)
  }, [])

  return (
    <>
      <h1>Searchable</h1>
      <div className="tree-select-searchable__wrap">
        <h2>highlight</h2>
        <TreeSelect
          data={data}
          searchable
          searchMode="highlight"
          onChange={(checkedIds, checkedNode) => {
            console.log('TreeSelect onChange: ', checkedIds, checkedNode)
          }}
        />

        <h2>filter</h2>
        <TreeSelect
          data={data}
          searchable
          searchMode="filter"
          onChange={(checkedIds, checkedNode) => {
            console.log('TreeSelect onChange: ', checkedIds, checkedNode)
          }}
        />

        <h2>custom filter</h2>
        <TreeSelect
          data={data}
          searchable
          filterOption={filterOptionMemo}
          onChange={(checkedIds, checkedNode) => {
            console.log('TreeSelect onChange: ', checkedIds, checkedNode)
          }}
        />
      </div>
    </>
  )
}
