
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-audio-filled')

export const AudioFilled = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M832 362.666667a42.666667 42.666667 0 0 1 42.666667 42.666666c0 185.856-139.797333 339.050667-320 360.192V896a42.666667 42.666667 0 1 1-85.333334 0v-130.474667C289.152 744.405333 149.333333 591.189333 149.333333 405.333333a42.666667 42.666667 0 1 1 85.333334 0c0 153.173333 124.16 277.333333 277.333333 277.333334s277.333333-124.16 277.333333-277.333334a42.666667 42.666667 0 0 1 42.666667-42.666666zM512 85.333333a192 192 0 0 1 192 192v149.333334a192 192 0 0 1-384 0v-149.333334a192 192 0 0 1 192-192z" p-id="14891"></path></svg>
    )
  }
)

if (__DEV__) {
  AudioFilled.displayName = 'AudioFilled'
}
  