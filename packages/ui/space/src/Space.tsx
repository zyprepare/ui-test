import React, { forwardRef, Children, Fragment, useMemo } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { invariant, __DEV__ } from '@hi-ui/env'
import { HiBaseHTMLProps } from '@hi-ui/core'
import { isNullish } from '@hi-ui/type-assertion'

import { handleTransformGap } from './utils'
import { SpaceAlignEnum, SpaceDirectionEnum, SpaceSizeEnum } from './types'

const SPACE_PREFIX = getPrefixCls('space')

/**
 * Space
 * easy to layout
 */
export const Space = forwardRef<HTMLDivElement | null, SpaceProps>(
  (
    {
      prefixCls = SPACE_PREFIX,
      role = 'space',
      inline = true,
      align = 'center',
      direction = 'row',
      size = 'sm',
      wrap = true,
      style,
      className,
      separator,
      split,
      children,
      ...rest
    },
    ref
  ) => {
    const separatorMemo = useMemo(() => {
      if (!isNullish(split)) {
        if (isNullish(separator)) {
          return split
        }

        invariant(false, 'Please use `separator` prop instead of `split` in Result.')
      }

      return separator
    }, [split, separator])

    const childCount = Children.count(children)
    const formatGap = handleTransformGap(size)

    const cls = cx(prefixCls, className)

    return (
      <div
        ref={ref}
        role={role}
        className={cx(cls, { [`${prefixCls}--column-block`]: !inline && direction === 'column' })}
        style={{
          display: inline ? 'inline-flex' : 'flex',
          flexWrap: wrap ? 'wrap' : 'nowrap',
          flexDirection: direction,
          gap: formatGap,
          alignItems: align,
          ...style,
        }}
        {...rest}
      >
        {Children.map(children, (child, index) => {
          const showSplit = !isNullish(separatorMemo) && childCount > index + 1
          return (
            <Fragment key={index}>
              <div className={`${prefixCls}__item`}>{child}</div>
              {showSplit && separatorMemo}
            </Fragment>
          )
        })}
      </div>
    )
  }
)

export interface SpaceProps extends HiBaseHTMLProps<'div'> {
  /**
   * ????????????????????????????????????
   */
  inline?: boolean
  /**
   * ????????????????????????
   */
  align?: SpaceAlignEnum
  /**
   * ?????????????????????????????????????????????
   */
  direction?: SpaceDirectionEnum
  /**
   * ???????????????????????????????????????????????????????????????????????????
   */
  size?: SpaceSizeEnum
  /**
   * ?????????????????????????????????????????????
   */
  separator?: React.ReactNode
  /**
   * @deprecated ????????? `separator` prop ??????
   */
  split?: React.ReactNode
  /**
   * ??????????????????
   */
  wrap?: boolean
}

if (__DEV__) {
  Space.displayName = 'Space'
}
