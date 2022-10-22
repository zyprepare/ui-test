
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-expression-filled')

export const ExpressionFilled = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m-118.656 496.128a42.666667 42.666667 0 0 0-79.061333 32.106667 213.376 213.376 0 0 0 395.264 0.426667 42.666667 42.666667 0 1 0-78.997334-32.277334 128.042667 128.042667 0 0 1-237.226666-0.256zM405.333333 362.666667a42.666667 42.666667 0 0 0-42.666666 42.666666v42.666667a42.666667 42.666667 0 1 0 85.333333 0v-42.666667a42.666667 42.666667 0 0 0-42.666667-42.666666z m213.333334 0a42.666667 42.666667 0 0 0-42.666667 42.666666v42.666667a42.666667 42.666667 0 1 0 85.333333 0v-42.666667a42.666667 42.666667 0 0 0-42.666666-42.666666z" p-id="15091"></path></svg>
    )
  }
)

if (__DEV__) {
  ExpressionFilled.displayName = 'ExpressionFilled'
}
  