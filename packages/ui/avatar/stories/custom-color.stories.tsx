import React from 'react'
import Avatar from '../src'

/**
 * @title 自定义颜色
 * @desc 设置 style 自定义头像的背景色
 *
 */
export const CustomColor = () => {
  return (
    <>
      <h1>CustomColor</h1>
      <div
        className="avatar-custom-color__wrap"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}
      >
        <Avatar initials="M" style={{ backgroundColor: '#237ffa' }} />
        <Avatar initials="H" style={{ backgroundColor: '#9772fb' }} />
        <Avatar initials="Z" style={{ backgroundColor: '#0daeff' }} />
        <Avatar initials="Q" style={{ backgroundColor: '#38d677' }} />
        <Avatar initials="P" style={{ backgroundColor: '#fab007' }} />
        <Avatar initials="Y" style={{ backgroundColor: '#fe7940' }} />
      </div>
    </>
  )
}
