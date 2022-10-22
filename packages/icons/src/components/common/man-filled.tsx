
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-man-filled')

export const ManFilled = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M875.306667 106.666667l0.917333 0.021333 0.277333 0.021333h0.384a42.965333 42.965333 0 0 1 3.370667 0.32l0.725333 0.106667a42.538667 42.538667 0 0 1 5.034667 1.066667l0.341333 0.085333 0.341334 0.106667 0.298666 0.085333c2.112 0.64 4.16 1.429333 6.122667 2.368l0.128 0.064 0.149333 0.064 1.92 1.024a42.602667 42.602667 0 0 1 3.498667 2.133333l0.832 0.597334a46.144 46.144 0 0 1 2.474667 1.941333l2.709333 2.474667 1.450667 1.6-1.450667-1.578667a43.157333 43.157333 0 0 1 4.416 5.184l0.597333 0.832a46.122667 46.122667 0 0 1 1.642667 2.56l0.106667 0.192 0.426666 0.725333a42.389333 42.389333 0 0 1 5.248 18.304l0.021334 0.64 0.021333 0.64L917.333333 320a42.666667 42.666667 0 1 1-85.333333 0v-67.669333l-187.456 187.477333A297.344 297.344 0 0 1 704 618.666667c0 164.949333-133.717333 298.666667-298.666667 298.666666S106.666667 783.616 106.666667 618.666667s133.717333-298.666667 298.666666-298.666667c67.072 0 129.002667 22.122667 178.858667 59.456L771.626667 192H704a42.666667 42.666667 0 1 1 0-85.333333h171.306667z" p-id="15271"></path></svg>
    )
  }
)

if (__DEV__) {
  ManFilled.displayName = 'ManFilled'
}
  