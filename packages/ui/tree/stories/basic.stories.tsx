import React from 'react'
import Tree from '../src'
import Button from '@hi-ui/button'

/**
 * @title 基础用法
 * @desc 二叉树或多叉树的展现形式，常见于组织架构、文件管理、索引目录等应用场景
 */
export const Basic = () => {
  const [expandedIds, setExpandedIds] = React.useState<React.ReactText[]>([])

  return (
    <>
      <h1>Basic for Tree</h1>
      <div className="tree-basic__wrap">
        <Button
          onClick={() => {
            setExpandedIds([1])
          }}
        >
          setExpanded
        </Button>
        <Tree
          expandedIds={expandedIds}
          onExpand={setExpandedIds}
          data={[
            {
              id: 1,
              title: '小米',
              children: [
                {
                  id: 2,
                  title: '研发',
                  disabled: true,
                  children: [
                    { id: 3, title: '后端', disabled: true },
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
          ]}
        ></Tree>
      </div>
    </>
  )
}
