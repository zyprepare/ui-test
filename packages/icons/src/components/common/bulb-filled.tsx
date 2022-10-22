
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-bulb-filled')

export const BulbFilled = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M682.666667 789.333333v42.666667a128 128 0 0 1-118.442667 127.658667l-4.757333 0.256L554.666667 960h-85.333334a128 128 0 0 1-127.914666-123.2L341.333333 832v-42.666667h341.333334zM512 64c200.298667 0 362.666667 162.368 362.666667 362.666667a362.453333 362.453333 0 0 1-128.917334 277.354666H278.250667a362.453333 362.453333 0 0 1-128.576-261.674666l-0.256-7.893334L149.333333 426.666667c0-200.298667 162.368-362.666667 362.666667-362.666667z m0 170.666667a42.666667 42.666667 0 1 0 0 85.333333 106.666667 106.666667 0 0 1 106.56 102.037333L618.666667 426.666667l0.106666 3.2A42.666667 42.666667 0 0 0 704 426.666667a192 192 0 0 0-192-192z" p-id="15281"></path></svg>
    )
  }
)

if (__DEV__) {
  BulbFilled.displayName = 'BulbFilled'
}
  