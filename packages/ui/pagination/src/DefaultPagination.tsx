import React, { forwardRef, useCallback, useMemo } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { PagerButton } from './PagerButton'
import { Pager } from './Pager'
import { calculatePage } from './util'
import { PageOption } from './PageOption'
import { useLocaleContext, HiBaseHTMLProps } from '@hi-ui/core'
import { PageJumper } from './PageJumper'
import { useUncontrolledState } from '@hi-ui/use-uncontrolled-state'
import { useLatestCallback } from '@hi-ui/use-latest'
import { isFunction } from '@hi-ui/type-assertion'

const _role = 'pagination'
const _prefix = getPrefixCls(_role)

const calculatePageCount = (total: number, pageSize: number) => Math.ceil(total / pageSize)

/**
 * TODO: What is Pagination
 */
export const DefaultPagination = forwardRef<HTMLDivElement | null, PaginationProps>(
  (
    {
      prefixCls = _prefix,
      role = _role,
      onChange,
      className,
      current: currentProp,
      defaultCurrent = 1,
      pageSizeOptions,
      pageSize: pageSizeProp,
      max = 2,
      total,
      onPageSizeChange,
      showTotal,
      showJumper,
      showPagers = true,
      type = 'default',
      autoHide = false,
      ...rest
    },
    ref
  ) => {
    const i18n = useLocaleContext()

    const totalText = i18n.get('pagination.total')
    const itemText = i18n.get('pagination.item')
    const itemPerPageText = i18n.get('pagination.itemPerPage')
    const gotoText = i18n.get('pagination.goto')
    const pageText = i18n.get('pagination.page')

    const _pageSizeOptions = useMemo(() => {
      if (pageSizeOptions) {
        return pageSizeOptions.map((opt) => ({
          id: opt,
          title: `${opt} ${itemText} / ${itemPerPageText}`,
        }))
      }
    }, [pageSizeOptions, itemText, itemPerPageText])

    const [current, trySetCurrent] = useUncontrolledState(
      defaultCurrent,
      currentProp,
      onChange,
      Object.is
    )

    const proxyTrySetCurrent = useLatestCallback((nextCurrent: number, size?: number) => {
      const nextPageSize = size === undefined ? pageSize : size
      trySetCurrent(nextCurrent, current, nextPageSize)
    })

    const [pageSize, trySetPageSize] = useUncontrolledState(
      10,
      pageSizeProp,
      (nextPageSize: number) => {
        if (!isFunction(onPageSizeChange)) return

        const pageCount = calculatePageCount(total, nextPageSize)
        const nextCurrent = current > pageCount ? pageCount : current

        onPageSizeChange(nextPageSize, nextCurrent)
        proxyTrySetCurrent(nextCurrent, nextPageSize)
      },
      Object.is
    )

    const onClick = useCallback(
      (page) => {
        proxyTrySetCurrent(page)
      },
      [proxyTrySetCurrent]
    )

    const cls = cx(prefixCls, className)
    const maxPage = calculatePage(total, pageSize)

    const renderPagers = useCallback(() => {
      let leftBuffer, rightBuffer
      const pagers = []
      if (max * 2 + 1 + 2 >= maxPage) {
        leftBuffer = 1
        rightBuffer = maxPage
      } else if (maxPage - current <= max) {
        rightBuffer = maxPage
        leftBuffer = maxPage - 2 * max - 1
        leftBuffer = leftBuffer <= 1 ? 1 : leftBuffer
      } else if (current - max <= 1) {
        leftBuffer = 1
        rightBuffer = 2 * max + leftBuffer + 1
        rightBuffer = rightBuffer >= maxPage ? maxPage : rightBuffer
      } else {
        leftBuffer = current - max
        rightBuffer = current + max
      }
      if (leftBuffer !== 1) {
        pagers.push(
          <Pager page={1} active={current === 1} key={1} onClick={onClick} prefixCls={prefixCls} />
        )
      }
      if (leftBuffer > 2) {
        pagers.push(<Pager page={'...'} key={'break-1'} />)
      }
      for (let index = leftBuffer; index <= rightBuffer; index++) {
        pagers.push(
          <Pager
            page={index}
            active={current === index}
            key={index}
            onClick={onClick}
            prefixCls={prefixCls}
          />
        )
      }
      if (rightBuffer < maxPage - 1) {
        pagers.push(<Pager page={'...'} key={'break-2'} />)
      }
      if (rightBuffer !== maxPage) {
        pagers.push(
          <Pager
            page={maxPage}
            active={current === maxPage}
            key={maxPage}
            onClick={onClick}
            prefixCls={prefixCls}
          />
        )
      }
      return pagers
    }, [current, maxPage, max, onClick, prefixCls])

    const disabled = maxPage === 0

    // ????????????????????????????????????????????????????????? pagination ?????????
    const hiddenPagination =
      autoHide && current === 1 && typeof total === 'number' && total <= pageSize

    if (hiddenPagination) return null

    return (
      <div ref={ref} role={role} className={cls} {...rest}>
        {showTotal ? (
          <div className={`${prefixCls}__total`}>{`${totalText[0]} ${total} ${totalText[1]}`}</div>
        ) : null}

        {showPagers ? (
          <ul className={`${prefixCls}__list`}>
            <PagerButton
              type="prev"
              prefixCls={prefixCls}
              disabled={disabled || current === 1}
              onChange={onClick}
              current={current}
            />
            {renderPagers()}
            <PagerButton
              type="next"
              prefixCls={prefixCls}
              onChange={onClick}
              current={current}
              disabled={disabled || current === maxPage}
            />
          </ul>
        ) : null}
        {pageSizeOptions ? (
          <PageOption
            pageSize={pageSize}
            pageSizeOptions={_pageSizeOptions as { id: number; title: string }[]}
            onPageSizeChange={trySetPageSize}
          />
        ) : null}
        {showJumper ? (
          <PageJumper
            prefixCls={prefixCls}
            pageText={[gotoText, pageText]}
            onJump={proxyTrySetCurrent}
            maxJump={calculatePageCount(total, pageSize)}
          />
        ) : null}
      </div>
    )
  }
)

export interface PaginationProps extends HiBaseHTMLProps<'div'> {
  /**
   * ????????????
   */
  current?: number

  /**
   * ??????????????????
   */
  defaultCurrent?: number

  /**
   * ?????????????????????
   */
  max?: number
  /**
   * 	????????????
   */
  pageSize: number
  /**
   * 	????????????
   */
  total: number

  /**
   * 	????????????????????????
   */
  showTotal?: boolean
  /**
   * ???????????????
   */
  type?: 'default' | 'shrink'
  /**
   * 	????????????????????????????????????
   */
  autoHide?: boolean
  /**
   * 	??????????????????
   */
  showJumper?: boolean
  /**
   * 	??????????????????
   */
  showPagers?: boolean
  /**
   * 	?????????????????????????????????
   */
  pageSizeOptions?: number[]

  /**
   * 	?????????????????????
   */
  onJump?: (current: number) => void
  /**
   * 	????????????????????????
   */
  onChange?: (current: number, prev: number, pageSize: number) => void
  /**
   * 	???????????????????????????????????????
   */
  onPageSizeChange?: (pageSize: number, current: number) => void
}

if (__DEV__) {
  DefaultPagination.displayName = 'Pagination'
}
