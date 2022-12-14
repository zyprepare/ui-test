import React, { forwardRef, useCallback, useMemo, useState, useEffect } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { TransferDataItem } from './types'
import { useTransferContext } from './context'
import Input from '@hi-ui/input'
import { TransferItem } from './TransferItem'
import Checkbox from '@hi-ui/checkbox'
import { SearchOutlined, InfoCircleOutlined } from '@hi-ui/icons'
import { ShrinkPagination } from '@hi-ui/pagination'
import { useLocaleContext } from '@hi-ui/core'

const _role = 'transfer-panel'
const _prefix = getPrefixCls(_role)

/**
 * TODO: What is TransferPanel
 */
export const TransferPanel = forwardRef<HTMLDivElement | null, TransferPanelProps>(
  (
    {
      prefixCls = _prefix,
      role = _role,
      className,
      children,
      type,
      targetLimit,
      disabled,
      data,
      title,
      checkedIds,
      setCheckedIds,
      onCheck,
      isCheckedIds,
      placeholder,
      emptyContent,
      overflowed = false,
      targetIds,
      targetSortType,
      onItemClick,
      draggable = false,
      ...rest
    },
    ref
  ) => {
    const i18n = useLocaleContext()
    const limitContent = i18n.get('transfer.limit')

    const { searchable, pageSize, showCheckAll } = useTransferContext()

    const [searchValue, setSearchValue] = useState('')

    const [cacheData, setCacheData] = useState(data)

    useEffect(() => {
      const updateDataWithSearch = () => {
        if (!searchValue) {
          setCacheData(data)
          setCheckedIds(checkedIds)
        } else {
          const nextData = data.filter((item) => {
            if (typeof item.title !== 'string') return false
            return item.title.includes(searchValue)
          })

          setCacheData(nextData)
        }
      }
      updateDataWithSearch()
    }, [data, searchValue, checkedIds, setCheckedIds])

    const [current, setCurrent] = useState(1)

    const handleSearch = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = evt.target.value
      setCurrent(1)
      setSearchValue(searchValue)
    }, [])

    const canCheckedItems = useMemo(() => cacheData.filter((item) => !item.disabled), [cacheData])

    const handleCheckAll = useCallback(
      (evt: React.ChangeEvent<HTMLInputElement>) => {
        const shouldCheckedAll = evt.target.checked
        const nextCheckedIdsSet = new Set<React.ReactText>(checkedIds)
        if (shouldCheckedAll) {
          canCheckedItems.forEach(({ id }) => {
            nextCheckedIdsSet.add(id)
          })
        } else {
          canCheckedItems.forEach(({ id }) => {
            nextCheckedIdsSet.delete(id)
          })
        }

        const nextCheckedIds = Array.from(nextCheckedIdsSet)
        setCheckedIds(nextCheckedIds)
      },
      [canCheckedItems, checkedIds, setCheckedIds]
    )

    const currentPanelHasChecked = checkedIds.length > 0

    const checkedAll = useMemo(
      () => currentPanelHasChecked && canCheckedItems.every((item) => isCheckedIds(item.id)),
      [currentPanelHasChecked, isCheckedIds, canCheckedItems]
    )

    const showData = useMemo(() => {
      return pageSize ? cacheData.slice((current - 1) * pageSize, current * pageSize) : cacheData
    }, [current, cacheData, pageSize])

    const showHeader = showCheckAll || title

    const cls = cx(prefixCls, className)

    return (
      <div ref={ref} role={role} className={cls} {...rest}>
        {disabled ? <div className={`${prefixCls}__mask`}></div> : null}
        {showHeader ? (
          <div className={`${prefixCls}__header`}>
            {showCheckAll ? (
              <div className={`${prefixCls}__check-all`}>
                <div className={`${prefixCls}__check-all--left`}>
                  <Checkbox
                    className={`${prefixCls}__check-all-box`}
                    indeterminate={!checkedAll && currentPanelHasChecked}
                    checked={checkedAll}
                    onChange={handleCheckAll}
                  />
                  {title ? <div className={`${prefixCls}__title`}>{title}</div> : null}
                </div>
                <span className={`${prefixCls}__check-all--right`}>
                  {currentPanelHasChecked
                    ? `${checkedIds.length}/${cacheData.length}`
                    : `${cacheData.length}`}
                </span>
              </div>
            ) : title ? (
              <div className={`${prefixCls}__title`}>{title}</div>
            ) : null}
          </div>
        ) : null}
        <div className={`${prefixCls}__body`}>
          {searchable ? (
            <div className={`${prefixCls}__search`}>
              <Input
                size="md"
                appearance="underline"
                prefix={<SearchOutlined />}
                placeholder={placeholder}
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
          ) : null}
          <div className={`${prefixCls}__list-scroller`}>
            {/* ????????????????????????????????? target ?????????????????????????????? */}
            {overflowed ? (
              <div className={`${prefixCls}__limit`}>
                <InfoCircleOutlined className={`${prefixCls}__limit-icon`} />
                <span>{limitContent}</span>
              </div>
            ) : null}
            {showData.length > 0 ? (
              <ul className={`${prefixCls}__list`}>
                {showData.map((item) => {
                  return (
                    <TransferItem
                      key={item.id}
                      data={item}
                      onCheck={onCheck}
                      checked={isCheckedIds(item.id)}
                      draggable={draggable}
                      onClick={onItemClick}
                    />
                  )
                })}
              </ul>
            ) : (
              <div className={`${prefixCls}__empty`}>{emptyContent}</div>
            )}
          </div>
        </div>
        {pageSize ? (
          <div className={`${prefixCls}__footer`}>
            <ShrinkPagination
              size="sm"
              className={`${prefixCls}__pagination`}
              total={cacheData.length}
              current={current}
              onChange={setCurrent}
              pageSize={pageSize}
            />
          </div>
        ) : null}
      </div>
    )
  }
)

export interface TransferPanelProps {
  /**
   * ???????????????????????????
   */
  prefixCls?: string
  /**
   * ?????????????????? Role ??????
   */
  role?: string
  /**
   * ???????????????????????????
   */
  className?: string
  /**
   * ?????????????????????
   */
  style?: React.CSSProperties
  /**
   * ???????????????
   */
  type?: 'single' | 'multiple'
  /**
   * ????????????????????????
   */
  showCheckAll?: boolean
  /**
   * ???????????????
   */
  searchable?: boolean
  /**
   * ????????????
   */
  disabled?: boolean
  /**
   * ??????
   */
  title?: React.ReactNode
  /**
   * ?????????????????????
   */
  placeholder?: string
  /**
   * ??????????????????????????????
   */
  emptyContent?: React.ReactNode
  /**
   * ??????????????????
   */
  data: TransferDataItem[]
  /**
   * ?????????????????????
   */
  targetLimit?: number
  /**
   * ????????????????????? id ??????
   */
  targetIds?: React.ReactText[]
  /**
   * ???????????????????????????
   */
  targetSortType?: 'default' | 'queue'
  /**
   * ??????????????????
   */
  draggable?: boolean
  /**
   * ??????????????????
   */
  overflowed?: boolean
  checkedIds: React.ReactText[]
  setCheckedIds: (newState: React.ReactText[]) => void
  onCheck: (targetItem: TransferDataItem, shouldChecked: boolean) => void
  isCheckedIds: (id: React.ReactText) => boolean
  onItemClick: (item: TransferDataItem) => void
}

if (__DEV__) {
  TransferPanel.displayName = 'TransferPanel'
}
