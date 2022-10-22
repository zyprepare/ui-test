
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-start-date-filled')

export const StartDateFilled = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M874.666667 490.666667a42.666667 42.666667 0 0 1 42.666666 42.666666v256a128 128 0 0 1-128 128H234.666667a128 128 0 0 1-128-128V533.333333a42.666667 42.666667 0 0 1 42.666666-42.666666h725.333334z m-533.333334 106.666666h-85.333333a42.666667 42.666667 0 1 0 0 85.333334h85.333333a42.666667 42.666667 0 1 0 0-85.333334zM661.333333 64a42.666667 42.666667 0 0 1 42.666667 42.666667v42.666666h85.333333a128 128 0 0 1 128 128v85.333334a42.666667 42.666667 0 0 1-42.666666 42.666666H149.333333a42.666667 42.666667 0 0 1-42.666666-42.666666v-85.333334a128 128 0 0 1 128-128h85.333333V106.666667a42.666667 42.666667 0 1 1 85.333333 0v42.666666h213.333334V106.666667a42.666667 42.666667 0 0 1 42.666666-42.666667z" p-id="15311"></path></svg>
    )
  }
)

if (__DEV__) {
  StartDateFilled.displayName = 'StartDateFilled'
}
  