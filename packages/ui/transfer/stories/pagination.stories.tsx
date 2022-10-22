import React from 'react'
import Transfer from '../src'

/**
 * @title 分页
 */
export const Pagination = () => {
  const [data] = React.useState(() => {
    const generateData = () => {
      const arr = []
      for (let i = 1; i < 100; i++) {
        arr.push({
          id: i,
          title: '选项' + i,
          // disabled: i % 6 === 0,
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
      <h1>Pagination</h1>
      <div className="transfer-pagination__wrap">
        <Transfer
          type="multiple"
          data={data}
          // targetLimit={8}
          targetIds={targetIds}
          onChange={(ids) => setTargetIds(ids)}
          emptyContent={['暂无数据']}
          searchable
          pagination={{ pageSize: 10 }}
          draggable
          showCheckAll
        />
      </div>
    </>
  )
}
