
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-data-monitor-outlined')

export const DataMonitorOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M789.333333 106.666667a128 128 0 0 1 128 128v384a128 128 0 0 1-128 128H554.666667v85.333333h128a42.666667 42.666667 0 1 1 0 85.333333H341.333333a42.666667 42.666667 0 1 1 0-85.333333h128v-85.333333H234.666667a128 128 0 0 1-128-128V234.666667a128 128 0 0 1 128-128h554.666666z m0 85.333333H234.666667a42.666667 42.666667 0 0 0-42.56 39.466667L192 234.666667v384a42.666667 42.666667 0 0 0 39.466667 42.56L234.666667 661.333333h554.666666a42.666667 42.666667 0 0 0 42.56-39.466666L832 618.666667V234.666667a42.666667 42.666667 0 0 0-39.466667-42.56L789.333333 192z m-56 127.296a42.666667 42.666667 0 0 1 2.496 57.621333l-2.496 2.730667-126.101333 126.101333a64 64 0 0 1-87.466667 2.88l-3.050666-2.88-65.066667-65.045333-101.482667 101.461333a42.666667 42.666667 0 0 1-57.621333 2.496l-2.709333-2.496a42.666667 42.666667 0 0 1-2.496-57.621333l2.496-2.709333 116.565333-116.565334a64 64 0 0 1 87.424-2.88l3.072 2.88 65.066667 65.045334 111.04-111.018667a42.666667 42.666667 0 0 1 60.330666 0z" p-id="39365"></path></svg>
    )
  }
)

if (__DEV__) {
  DataMonitorOutlined.displayName = 'DataMonitorOutlined'
}
  