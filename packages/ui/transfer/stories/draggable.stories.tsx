import React from 'react'
import Transfer from '../src'

/**
 * @title 拖拽排序
 * @desc 可通过拖拽的形式对目标区域内进行排序
 */
export const Draggable = () => {
  const [data] = React.useState(() => {
    const generateData = () => {
      const arr = []
      for (let i = 1; i < 100; i++) {
        arr.push({
          id: i,
          title: '选项' + i,
          disabled: i % 6 === 0,
        })
      }
      return arr
    }

    const data = generateData()
    return data
  })

  const [targetIds, setTargetIds] = React.useState<React.ReactText[]>([2, 3])

  return (
    <>
      <h1>可排序</h1>
      <div className="transfer-all-check__wrap">
        <Transfer
          type="multiple"
          data={data}
          targetIds={targetIds}
          onChange={(ids) => setTargetIds(ids)}
          emptyContent={['暂无数据']}
          showCheckAll
          draggable
          title={['源数据', '目标数据']}
        />
      </div>
    </>
  )
}
