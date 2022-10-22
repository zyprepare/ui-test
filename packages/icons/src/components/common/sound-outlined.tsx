
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-sound-outlined')

export const SoundOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M720.96 240.746667A85.333333 85.333333 0 0 1 725.333333 267.733333v482.197334a85.333333 85.333333 0 0 1-116.266666 79.530666l-186.133334-72.384a127.786667 127.786667 0 0 1-51.733333-37.12A85.013333 85.013333 0 0 1 341.333333 725.333333h-128a128 128 0 0 1-128-128v-192a128 128 0 0 1 128-128h128c11.669333 0 22.805333 2.346667 32.938667 6.592a127.445333 127.445333 0 0 1 54.592-35.776l184.149333-61.376a85.333333 85.333333 0 0 1 107.946667 53.973334zM779.413333 661.333333a42.666667 42.666667 0 0 1 58.304-15.616l73.898667 42.666667a42.666667 42.666667 0 1 1-42.666667 73.898667l-73.898666-42.666667A42.666667 42.666667 0 0 1 779.434667 661.333333zM640 267.733333l-184.149333 61.376a42.666667 42.666667 0 0 0-29.056 37.056l-0.128 3.413334v268.202666a42.666667 42.666667 0 0 0 24 38.357334l3.2 1.408L640 749.930667V267.733333zM341.333333 362.666667h-128a42.666667 42.666667 0 0 0-42.56 39.466666L170.666667 405.333333v192a42.666667 42.666667 0 0 0 39.466666 42.56L213.333333 640h128V362.666667z m554.666667 106.666666a42.666667 42.666667 0 1 1 0 85.333334h-85.333333a42.666667 42.666667 0 1 1 0-85.333334h85.333333z m31.232-192a42.666667 42.666667 0 0 1-15.616 58.282667l-73.898667 42.666667a42.666667 42.666667 0 1 1-42.666666-73.898667l73.898666-42.666667a42.666667 42.666667 0 0 1 58.282667 15.616z" p-id="38995"></path></svg>
    )
  }
)

if (__DEV__) {
  SoundOutlined.displayName = 'SoundOutlined'
}
  