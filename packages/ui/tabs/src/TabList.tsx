import React, { forwardRef, useState, useRef, useCallback } from 'react'
import { TabPaneProps } from './TabPane'
import { __DEV__ } from '@hi-ui/env'
import { TabItem } from './TabItem'
import { useUncontrolledState } from '@hi-ui/use-uncontrolled-state'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { TabInk } from './TabInk'
import { PlusOutlined, LeftOutlined, RightOutlined, UpOutlined, DownOutlined } from '@hi-ui/icons'
import { isArrayNonEmpty, isUndef } from '@hi-ui/type-assertion'
import { IconButton } from '@hi-ui/icon-button'
import { HiBaseHTMLProps } from '@hi-ui/core'
import { useResizeObserver } from './hooks'
import { useLatestCallback } from '@hi-ui/use-latest'
import { getNextTabId } from './utils'

const _role = 'tabs'
const _prefix = getPrefixCls(_role)

export const TabList = forwardRef<HTMLDivElement | null, TabListProps>(
  (
    {
      data,
      className,
      style,
      activeId,
      defaultActiveId,
      onChange,
      onTabClick,
      prefixCls = _prefix,
      // @ts-ignore deprecated
      direction: directionProp,
      placement = 'horizontal',
      editable,
      onAdd,
      onDelete,
      draggable,
      onDragStart,
      onDragOver,
      onDrop,
      onDragEnd,
      type = 'line',
      extra,
      ...rest
    },
    ref
  ) => {
    const direction = placement ?? directionProp ?? 'horizontal'

    const [activeTabId, setActiveTabId] = useUncontrolledState(
      () => {
        if (isUndef(defaultActiveId)) {
          return data[0] ? data[0].tabId : ''
        }

        return defaultActiveId
      },
      activeId,
      onChange,
      Object.is
    )

    const [innerElement, setInnerElement] = useState<HTMLDivElement | null>(null)
    const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null)

    const showHorizontal = direction === 'horizontal'

    const getClientSize = useCallback(
      (element: HTMLElement) => (showHorizontal ? element.clientWidth : element.clientHeight),
      [showHorizontal]
    )

    const [translatePos, setTranslatePos] = useState<number>(0)
    const [translateBoundPos, setTranslateBoundPos] = useState<number>(0)

    const itemsRef = useRef<Record<string, HTMLDivElement | null>>({})

    const [showScrollBtn, setShowScrollBtn] = useState(false)

    const resizeScroll = (scrollSize: number, innerSize: number) => {
      const showScrollBtn = scrollSize > innerSize
      setShowScrollBtn(showScrollBtn)
      if (showScrollBtn) {
        setTranslateBoundPos(scrollSize - innerSize)
      }
    }

    // ???????????????????????????
    useResizeObserver({
      element: innerElement,
      getSize: getClientSize,
      onResize: (_, innerSize) => {
        if (scrollElement) {
          const scrollSize = getClientSize(scrollElement)
          resizeScroll(scrollSize, innerSize)
        }
      },
    })

    useResizeObserver({
      element: scrollElement,
      getSize: getClientSize,
      onResize: (_, scrollSize) => {
        if (innerElement) {
          const innerSize = getClientSize(innerElement)
          resizeScroll(scrollSize, innerSize)
        }
      },
    })

    const getTabPos = useCallback(
      (tabId: React.ReactText) => {
        let target = 0

        // ???????????????????????????
        const targetElement = itemsRef.current[tabId]
        if (targetElement) {
          const rect = targetElement!.getBoundingClientRect()
          target = showHorizontal ? rect.left : rect.top
        }
        return target
      },
      [showHorizontal]
    )

    const getTabOffset = useCallback(
      (tabId: React.ReactText) => {
        // ???????????????????????????
        const targetPos = getTabPos(tabId)

        // ??????????????????????????????????????????
        let basePos = 0
        if (isArrayNonEmpty(data)) {
          const baseItem = data[0]
          basePos = getTabPos(baseItem.tabId)
        }

        // ????????????????????????????????????????????????
        return targetPos ? targetPos - basePos : 0
      },
      [data, getTabPos]
    )

    const syncScrollPosition = (tabId: React.ReactText) => {
      if (!innerElement) return
      if (!scrollElement) return

      const scrollSize = getClientSize(scrollElement)
      const innerSize = getClientSize(innerElement)
      const offsetValue = getTabOffset(tabId)

      // ????????????????????????????????????
      const currentOffset = -translatePos
      if (offsetValue < currentOffset) {
        setTranslatePos(-offsetValue)
      } else {
        // ????????????????????????????????????
        const nextTabId = getNextTabId(data, tabId)
        const nextOffsetValue = nextTabId !== null ? getTabOffset(nextTabId) : scrollSize
        const currentOffset = -translatePos + innerSize

        if (nextOffsetValue > currentOffset) {
          setTranslatePos(translatePos - (nextOffsetValue - currentOffset))
        }
      }
    }

    const onClickTab = useLatestCallback((tabId: React.ReactText, event: React.MouseEvent) => {
      onTabClick?.(tabId, event)
      setActiveTabId(tabId)
      syncScrollPosition(tabId)
    })

    return (
      <div
        style={style}
        className={cx(`${prefixCls}__list`, { [`${prefixCls}__list--${type}`]: type }, className)}
        ref={ref}
        {...rest}
      >
        {showScrollBtn ? (
          <IconButton
            className={showHorizontal ? `${prefixCls}__left-btn` : `${prefixCls}__up-btn`}
            effect
            disabled={translatePos === 0}
            icon={showHorizontal ? <LeftOutlined /> : <UpOutlined />}
            onClick={() => {
              if (!scrollElement) return
              if (!innerElement) return
              // ???????????????
              const clientSize = getClientSize(innerElement)
              const canScroll = -translatePos - clientSize
              const moveWidth = canScroll >= 0 ? clientSize : -translatePos

              setTranslatePos((prev) => prev + moveWidth)
            }}
          />
        ) : null}

        <div className={cx(`${prefixCls}__list--inner`)} ref={setInnerElement}>
          <div
            className={cx(`${prefixCls}__list--scroll`)}
            ref={setScrollElement}
            style={
              showScrollBtn
                ? {
                    transform:
                      direction === 'horizontal'
                        ? `translateX(${translatePos}px)`
                        : `translateY(${translatePos}px)`,
                  }
                : undefined
            }
          >
            {data.map((item, index) => (
              <TabItem
                key={index}
                {...item}
                ref={(node) => {
                  itemsRef.current[`${item.tabId}`] = node
                }}
                type={type}
                itemRef={itemsRef.current[`${item.tabId}`]}
                index={index}
                active={activeTabId === item.tabId}
                prefixCls={prefixCls}
                draggable={draggable}
                onTabClick={onClickTab}
                editable={editable}
                onDelete={onDelete}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
                direction={direction}
              />
            ))}
            {type === 'line' ? (
              <TabInk
                prefixCls={prefixCls}
                showHorizontal={showHorizontal}
                activeItemElement={itemsRef.current[activeTabId]}
                activeTabId={activeTabId}
                getTabOffset={getTabOffset}
              />
            ) : null}
          </div>
        </div>
        {showScrollBtn ? (
          <IconButton
            effect
            className={showHorizontal ? `${prefixCls}__right-btn` : `${prefixCls}__down-btn`}
            disabled={translateBoundPos === -translatePos}
            icon={showHorizontal ? <RightOutlined /> : <DownOutlined />}
            onClick={() => {
              if (!scrollElement) return
              if (!innerElement) return
              // ???????????????
              const scrollSize = getClientSize(scrollElement)
              const innerSize = getClientSize(innerElement)
              const canScrollWidth = scrollSize - innerSize + translatePos
              const moveWidth = canScrollWidth < innerSize ? canScrollWidth : innerSize

              setTranslatePos((prev) => prev - moveWidth)
            }}
          />
        ) : null}
        {editable ? (
          <IconButton icon={<PlusOutlined />} className={`${prefixCls}__add-btn`} onClick={onAdd} />
        ) : null}
        {extra}
      </div>
    )
  }
)

