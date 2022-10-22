import React from 'react'
import Tree, { useTreeSearch } from '../src'

/**
 * @title 搜索用法
 * @desc 树的层级多、节点数量庞大，借助搜索工具快速找到结点
 */
export const Search = () => {
  const [data] = React.useState([
    {
      id: 1,
      title: '小米',
      children: [
        {
          id: 2,
          title: '研发',
          children: [
            { id: 3, title: '后端' },
            { id: 4, title: '运维' },
            { id: 5, title: '前端' },
          ],
        },
        { id: 6, title: '产品' },
      ],
    },
    {
      id: 11,
      title: '大米',
      children: [
        { id: 22, title: '可视化' },
        { id: 66, title: 'HiUI' },
      ],
    },
  ])

  const SearchTree = useTreeSearch(Tree)

  return (
    <>
      <h1>Search for Tree</h1>
      <div className="tree-search__wrap">
        <SearchTree searchable={true} searchPlaceholder={'搜索'} data={data} />
      </div>
    </>
  )
}
