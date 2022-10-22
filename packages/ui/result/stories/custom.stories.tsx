import React from 'react'
import Result, {
  ResultImageClientError,
  ResultImageNetError,
  ResultImageForbidden,
  ResultImageNotFound,
  ResultImageServerError,
} from '../src'
import Button from '@hi-ui/button'

/**
 * @title 自定义指示器
 * @desc 通过 `image` 完全自定义指示器，可以是 img 标签
 */
export const Custom = () => {
  return (
    <>
      <h1>自定义指示器</h1>
      <div className="result-basic__wrap">
        <Result
          image={<ResultImageClientError />}
          title="页面发送错误"
          content="这是对页面错误的说明文案"
          children={[
            <Button key="refresh">刷新</Button>,
            <Button type="primary" key="back">
              返回
            </Button>,
          ]}
        />
        <Result
          image={<ResultImageNetError />}
          title="网络连接失败"
          content="这是对网络连接失败的说明文案"
          children={[
            <Button key="refresh">刷新</Button>,
            <Button type="primary" key="back">
              返回
            </Button>,
          ]}
        />
        <Result
          image={<ResultImageForbidden />}
          title="暂无权限"
          content="这是对暂无权限的说明文案"
          children={[
            <Button key="refresh">立即申请</Button>,
            <Button type="primary" key="back">
              返回
            </Button>,
          ]}
        />
        <Result
          image={<ResultImageNotFound />}
          title="404"
          content="抱歉，请求资源不存在！"
          children={<Button type="primary">返回首页</Button>}
        />
        <Result
          image={<ResultImageServerError />}
          title="500"
          content="抱歉，服务器开小差了！"
          children={<Button type="primary">刷新</Button>}
        />
      </div>
    </>
  )
}
