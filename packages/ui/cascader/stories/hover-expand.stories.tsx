import React from 'react'
import Cascader from '../src'

/**
 * @title hover 展开次级菜单
 */
export const HoverExpand = () => {
  const [data] = React.useState([
    {
      id: '手机',
      title: '手机',
      children: [
        {
          id: '小米',
          title: '小米',
          children: [
            {
              id: '小米3',
              title: '小米3',
            },
            {
              id: '小米4',
              title: '小米4',
            },
          ],
        },
        {
          id: '红米',
          title: '红米',
          children: [
            {
              id: '红米3',
              title: '红米3',
            },
            {
              id: '红米4',
              title: '红米4',
            },
          ],
        },
      ],
    },
    {
      id: '电视',
      title: '电视',
      children: [
        {
          id: '小米电视4A',
          title: '小米电视4A',
        },
        {
          id: '小米电视4C',
          title: '小米电视4C',
        },
      ],
    },
  ])

  return (
    <>
      <h1>HoverExpand</h1>
      <div className="cascader-hover-expand__wrap">
        <Cascader
          style={{ width: 240 }}
          searchable
          clearable
          expandTrigger="hover"
          placeholder="请选择品类"
          defaultValue={['手机', '小米', '红米']}
          data={data}
        ></Cascader>
      </div>
    </>
  )
}
