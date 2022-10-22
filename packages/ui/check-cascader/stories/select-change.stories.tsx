import React from 'react'
import CheckCascader from '../src'

/**
 * @title 选择即改变
 * @desc 选中选项即可完成勾选，配合 hover 展开使用
 */
export const SelectChange = () => {
  const [dataOnlyLeafCheckable] = React.useState(() => {
    const data = [
      {
        id: '0',
        title: '0',
        children: [
          {
            id: '0-0',
            title: '0-0',
            children: [
              {
                id: '0-0-0',
                title: '0-0-0',
              },
              {
                id: '0-0-1',
                title: '0-0-1',
              },
              {
                id: '0-0-2',
                title: '0-0-2',
              },
            ],
          },
          {
            id: '0-1',
            title: '0-1',
            checkable: true,
            children: [
              {
                id: '0-1-0',
                title: '0-1-0',
              },
              {
                id: '0-1-1',
                title: '0-1-1',
              },
            ],
          },
          {
            id: '0-2',
            title: '0-2',
            checkable: true,
            disabled: true,
            children: [
              {
                id: '0-2-0',
                title: '0-2-0',
              },
              {
                id: '0-2-1',
                title: '0-2-1',
              },
            ],
          },
          {
            id: '0-3',
            title: '0-3',
            children: [
              {
                id: '0-3-0',
                title: '0-3-0',
              },
              {
                id: '0-3-1',
                title: '0-3-1',
              },
              {
                id: '0-3-2',
                title: '0-3-2',
              },
            ],
          },
          {
            id: '0-4',
            title: '0-4',
            checkable: true,
            disabledCheckbox: true,
            children: [
              {
                id: '0-4-0',
                title: '0-4-0',
              },
              {
                id: '0-4-1',
                title: '0-4-1',
              },
            ],
          },
          {
            id: '0-5',
            title: '0-5',
            checkable: true,
            children: [
              {
                id: '0-5-0',
                title: '0-5-0',
              },
              {
                id: '0-5-1',
                title: '0-5-1',
              },
            ],
          },
        ],
      },
      {
        id: '1',
        title: '1',
        children: [
          {
            id: '1-0',
            title: '1-0',
            disabledCheckbox: true,
          },
          {
            id: '1-1',
            title: '1-1',
          },
        ],
      },
    ]

    const getDataOnlyLeafCheckable = (data: any) => {
      return data.map((item) => {
        if (item.children) {
          item.checkable = item.checkable ?? false
          item.children = getDataOnlyLeafCheckable(item.children)
        } else {
          item.checkable = true
        }

        return item
      })
    }

    const dataOnlyLeafCheckable = getDataOnlyLeafCheckable(data)

    return dataOnlyLeafCheckable
  })

  return (
    <>
      <h1>SelectChange</h1>
      <div className="cascader-select-change__wrap">
        <CheckCascader
          style={{ width: 240 }}
          placeholder="请选择品类"
          changeOnSelect
          expandTrigger="hover"
          searchPlaceholder="请输入搜索内容"
          data={dataOnlyLeafCheckable}
        />
      </div>
    </>
  )
}
