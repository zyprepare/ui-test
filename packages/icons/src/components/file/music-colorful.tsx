
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-music-colorful')

export const MusicColorful = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M643.669333 110.336l205.994667 205.994667A85.333333 85.333333 0 0 1 874.666667 376.682667V810.666667a128 128 0 0 1-128 128H277.333333a128 128 0 0 1-128-128V213.333333a128 128 0 0 1 128-128h305.984a85.333333 85.333333 0 0 1 60.352 25.002667z" fill="#A889FE" /><path d="M554.666667 128v234.666667a42.666667 42.666667 0 0 0 42.666666 42.666666h234.666667c38.016 0 57.045333-45.952 30.165333-72.832l-234.666666-234.666666C600.618667 70.954667 554.666667 89.984 554.666667 128z" fill="#D1B7FE" /><path d="M512 448a21.333333 21.333333 0 0 1 21.333333 21.333333h42.666667a85.333333 85.333333 0 0 1 85.226667 81.066667L661.333333 554.666667h-64a85.12 85.12 0 0 1-64-28.885334V704a85.333333 85.333333 0 1 1-42.645333-73.898667L490.666667 469.333333a21.333333 21.333333 0 0 1 21.333333-21.333333z" fill="#FFFFFF" /></svg>
    )
  }
)

if (__DEV__) {
  MusicColorful.displayName = 'MusicColorful'
}
  