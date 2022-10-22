
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-dislike-outlined')

export const DislikeOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M620.352 900.16l18.474667-10.666667a149.354667 149.354667 0 0 0 62.890666-187.477333h110.698667a128 128 0 0 0 126.72-146.090667l-48.768-341.333333a128 128 0 0 0-126.72-109.909333H426.666667a127.530667 127.530667 0 0 0-85.333334 32.597333 127.530667 127.530667 0 0 0-85.333333-32.597333h-42.666667a128 128 0 0 0-128 128v298.666666a128 128 0 0 0 128 128h42.666667c22.826667 0 44.224-5.973333 62.784-16.426666 5.184 8.106667 11.285333 15.616 18.133333 22.357333L445.504 853.333333a128 128 0 0 0 174.848 46.848zM384 232.384v0.298667a42.666667 42.666667 0 0 1 39.466667-42.538667l3.2-0.128h336.981333a42.666667 42.666667 0 0 1 41.642667 33.365333l0.597333 3.264 48.768 341.333334a42.666667 42.666667 0 0 1-39.04 48.597333l-3.2 0.106667H572.821333l50.346667 118.656a64.021333 64.021333 0 0 1-23.594667 78.144l-3.413333 2.112-18.474667 10.666666a42.666667 42.666667 0 0 1-56.533333-12.8L519.402667 810.666667l-114.346667-198.08-8.277333-8.106667a42.24 42.24 0 0 1-12.586667-26.581333l-0.170667-3.84v-41.728-299.925334zM298.645333 531.84l0.021334-0.490667a42.666667 42.666667 0 0 1-39.466667 42.56l-3.2 0.106667h-42.666667a42.666667 42.666667 0 0 1-42.56-39.466667L170.666667 531.349333v-298.666666a42.666667 42.666667 0 0 1 39.466666-42.538667l3.2-0.128h42.666667a42.666667 42.666667 0 0 1 42.56 39.488l0.106667 2.837333-0.021334 299.498667z" p-id="39325"></path></svg>
    )
  }
)

if (__DEV__) {
  DislikeOutlined.displayName = 'DislikeOutlined'
}
  