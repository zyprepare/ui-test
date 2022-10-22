
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-details-outlined')

export const DetailsOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M746.666667 85.333333a128 128 0 0 1 128 128v597.333334a128 128 0 0 1-128 128H277.333333a128 128 0 0 1-128-128V213.333333a128 128 0 0 1 128-128h469.333334z m0 85.333334H277.333333a42.666667 42.666667 0 0 0-42.56 39.466666L234.666667 213.333333v597.333334a42.666667 42.666667 0 0 0 39.466666 42.56L277.333333 853.333333h469.333334a42.666667 42.666667 0 0 0 42.56-39.466666L789.333333 810.666667V213.333333a42.666667 42.666667 0 0 0-39.466666-42.56L746.666667 170.666667z m-128 384a42.666667 42.666667 0 1 1 0 85.333333H405.333333a42.666667 42.666667 0 1 1 0-85.333333h213.333334z m0-170.666667a42.666667 42.666667 0 1 1 0 85.333333H405.333333a42.666667 42.666667 0 1 1 0-85.333333h213.333334z" p-id="44886"></path></svg>
    )
  }
)

if (__DEV__) {
  DetailsOutlined.displayName = 'DetailsOutlined'
}
  