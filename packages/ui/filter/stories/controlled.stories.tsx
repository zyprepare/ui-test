import React from 'react'
import Filter from '../src'

/**
 * @title 受控
 */
export const Controlled = () => {
  const [value, setValue] = React.useState<React.ReactText[]>([2, 21])

  const data = [
    {
      id: 1,
      title: '小米商城',
      children: [
        {
          id: 11,
          title: '小米商城',
        },
        {
          id: 12,
          title: '米家优品',
          disabled: true,
        },
      ],
    },
    {
      id: 2,
      title: '米家有品',
      children: [
        {
          id: 21,
          title: '五彩城店',
          children: [
            {
              id: '小米9',
              title: '小米9',
            },
            {
              id: '小米MIXS',
              title: '小米MIXS',
            },
            {
              id: '小米8',
              title: '小米8',
            },
          ],
        },
        {
          id: 22,
          title: '清河店',
        },
        {
          id: 23,
          title: '西三旗店',
        },
      ],
    },

    {
      id: 3,
      title: '京东商城',
      children: [
        {
          id: 31,
          title: '小米直营',
          children: [
            {
              id: '线下KA',
              title: '线下KA',
            },
          ],
        },
      ],
    },
  ]

  return (
    <>
      <h1>Controlled</h1>
      <div className="filter-controlled__wrap">
        <Filter
          label={['渠道', '分店', '机型']}
          value={value}
          onChange={(ids, targetItem) => {
            console.log('onChange', ids, targetItem)
            setValue(ids)
          }}
          data={data}
        />
      </div>
    </>
  )
}
