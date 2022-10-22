
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-edit-outlined')

export const EditOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M874.666667 832a42.666667 42.666667 0 1 1 0 85.333333H149.333333a42.666667 42.666667 0 1 1 0-85.333333h725.333334zM830.741333 143.850667l45.248 45.248a128 128 0 0 1 0 181.013333L501.248 744.874667a85.333333 85.333333 0 0 1-60.352 25.002666h-148.266667a42.666667 42.666667 0 0 1-42.666666-42.666666v-148.266667a85.333333 85.333333 0 0 1 25.002666-60.352L649.728 143.850667a128 128 0 0 1 181.013333 0z m-118.336 58.154666l-2.346666 2.176-374.741334 374.762667v105.6h105.6L815.637333 309.76a42.666667 42.666667 0 0 0 2.176-58.026667l-2.176-2.325333-45.248-45.226667a42.666667 42.666667 0 0 0-58.026666-2.197333z" p-id="45116"></path></svg>
    )
  }
)

if (__DEV__) {
  EditOutlined.displayName = 'EditOutlined'
}
  