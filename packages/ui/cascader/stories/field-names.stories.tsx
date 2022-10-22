import React from 'react'
import { Cascader } from '../src'

/**
 * @title 字段别名
 * @desc 数据中的字段名非title，id或disabled时使用
 */
export const FieldNames = () => {
  const [data] = React.useState([
    {
      value: '0',
      label: '0',
      kids: [
        {
          value: '0-0',
          label: '0-0',
          kids: [
            {
              value: '0-0-0',
              label: '0-0-0',
            },
            {
              value: '0-0-1',
              label: '0-0-1',
            },
            {
              value: '0-0-2',
              label: '0-0-2',
            },
          ],
        },
        {
          value: '0-1',
          label: '0-1',
          kids: [
            {
              value: '0-1-0',
              label: '0-1-0',
            },
            {
              value: '0-1-1',
              label: '0-1-1',
            },
          ],
        },
        {
          value: '0-2',
          label: '0-2',
          kids: [
            {
              value: '0-2-0',
              label: '0-2-0',
            },
            {
              value: '0-2-1',
              label: '0-2-1',
            },
          ],
        },
      ],
    },
    {
      value: '1',
      label: '1',
      kids: [
        {
          value: '1-0',
          label: '1-0',
        },
        {
          value: '1-1',
          label: '1-1',
        },
      ],
    },
    {
      value: '2',
      label: '2',
      kids: [
        {
          value: '2-0',
          label: '2-0',
        },
        {
          value: '2-1',
          label: '2-1',
        },
      ],
    },
  ])

  return (
    <>
      <h1>FieldNames</h1>
      <div className="cascader-field-names__wrap">
        <Cascader
          style={{ width: 240 }}
          fieldNames={{
            id: 'value',
            title: 'label',
            children: 'kids',
          }}
          defaultValue={['0', '0-0', '0-0-1']}
          data={data}
        />
      </div>
    </>
  )
}
