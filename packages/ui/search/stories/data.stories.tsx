import React from 'react'
import Search from '../src'

/**
 * @title 关键词联想数据
 * @desc 输入搜索关键词时，可以自动联想匹配的关键字，提高检索效率
 */
export const Data = () => {
  return (
    <>
      <h1>带关联数据</h1>
      <div className="search-basic__wrap">
        <div>
          <h2>普通数据</h2>
          <Search
            style={{ width: 260 }}
            placeholder="搜索关键字"
            data={[
              {
                id: 'miphone',
                title: '手机',
              },
              {
                id: 'live',
                title: '智能生活',
              },
            ]}
            onSearch={(keyword) => {
              console.log('Input Value', keyword)
            }}
          />
        </div>
        <div>
          <h2>分组</h2>
          <Search
            style={{ width: 260 }}
            placeholder="搜索关键字"
            data={[
              {
                id: 'miphone',
                title: '手机',
                children: [
                  {
                    id: 1,
                    title: '小米9 Pro',
                  },
                  {
                    id: 2,
                    title: '小米9 探索版',
                  },
                  {
                    id: 3,
                    title: '小米9 CC 美图定制版',
                  },
                ],
              },
              {
                id: 'live',
                title: '智能生活',
                children: [
                  {
                    id: 4,
                    title: '小米 手环',
                  },
                  {
                    id: 5,
                    title: '小米 净水器',
                  },
                  {
                    id: 6,
                    title: '小米 小爱音响',
                  },
                ],
              },
            ]}
            // onSearch={(keyword) => {
            //   console.log('Input Value', keyword)
            //   keyword && alert('Input Value: ' + keyword)
            // }}
          />
        </div>
      </div>
    </>
  )
}
