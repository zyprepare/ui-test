import React from 'react'
import Button from '../src'

/**
 * @title 基础用法
 */
export const Basic = () => {
  return (
    <>
      <h1>不同类型</h1>
      <div className="button-basic__wrap">
        <Button type="primary">主要按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="default">中性按钮</Button>
        <Button type="danger">危险按钮</Button>
        <Button type="success">成功按钮</Button>
      </div>
    </>
  )
}
