
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-file-ppt-outlined')

export const FilePptOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, size, style: styleProp, ...rest }, ref) => {
    const cls = cx(prefixCls, className)
    const style = { fontSize: size, ...styleProp }

    return (
      <svg className={cls} ref={ref} role="icon" style={style} {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M627.498667 97.834667l-0.362667-0.384c5.973333 3.562667 11.52 7.893333 16.533333 12.885333l205.994667 205.994667c5.013333 5.013333 9.322667 10.56 12.885333 16.533333a41.813333 41.813333 0 0 1 11.733334 35.882667c0.256 2.624 0.384 5.269333 0.384 7.936V810.666667a128 128 0 0 1-128 128H277.333333a128 128 0 0 1-128-128V213.333333a128 128 0 0 1 128-128h305.984c2.666667 0 5.333333 0.128 7.978667 0.362667l0.64-0.064a41.749333 41.749333 0 0 1 35.562667 12.202667zM554.666667 170.666667H277.333333a42.666667 42.666667 0 0 0-42.56 39.466666L234.666667 213.333333v597.333334a42.666667 42.666667 0 0 0 39.466666 42.56L277.333333 853.333333h469.333334a42.666667 42.666667 0 0 0 42.56-39.466666L789.333333 810.666667V405.333333h-192a42.666667 42.666667 0 0 1-42.56-39.466666L554.666667 362.666667l-0.021334-192z m-11.648 308.992l5.610666 0.128c22.058667 0.896 39.850667 7.189333 53.397334 18.88 14.656 12.672 21.994667 32.277333 21.994666 58.837333 0 29.013333-7.338667 49.493333-21.994666 61.504-14.677333 11.989333-35.626667 17.984-62.848 17.984h-52.16V725.333333h-50.986667V479.658667h106.986667z m-8.170667 42.666666h-47.829333v72.341334h47.829333c12.117333 0 21.546667-2.944 28.266667-8.832 6.72-5.888 10.069333-15.232 10.069333-28.010667s-3.349333-21.888-10.069333-27.306667c-6.741333-5.461333-16.149333-8.192-28.266667-8.192zM640 231.04V320h88.981333L640 231.018667z" p-id="39515"></path></svg>
    )
  }
)

if (__DEV__) {
  FilePptOutlined.displayName = 'FilePptOutlined'
}
  