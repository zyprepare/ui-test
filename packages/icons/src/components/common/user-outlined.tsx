
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-user-outlined')

export const UserOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M746.666667 554.666667a170.666667 170.666667 0 1 1 0 341.333333H277.333333a170.666667 170.666667 0 1 1 0-341.333333h469.333334z m0 85.333333H277.333333a85.333333 85.333333 0 0 0-4.266666 170.56L277.333333 810.666667h469.333334a85.333333 85.333333 0 0 0 4.266666-170.56L746.666667 640zM512 85.333333c117.824 0 213.333333 95.509333 213.333333 213.333334s-95.509333 213.333333-213.333333 213.333333-213.333333-95.509333-213.333333-213.333333S394.176 85.333333 512 85.333333z m0 85.333334a128 128 0 1 0 0 256 128 128 0 0 0 0-256z" p-id="38675"></path></svg>
    )
  }
)

if (__DEV__) {
  UserOutlined.displayName = 'UserOutlined'
}
  