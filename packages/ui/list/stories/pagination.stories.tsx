import React from 'react'
import List from '../src'

/**
 * @title 带分页
 */
export const Pagination = () => {
  return (
    <>
      <h1>带分页</h1>
      <div className="list-basic__wrap">
        <List
          data={[
            {
              title: '下单量-指标',
              description: '下单量在交易环节中整体用户下单的数量',
              extra: '最新使用：2019.12.23 下午07:07',
              avatar:
                'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/images/HiUI/logo.png',
              action: '编辑',
            },
            {
              title: '下单量-指标',
              description: '下单量在交易环节中整体用户下单的数量',
              extra: '最新使用：2019.12.23 下午07:07',
              avatar:
                'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/images/HiUI/logo.png',
              action: '编辑',
            },
          ]}
          pagination={{
            total: 200,
            pageSize: 10,
            placement: 'right',
          }}
          render={(dataItem) => {
            return <List.Item {...dataItem} />
          }}
        />
        <List
          style={{ marginBottom: 20 }}
          data={[
            {
              title: '下单量-指标',
              description: '下单量在交易环节中整体用户下单的数量',
              extra: '最新使用：2019.12.23 下午07:07',
              avatar:
                'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/images/HiUI/logo.png',
              action: '编辑',
            },
            {
              title: '下单量-指标',
              description: '下单量在交易环节中整体用户下单的数量',
              extra: '最新使用：2019.12.23 下午07:07',
              avatar:
                'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/images/HiUI/logo.png',
              action: '编辑',
            },
          ]}
          pagination={{
            total: 200,
            pageSize: 10,
            placement: 'left',
          }}
          render={(dataItem) => {
            return <List.Item {...dataItem} />
          }}
        />
        <List
          style={{ marginBottom: 20 }}
          data={[
            {
              title: '下单量-指标',
              description: '下单量在交易环节中整体用户下单的数量',
              extra: '最新使用：2019.12.23 下午07:07',
              avatar:
                'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/images/HiUI/logo.png',
              action: '编辑',
            },
            {
              title: '下单量-指标',
              description: '下单量在交易环节中整体用户下单的数量',
              extra: '最新使用：2019.12.23 下午07:07',
              avatar:
                'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/images/HiUI/logo.png',
              action: '编辑',
            },
          ]}
          pagination={{
            total: 200,
            pageSize: 10,
            placement: 'middle',
          }}
          render={(dataItem) => {
            return <List.Item {...dataItem} />
          }}
        />
      </div>
    </>
  )
}
