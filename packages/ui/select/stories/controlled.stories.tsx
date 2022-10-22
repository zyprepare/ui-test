import React from 'react'
import Select from '../src'

/**
 * @title 受控
 */
export const Controlled = () => {
  const [value, setValue] = React.useState<React.ReactText>('3')
  const [data] = React.useState([
    { title: '电视', id: '3', disabled: true },
    { title: '手机', id: '2' },
    { title: '笔记本', id: '4', disabled: true },
    { title: '生活周边', id: '5' },
    { title: '办公', id: '6' },
  ])

  return (
    <>
      <h1>Controlled</h1>
      <div className="select-controlled__wrap">
        <Select
          style={{ width: 240 }}
          clearable={false}
          data={data}
          value={value}
          onChange={(selectedId) => {
            setValue(selectedId)
          }}
        />
      </div>
    </>
  )
}
