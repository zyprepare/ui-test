import React from 'react'
import notification from '../src'
import Button from '@hi-ui/button'

/**
 * @title 取消自动关闭
 */
export const AutoClose = () => {
  return (
    <>
      <h1>AutoClose</h1>
      <div className="notification-auto-close">
        {/* <Message></Message> */}
        <Button
          onClick={() => {
            notification.open({
              autoClose: false,
              title: '数据备份通知',
              content:
                '各位同学请注意，将于2019.08.10 00:00:00 -08:00：00 期间进行系统服务器升级维护，请做好数据备份工作，以防丢失。带来不便，敬请谅解！',
            })
          }}
        >
          Toast
        </Button>
      </div>
    </>
  )
}
