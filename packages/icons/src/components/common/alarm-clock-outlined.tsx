
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-alarm-clock-outlined')

export const AlarmClockOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M512 149.333333c212.074667 0 384 171.925333 384 384s-171.925333 384-384 384S128 745.408 128 533.333333 299.925333 149.333333 512 149.333333z m0 85.333334c-164.949333 0-298.666667 133.717333-298.666667 298.666666s133.717333 298.666667 298.666667 298.666667 298.666667-133.717333 298.666667-298.666667-133.717333-298.666667-298.666667-298.666666z m0 44.970666a42.666667 42.666667 0 0 1 42.56 39.488l0.106667 3.2L554.645333 490.666667h126.912a42.666667 42.666667 0 0 1 42.56 39.466666l0.106667 3.2a42.666667 42.666667 0 0 1-39.466667 42.56l-3.2 0.106667H512a42.666667 42.666667 0 0 1-42.56-39.466667L469.333333 533.333333v-211.029333a42.666667 42.666667 0 0 1 42.666667-42.666667zM262.314667 97.834667a42.666667 42.666667 0 0 1 2.496 57.621333l-2.496 2.709333-104.149334 104.149334A42.666667 42.666667 0 0 1 95.36 204.693333l2.496-2.730666 104.128-104.128a42.666667 42.666667 0 0 1 60.352 0z m496.853333 0a42.666667 42.666667 0 0 1 60.330667 0l104.149333 104.128 2.496 2.730666a42.666667 42.666667 0 0 1-62.848 57.6l-104.128-104.106666-2.496-2.730667a42.666667 42.666667 0 0 1 2.496-57.621333z" p-id="39105"></path></svg>
    )
  }
)

if (__DEV__) {
  AlarmClockOutlined.displayName = 'AlarmClockOutlined'
}
  