import React from 'react'
import Cascader from '../src'

/**
 * @title 受控显隐
 * @desc 自定义控制下拉选项菜单显隐
 */
export const Visible = () => {
  const [visible, setVisible] = React.useState(true)
  const [data] = React.useState([
    {
      id: '手机',
      title: '手机t',
      children: [
        {
          id: '小米',
          title: '小米t',
          children: [
            {
              id: '小米3',
              title: '小米3t',
            },
            {
              id: '小米4',
              title: '小米4t',
            },
          ],
        },
        {
          id: '红米',
          title: '红米t',
          children: [
            {
              id: '红米3',
              title: '红米3t',
            },
            {
              id: '红米4',
              title: '红米4t',
            },
          ],
        },
      ],
    },
    {
      id: '电视',
      title: '电视t',
      children: [
        {
          id: '小米电视4A',
          title: '小米电视4At',
        },
        {
          id: '小米电视4C',
          title: '小米电视4Ct',
        },
      ],
    },
  ])

  return (
    <>
      <h1>Visible</h1>
      <div className="cascader-visible__wrap">
        <Cascader
          style={{ width: 240 }}
          visible={visible}
          onOpen={() => setVisible(true)}
          overlay={{ onOutsideClick: () => setVisible(false) }}
          clearable
          placeholder="请选择品类"
          defaultValue={['手机', '红米', '红米4']}
          data={data}
          onChange={(...args) => {
            console.log('onChange', ...args)
          }}
        />
      </div>
    </>
  )
}
