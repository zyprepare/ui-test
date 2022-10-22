
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-moon-filled')

export const MoonFilled = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M466.56 87.722667C250.666667 110.592 85.333333 293.269333 85.333333 512c0 235.648 191.018667 426.666667 426.666667 426.666667 216.32 0 397.674667-161.792 423.530667-374.741334 5.12-42.389333-48.234667-65.216-75.328-32.213333C809.941333 592.853333 733.525333 629.333333 650.666667 629.333333c-147.605333 0-266.666667-114.965333-266.666667-256 0-83.413333 41.834667-160.170667 111.296-208.042666 36.416-25.109333 15.274667-82.218667-28.714667-77.568z" p-id="15391"></path></svg>
    )
  }
)

if (__DEV__) {
  MoonFilled.displayName = 'MoonFilled'
}
  