export interface TabListProps
  extends Omit<HiBaseHTMLProps<'div'>, 'onDragEnd' | 'onDragOver' | 'onDragStart' | 'onDrop'> {
  /**
   * tabs ????????????
   */
  data: TabPaneProps[]
  /**
   * ??????????????????
   */
  placement?: 'horizontal' | 'vertical'
  /**
   * `activeId` ???????????????
   */
  onChange?: (tabId: React.ReactText) => void
  /**
   * ????????????????????????
   */
  onTabClick?: (tabId: React.ReactText, event: React.MouseEvent) => void
  /**
   * ????????????id
   */
  defaultActiveId?: React.ReactText
  /**
   * ??????id
   */
  activeId?: React.ReactText
  /**
   * ???????????????
   */
  editable?: boolean
  /**
   * ???????????????
   */
  draggable?: boolean
  /**
   * ????????????
   */
  type?: 'desc' | 'card' | 'button' | 'line'
  /**
   * ?????????????????????
   */
  extra?: React.ReactNode
  /**
   * ?????????????????????
   */
  onAdd?: () => void
  /**
   * ????????????????????????
   */
  onDelete?: (deletedNode: TabPaneProps, index: number) => void
  /**
   * ???????????????????????????
   */
  onDragStart?: (
    e: React.DragEvent<HTMLDivElement>,
    { dragNode }: { dragNode: TabPaneProps }
  ) => void
  /**
   * ???????????????????????????
   */
  onDragOver?: (
    e: React.DragEvent<HTMLDivElement>,
    { targetNode }: { targetNode: TabPaneProps }
  ) => void
  /**
   * ???????????????????????????
   */
  onDrop?: (
    e: React.DragEvent<HTMLDivElement>,
    {
      dragNode,
      targetNode,
      direction,
    }: { dragNode: TabPaneProps; targetNode: TabPaneProps; direction: 'prev' | 'next' | null }
  ) => void
  /**
   * ???????????????????????????
   */
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>, { dragNode }: { dragNode: TabPaneProps }) => void
}

if (__DEV__) {
  TabList.displayName = 'TabList'
}
