import React from 'react'
import Transfer from '../src'

/**
 * @title 禁用状态
 */
export const Disabled = () => {
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
      <h1>Disabled</h1>
      <div className="transfer-disabled__wrap">
        <Transfer
          data={data}
          targetIds={targetIds}
          onChange={(ids) => setTargetIds(ids)}
          emptyContent={['暂无数据']}
          title={['title']}
          disabled
          type="multiple"
        />
      </div>
    </>
  )
}
