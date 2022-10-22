
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-home-outlined')

export const HomeOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M576.128 143.786667l277.333333 160.576A128 128 0 0 1 917.333333 415.125333V789.333333a128 128 0 0 1-128 128H234.666667a128 128 0 0 1-128-128V415.146667a128 128 0 0 1 63.872-110.784l277.333333-160.576a128 128 0 0 1 128.256 0z m-82.133333 72.106666l-3.370667 1.749334-277.333333 160.554666a42.666667 42.666667 0 0 0-21.141334 33.450667L192 415.125333V789.333333a42.666667 42.666667 0 0 0 39.466667 42.56L234.666667 832h234.666666v-192a42.666667 42.666667 0 1 1 85.333334 0v192h234.666666a42.666667 42.666667 0 0 0 42.56-39.466667L832 789.333333V415.146667a42.666667 42.666667 0 0 0-18.346667-35.072l-2.944-1.877334-277.333333-160.554666a42.666667 42.666667 0 0 0-39.381333-1.749334z" p-id="39565"></path></svg>
    )
  }
)

if (__DEV__) {
  HomeOutlined.displayName = 'HomeOutlined'
}
  