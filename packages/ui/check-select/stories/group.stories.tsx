import React from 'react'
import CheckSelect from '../src'

/**
 * @title 类型分组
 */
export const Group = () => {
  const [value, setValue] = React.useState<React.ReactText[]>(['3'])

  const [data] = React.useState([
    {
      groupId: 'redmi',
      groupTitle: '红米手机',
      children: [
        { title: '红米 5A', id: '3' },
        { title: '红米 6A', id: '2' },
        { title: '红米 note', id: '4' },
        { title: '红米 note8', id: '5' },
      ],
    },
    {
      groupId: 'mi',
      groupTitle: '小米电视',
      children: [
        { title: '小米电视4A 60寸', id: '10' },
        { title: '小米电视E55A', id: '11' },
        { title: '小米电视E65A', id: '12' },
        { title: '小米电视4S', id: '13' },
        { title: '小米电视4C', id: '14' },
      ],
    },
  ])

  return (
    <>
      <h1>Group</h1>
      <div className="select-Group__wrap">
        <CheckSelect
          style={{ width: 240 }}
          data={data}
          placeholder="请选择"
          value={value}
          onChange={(selectedId) => {
            setValue(selectedId)
          }}
        />
      </div>
    </>
  )
}
