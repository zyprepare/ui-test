import React, { forwardRef, useState, useCallback, useRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { Input, InputProps } from '@hi-ui/input'
import { SearchOutlined } from '@hi-ui/icons'
import { Button } from '@hi-ui/button'
import { useUncontrolledState } from '@hi-ui/use-uncontrolled-state'
import { isArrayNonEmpty } from '@hi-ui/type-assertion'
import { useLatestCallback } from '@hi-ui/use-latest'
import { SearchDataItem } from './types'
import { callAllFuncs } from '@hi-ui/func-utils'
import type { PopperOverlayProps } from '@hi-ui/popper'
import { SearchDropdown } from './SearchDropdown'

const SEARCH_PREFIX = getPrefixCls('search')
const NOOP_ARRAY = [] as []

/**
 * TODO: What is Search
 */
export const Search = forwardRef<HTMLInputElement | null, SearchProps>(
  (
    {
      prefixCls = SEARCH_PREFIX,
      className,
      disabled = false,
      loading = false,
      size = 'md',
      append: appendProp,
      defaultValue = '',
      value: valueProp,
      onChange,
      onSearch: onSearchProp,
      data = NOOP_ARRAY,
      overlayClassName,
      // input
      onFocus,
      onKeyDown: onKeyDownProp,
      overlay,
      ...rest
    },
    ref
  ) => {
    const [visible, setVisible] = useState<boolean>(false)
    const targetElRef = useRef<HTMLDivElement | null>(null)

    const [focusIndex, setFocusIndex] = useState<number | null>(null)
    const [subFocusIndex, setSubFocusIndex] = useState<number | null>(null)

    const [value, tryChangeValue] = useUncontrolledState<string>(
      defaultValue,
      valueProp,
      onChange,
      Object.is
    )

    const onSearch = useLatestCallback((nextValue: any) => {
      if (typeof nextValue !== 'string') {
        nextValue = value
      }
      onSearchProp?.(nextValue)
    })

    const closeDropdown = useCallback(() => {
      setVisible(false)
      setFocusIndex(null)
      setSubFocusIndex(null)
    }, [])

    const moveFocus = useLatestCallback((direction: 'up' | 'down') => {
      let newFocusIndex = null
      let newSubFocusIndex = null

      if (direction === 'up') {
        if (focusIndex === null) {
          newFocusIndex = data.length - 1
          const focusItem = data[newFocusIndex]
          if (focusItem && isArrayNonEmpty(focusItem.children)) {
            newSubFocusIndex = focusItem.children.length - 1
          }
        } else {
          const focusItem = data[focusIndex]
          if (focusItem && isArrayNonEmpty(focusItem.children)) {
            if (subFocusIndex === 0) {
              newFocusIndex = focusIndex === 0 ? data.length - 1 : focusIndex - 1
              const nextFocusItem = data[newFocusIndex]
              if (nextFocusItem && isArrayNonEmpty(nextFocusItem.children)) {
                newSubFocusIndex = nextFocusItem.children.length - 1
              }
            } else {
              newFocusIndex = focusIndex
              newSubFocusIndex = subFocusIndex !== null ? subFocusIndex - 1 : 0
            }
          } else {
            newFocusIndex = focusIndex === 0 ? data.length - 1 : focusIndex - 1
            const nextFocusItem = data[newFocusIndex]

            if (nextFocusItem && isArrayNonEmpty(nextFocusItem.children)) {
              newSubFocusIndex = nextFocusItem.children.length - 1
            }
          }
        }
      } else {
        // ????????? focusIndex
        if (focusIndex === null) {
          newFocusIndex = 0
          const nextFocusItem = data[newFocusIndex]

          if (nextFocusItem && isArrayNonEmpty(nextFocusItem.children)) {
            newSubFocusIndex = 0
          }
        } else {
          // ?????? focusIndex
          // ??????focus ???????????????
          const focusItem = data[focusIndex]
          if (focusItem && isArrayNonEmpty(focusItem.children)) {
            // ??????focus ?????????
            if (subFocusIndex === focusItem.children.length - 1) {
              newFocusIndex = focusIndex === data.length - 1 ? 0 : focusIndex + 1
              const nextFocusItem = data[newFocusIndex]

              if (nextFocusItem && isArrayNonEmpty(nextFocusItem.children)) {
                newSubFocusIndex = 0
              }
            } else {
              newFocusIndex = focusIndex
              newSubFocusIndex = subFocusIndex !== null ? subFocusIndex + 1 : 0
            }
          } else {
            newFocusIndex = focusIndex === data.length - 1 ? 0 : focusIndex + 1
            const nextFocusItem = data[newFocusIndex]

            if (nextFocusItem && isArrayNonEmpty(nextFocusItem.children)) {
              newSubFocusIndex = 0
            }
          }
        }
      }

      setFocusIndex(newFocusIndex)
      setSubFocusIndex(newSubFocusIndex)
    })

    const onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
      // ESC
      if (evt.keyCode === 27) {
        evt.preventDefault()
        closeDropdown()
      }
      // TAB
      if (evt.keyCode === 9) {
        evt.preventDefault()
        closeDropdown()
      }
      // UP
      if (evt.keyCode === 38) {
        evt.preventDefault()
        moveFocus('up')
      }
      // DOWN
      if (evt.keyCode === 40) {
        evt.preventDefault()
        moveFocus('down')
      }
      // ENTER
      if (evt.keyCode === 13) {
        evt.preventDefault()

        let nextValue = '' as React.ReactText
        if (focusIndex !== null && isArrayNonEmpty(data)) {
          const focusItem = data[focusIndex]

          if (subFocusIndex !== null && isArrayNonEmpty(focusItem.children)) {
            nextValue = focusItem.children[subFocusIndex].title
          } else {
            nextValue = focusItem.title
          }
        } else {
          nextValue = value
        }

        onSearch(nextValue)
        tryChangeValue(nextValue)
        closeDropdown()
      }
    }

    const openDropdown = useCallback(() => {
      setVisible(true)
    }, [])

    const cls = cx(prefixCls, className)

    return (
      <>
        <Input
          className={cls}
          ref={ref}
          containerRef={targetElRef}
          clearable
          disabled={disabled}
          size={size}
          value={value}
          onChange={(evt) => {
            tryChangeValue(evt.target.value)
            openDropdown()
          }}
          onFocus={callAllFuncs(openDropdown, onFocus)}
          onKeyDown={callAllFuncs(onKeyDownProp, onKeyDown)}
          append={
            appendProp === undefined ? (
              <Button
                type="primary"
                disabled={disabled}
                onClick={onSearch}
                size={size}
                icon={<SearchOutlined />}
              />
            ) : (
              appendProp
            )
          }
          {...rest}
        />
        {loading || isArrayNonEmpty(data) ? (
          <SearchDropdown
            prefixCls={prefixCls}
            popper={{
              matchWidth: true,
              ...overlay,
              autoFocus: false,
              visible: visible,
              onClose: closeDropdown,
              attachEl: targetElRef.current,
              className: overlayClassName,
            }}
            loading={loading}
            data={data}
            focusIndex={focusIndex}
            subFocusIndex={subFocusIndex}
            keyword={value}
            onSelect={(item) => {
              onSearch(item.title)
              tryChangeValue(item.title)
              targetElRef.current?.focus()
              closeDropdown()
            }}
          />
        ) : null}
      </>
    )
  }
)

export interface SearchProps extends Omit<InputProps, 'onChange' | 'appearance'> {
  /**
   * ???????????? loading
   */
  loading?: boolean
  /**
   * ??????????????????
   */
  appearance?: 'line' | 'filled'
  /**
   * ?????????????????????
   */
  onChange?: (value: string) => void
  /**
   * ?????????????????????????????????????????????????????????????????????????????????????????????
   */
  onSearch?: (value: string) => void
  /**
   * ???????????????????????????
   */
  overlayClassName?: string
  /**
   * ?????????????????????
   */
  data?: SearchDataItem[]
  /**
   * ??????????????? popper ??????
   */
  overlay?: PopperOverlayProps
}

if (__DEV__) {
  Search.displayName = 'Search'
}
