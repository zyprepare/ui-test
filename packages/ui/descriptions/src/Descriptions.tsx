import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { invariant, __DEV__ } from '@hi-ui/env'
import { HiBaseHTMLProps } from '@hi-ui/core'
import { cloneElement, toArray } from './util'
import { Row } from './Row'
import {
  DescriptionsAppearanceEnum,
  DescriptionsLabelPlacementEnum,
  DescriptionsPlacementEnum,
} from './types'

const DESCRIPTIONS_PREFIX = getPrefixCls('descriptions')

/**
 * TODO: What is Descriptions
 */
export const Descriptions = forwardRef<HTMLDivElement | null, DescriptionsProps>(
  (
    {
      prefixCls = DESCRIPTIONS_PREFIX,
      role = 'descriptions',
      className,
      children,
      column = 3,
      placement = 'horizontal',
      appearance = 'unset',
      labelPlacement = 'left',
      labelWidth,
      ...rest
    },
    ref
  ) => {
    const noBackground = appearance === 'unset' && labelPlacement === 'right'
    const vertical = placement === 'vertical'
    const bordered = appearance === 'table' || noBackground

    const rows = computeRows(children, column)

    const cls = cx(
      prefixCls,
      appearance && `${prefixCls}--appearance-${appearance}`,
      placement && `${prefixCls}--placement-${placement}`,
      labelPlacement && `${prefixCls}--label-placement-${labelPlacement}`,
      className
    )

    return (
      <div ref={ref} role={role} className={cls} {...rest}>
        <table className={`${prefixCls}__table`}>
          <tbody className={`${prefixCls}__tbody`}>
            {rows.map((row, index) => (
              <Row
                key={index}
                index={index}
                prefixCls={prefixCls}
                row={row}
                vertical={vertical}
                bordered={bordered}
                noBackground={noBackground}
                labelPlacement={labelPlacement}
                rootLabelWidth={labelWidth}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
)

export interface DescriptionsProps extends HiBaseHTMLProps<'div'> {
  /**
   * ?????????????????????'horizontal'
   */
  placement?: DescriptionsPlacementEnum
  /**
   * ?????????????????????table?????????unset
   */
  appearance?: DescriptionsAppearanceEnum
  /**
   * ???????????????????????????DescriptionItems?????????
   */
  column?: number
  /**
   * label????????????
   */
  labelPlacement?: DescriptionsLabelPlacementEnum
  /**
   * label??????
   */
  labelWidth?: React.ReactText
}

if (__DEV__) {
  Descriptions.displayName = 'Descriptions'
}

function computeRows(children: React.ReactNode, column: number) {
  if (!Array.isArray(children)) return []

  const childrenNodes = toArray(children)

  const rows: React.ReactElement[][] = []

  let rowItems: React.ReactElement[] = []
  let rowRestCol = column
  let nextColumn = column

  // ?????? column ??????????????????????????????
  childrenNodes.forEach((node: React.ReactElement, index: number) => {
    let colSpan = getColSpan(node)
    const rowSpan = node?.props?.rowSpan ?? 1

    if (rowSpan > 1) {
      nextColumn -= colSpan
    }

    if (colSpan < 1) {
      invariant(false, 'The colSpan should be a positive integer in Descriptions component.')
      colSpan = 1
    }

    if (index === children.length - 1) {
      rowItems.push(computeFilledItem(node, undefined, rowRestCol))
      rows.push(rowItems)
      return
    }

    if (colSpan < rowRestCol) {
      rowRestCol -= colSpan
      rowItems.push(node)
    } else {
      rowItems.push(computeFilledItem(node, colSpan, rowRestCol))
      rows.push(rowItems)
      rowRestCol = nextColumn
      nextColumn = column
      rowItems = []
    }
  })
  return rows
}

function computeFilledItem(
  node: React.ReactElement,
  colSpan: number | undefined,
  rowRestCol: number
) {
  let clone: React.ReactElement = node

  if (colSpan === undefined || colSpan > rowRestCol) {
    clone = cloneElement(node, {
      colSpan: rowRestCol,
    })
  }

  return clone
}

const getColSpan = (node: React.ReactElement) => {
  const span = node?.props?.span
  let colSpan = node?.props?.colSpan

  if (typeof span === 'number') {
    if (typeof colSpan !== 'number') {
      colSpan = span
    }

    invariant(false, 'Please use `colSpan` prop instead of `span` in Descriptions.')
  }

  return colSpan ?? 1
}
