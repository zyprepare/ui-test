
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-arrow-right-outlined')

export const ArrowRightOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7913"  ><path d="M631.168 268.501333a42.666667 42.666667 0 0 0-2.496 57.621334l2.496 2.709333L771.690667 469.333333H149.333333a42.666667 42.666667 0 1 0 0 85.333334h622.314667l-140.48 140.501333a42.666667 42.666667 0 0 0-2.496 57.621333l2.496 2.709334a42.666667 42.666667 0 0 0 57.621333 2.496l2.709334-2.496 213.333333-213.333334 2.026667-2.176 0.32-0.341333-2.346667 2.517333a43.157333 43.157333 0 0 0 6.826667-8.874666A42.496 42.496 0 0 0 917.333333 512v-0.64l-0.064-1.856L917.333333 512a43.178667 43.178667 0 0 0-0.938666-8.938667 42.261333 42.261333 0 0 0-9.066667-18.517333l-0.149333-0.192a42.922667 42.922667 0 0 0-2.346667-2.517333l-213.333333-213.333334a42.666667 42.666667 0 0 0-60.330667 0z" p-id="7914"></path></svg>
    )
  }
)

if (__DEV__) {
  ArrowRightOutlined.displayName = 'ArrowRightOutlined'
}
  