
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-certificate-filled')

export const CertificateFilled = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  ><path d="M682.666667 749.418667v155.392a21.333333 21.333333 0 0 1-30.549334 19.242666L512 857.002667l-140.117333 67.050666A21.333333 21.333333 0 0 1 341.333333 904.810667v-155.392A382.421333 382.421333 0 0 0 512 789.333333c61.312 0 119.253333-14.378667 170.666667-39.914666zM512 64c188.522667 0 341.333333 152.810667 341.333333 341.333333s-152.810667 341.333333-341.333333 341.333334S170.666667 593.856 170.666667 405.333333 323.477333 64 512 64z m-8.554667 209.728l-1.002666 1.642667-40.597334 82.261333-90.773333 13.184a10.666667 10.666667 0 0 0-7.168 16.746667l1.258667 1.450666 65.685333 64.021334-15.509333 90.410666a10.666667 10.666667 0 0 0 13.696 11.968l1.770666-0.725333L512 512l81.194667 42.666667a10.666667 10.666667 0 0 0 15.616-9.301334l-0.149334-1.92-15.509333-90.410666 65.685333-64.021334a10.666667 10.666667 0 0 0-4.053333-17.749333l-1.856-0.426667-90.773333-13.226666-40.597334-82.24a10.666667 10.666667 0 0 0-16.874666-3.029334l-1.237334 1.386667z" p-id="9850"></path></svg>
    )
  }
)

if (__DEV__) {
  CertificateFilled.displayName = 'CertificateFilled'
}
  