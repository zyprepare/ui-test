
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-app-store-outlined')

export const AppStoreOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M341.333333 554.666667a128 128 0 0 1 128 128v106.666666a128 128 0 0 1-128 128h-106.666666a128 128 0 0 1-128-128v-106.666666a128 128 0 0 1 128-128h106.666666z m448 0a128 128 0 0 1 128 128v106.666666a128 128 0 0 1-128 128h-106.666666a128 128 0 0 1-128-128v-106.666666a128 128 0 0 1 128-128h106.666666z m-448 85.333333h-106.666666a42.666667 42.666667 0 0 0-42.56 39.466667L192 682.666667v106.666666a42.666667 42.666667 0 0 0 39.466667 42.56L234.666667 832h106.666666a42.666667 42.666667 0 0 0 42.56-39.466667L384 789.333333v-106.666666a42.666667 42.666667 0 0 0-39.466667-42.56L341.333333 640z m448 0h-106.666666a42.666667 42.666667 0 0 0-42.56 39.466667L640 682.666667v106.666666a42.666667 42.666667 0 0 0 39.466667 42.56L682.666667 832h106.666666a42.666667 42.666667 0 0 0 42.56-39.466667L832 789.333333v-106.666666a42.666667 42.666667 0 0 0-39.466667-42.56L789.333333 640zM341.333333 106.666667a128 128 0 0 1 128 128v106.666666a128 128 0 0 1-128 128h-106.666666a128 128 0 0 1-128-128v-106.666666a128 128 0 0 1 128-128h106.666666z m448 0a128 128 0 0 1 128 128v106.666666a128 128 0 0 1-128 128h-106.666666a128 128 0 0 1-128-128v-106.666666a128 128 0 0 1 128-128h106.666666zM341.333333 192h-106.666666a42.666667 42.666667 0 0 0-42.56 39.466667L192 234.666667v106.666666a42.666667 42.666667 0 0 0 39.466667 42.56L234.666667 384h106.666666a42.666667 42.666667 0 0 0 42.56-39.466667L384 341.333333v-106.666666a42.666667 42.666667 0 0 0-39.466667-42.56L341.333333 192z m448 0h-106.666666a42.666667 42.666667 0 0 0-42.56 39.466667L640 234.666667v106.666666a42.666667 42.666667 0 0 0 39.466667 42.56L682.666667 384h106.666666a42.666667 42.666667 0 0 0 42.56-39.466667L832 341.333333v-106.666666a42.666667 42.666667 0 0 0-39.466667-42.56L789.333333 192z" p-id="39115"></path></svg>
    )
  }
)

if (__DEV__) {
  AppStoreOutlined.displayName = 'AppStoreOutlined'
}
  