
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-business-card-transverse-outlined')

export const BusinessCardTransverseOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4908"  ><path d="M810.666667 170.666667a128 128 0 0 1 128 128v426.666666a128 128 0 0 1-128 128H213.333333a128 128 0 0 1-128-128V298.666667a128 128 0 0 1 128-128h597.333334z m0 85.333333H213.333333a42.666667 42.666667 0 0 0-42.56 39.466667L170.666667 298.666667v426.666666a42.666667 42.666667 0 0 0 39.466666 42.56L213.333333 768h597.333334a42.666667 42.666667 0 0 0 42.56-39.466667L853.333333 725.333333V298.666667a42.666667 42.666667 0 0 0-39.466666-42.56L810.666667 256z m-426.666667 85.333333a85.333333 85.333333 0 1 1 0 170.666667 85.333333 85.333333 0 0 1 0-170.666667z" p-id="4909"></path><path d="M384 490.666667a149.333333 149.333333 0 0 1 149.333333 149.333333 42.666667 42.666667 0 0 1-85.226666 3.2L448 640a64 64 0 0 0-127.893333-3.754667L320 640a42.666667 42.666667 0 1 1-85.333333 0 149.333333 149.333333 0 0 1 149.333333-149.333333z m298.666667 42.666666a42.666667 42.666667 0 1 1 0 85.333334h-64a42.666667 42.666667 0 1 1 0-85.333334h64z m64-128a42.666667 42.666667 0 1 1 0 85.333334h-128a42.666667 42.666667 0 1 1 0-85.333334h128z" p-id="4910"></path></svg>
    )
  }
)

if (__DEV__) {
  BusinessCardTransverseOutlined.displayName = 'BusinessCardTransverseOutlined'
}
  