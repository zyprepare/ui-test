import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { useCheckSelect, UseCheckSelectProps } from './use-check-select'
import type { HiBaseHTMLProps } from '@hi-ui/core'
import { DownOutlined, UpOutlined } from '@hi-ui/icons'
import { CheckSelectProvider, useCheckSelectContext } from './context'
import {
  CheckSelectAppearanceEnum,
  CheckSelectDataItem,
  CheckSelectItemEventData,
  CheckSelectMergedItem,
} from './types'
import { useLatestRef } from '@hi-ui/use-latest'
import Checkbox from '@hi-ui/checkbox'
import { TagInputMock } from '@hi-ui/tag-input'
import { isFunction, isArrayNonEmpty, isUndef } from '@hi-ui/type-assertion'
import VirtualList, { useCheckInVirtual } from '@hi-ui/virtual-list'
import { Picker, PickerProps } from '@hi-ui/picker'

import { times, uniqBy } from '@hi-ui/array-utils'
import { Highlighter } from '@hi-ui/highlighter'
import { useUncontrolledToggle } from '@hi-ui/use-toggle'
import { UseDataSource } from '@hi-ui/use-data-source'
import { callAllFuncs } from '@hi-ui/func-utils'
import { useLocaleContext } from '@hi-ui/core'
import {
  useAsyncSearch,
  useFilterSearch,
  useSearchMode,
  useTreeCustomSearch,
} from '@hi-ui/use-search-mode'
import { flattenData } from './hooks'
import { getAllCheckedStatus, isCheckableOption, isOption } from './utils'

const _role = 'check-select'
const _prefix = getPrefixCls(_role)

const DEFAULT_FIELD_NAMES = {} as any

/**
 * TODO: What is CheckSelect
 */
export const CheckSelect = forwardRef<HTMLDivElement | null, CheckSelectProps>(
  (
    {
      prefixCls = _prefix,
      role = _role,
      className,
      children,
      disabled = false,
      clearable = true,
      showCheckAll = false,
      showOnlyShowChecked = false,
      placeholder: placeholderProp,
      displayRender: displayRenderProp,
      onSelect: onSelectProp,
      height,
      itemHeight = 40,
      virtual = true,
      visible,
      onOpen,
      onClose,
      // picker
      appearance,
      invalid,
      // search
      dataSource,
      filterOption,
      searchable: searchableProp,
      render: titleRender,
      renderExtraFooter,
      onSearch: onSearchProp,
      fieldNames = DEFAULT_FIELD_NAMES,
      ...rest
    },
    ref
  ) => {
    // ************************** ????????? ************************* //

    const i18n = useLocaleContext()

    const placeholder = isUndef(placeholderProp)
      ? i18n.get('checkSelect.placeholder')
      : placeholderProp

    // ************************** Picker ************************* //

    const [menuVisible, menuVisibleAction] = useUncontrolledToggle({
      visible,
      disabled,
      onOpen,
      onClose,
    })

    const displayRender = useCallback(
      (item: CheckSelectItemEventData) => {
        if (isFunction(displayRenderProp)) {
          return displayRenderProp(item)
        }
        return item.title
      },
      [displayRenderProp]
    )

    const { rootProps, ...context } = useCheckSelect({
      ...rest,
      children,
      fieldNames,
      onSelect: onSelectProp,
    })

    const { value, tryChangeValue, flattedData, checkedItems } = context
    // ************************** ?????? ************************* //

    const { loading, hasError, ...dataSourceStrategy } = useAsyncSearch({
      dataSource,
      dataTransform: (data: CheckSelectMergedItem) => flattenData({ data, fieldNames }),
    })

    const customSearchStrategy = useTreeCustomSearch({ data: flattedData, filterOption })
    const filterSearchStrategy = useFilterSearch({
      data: flattedData,
      flattedData: flattedData,
      enabled: searchableProp,
    })

    const {
      state: stateInSearch,
      searchable,
      searchMode,
      onSearch,
      keyword: searchValue,
    } = useSearchMode({
      searchable: searchableProp,
      strategies: [dataSourceStrategy, customSearchStrategy, filterSearchStrategy],
    })

    // ?????? titleRender????????????????????????
    const proxyTitleRender = useCallback(
      (node: CheckSelectItemEventData) => {
        if (titleRender) {
          const ret = titleRender(node)
          if (ret && ret !== true) return ret
        }

        // ????????????????????????????????????
        const highlight = !!searchValue && searchMode === 'filter'

        const ret = highlight ? (
          <Checkbox checked={node.checked} disabled={node.disabled}>
            <Highlighter keyword={searchValue}>{node.title}</Highlighter>
          </Checkbox>
        ) : (
          true
        )

        return ret
      },
      [titleRender, searchValue, searchMode]
    )

    const shouldUseSearch = !!searchValue && !hasError
    const showData = useMemo(() => {
      return shouldUseSearch ? stateInSearch.data : flattedData
    }, [shouldUseSearch, flattedData, stateInSearch.data])

    // ?????? id ??????????????????????????????????????????
    const mergedData: any[] = useMemo(() => {
      const nextData = checkedItems.concat(flattedData as any[])
      return uniqBy(nextData, 'id')
    }, [checkedItems, flattedData])

    const [filterItems, setFilterItems] = useState<any[] | null>(null)
    const dropdownItems = filterItems || showData
    const activeExpandable = showOnlyShowChecked && !!filterItems && menuVisible

    const [showAllChecked, showIndeterminate] = useMemo(() => {
      return getAllCheckedStatus(dropdownItems, value, isOption)
    }, [dropdownItems, value])

    const valueLatestRef = useLatestRef(value)
    const toggleCheckAll = useCallback(() => {
      const value = valueLatestRef.current
      const [currentAllChecked] = getAllCheckedStatus(dropdownItems, value, isCheckableOption)
      const shouldChecked = !currentAllChecked

      // ????????????????????????
      const items = dropdownItems.filter(isCheckableOption)
      const targetIds: any[] = items.map(({ id }: any) => id)
      const allData: any[] = uniqBy(items.concat(mergedData), 'id')

      if (shouldChecked) {
        const nextCheckedIds = Array.from(new Set(value.concat(targetIds)))
        const changedIds = nextCheckedIds.filter((id) => !value.includes(id))
        const changedItems = allData.filter(({ id }) => changedIds.includes(id))

        tryChangeValue(nextCheckedIds, changedItems, shouldChecked)
      } else {
        const nextCheckedIds = value.filter((id) => !targetIds.includes(id))
        const changedIds = value.filter((id) => !nextCheckedIds.includes(id))
        const changedItems = allData.filter(({ id }) => changedIds.includes(id)) // items

        tryChangeValue(nextCheckedIds, changedItems, shouldChecked)
      }
    }, [dropdownItems, mergedData, valueLatestRef, tryChangeValue])

    const renderDefaultFooter = () => {
      const extra = renderExtraFooter ? renderExtraFooter() : null
      if (showCheckAll) {
        return (
          <>
            <Checkbox
              indeterminate={showIndeterminate}
              checked={showAllChecked}
              onChange={toggleCheckAll}
            >
              {i18n.get('checkSelect.checkAll')}
            </Checkbox>
            {extra}
          </>
        )
      }
      return extra
    }

    const expandedViewRef = useRef<'normal' | 'onlyChecked'>('normal')

    const virtualListProps = {
      height: height,
      itemHeight: itemHeight,
      virtual: virtual,
      data: dropdownItems,
    }

    const { inVirtual } = useCheckInVirtual(virtualListProps)

    const cls = cx(prefixCls, className, `${prefixCls}--${menuVisible ? 'open' : 'closed'}`)

    return (
      <CheckSelectProvider value={context}>
        <Picker
          ref={ref}
          className={cls}
          {...rootProps}
          visible={menuVisible}
          disabled={disabled}
          onOpen={menuVisibleAction.on}
          onClose={menuVisibleAction.off}
          searchable={searchable}
          scrollable={!inVirtual}
          onSearch={callAllFuncs(onSearchProp, onSearch)}
          loading={loading}
          footer={renderDefaultFooter()}
          trigger={
            <TagInputMock
              clearable={clearable}
              placeholder={placeholder}
              // @ts-ignore
              displayRender={displayRender}
              suffix={menuVisible ? <UpOutlined /> : <DownOutlined />}
              focused={menuVisible}
              appearance={appearance}
              value={value}
              // @ts-ignore
              onChange={tryChangeValue}
              data={mergedData}
              invalid={invalid}
              onClick={(evt) => {
                if (!showOnlyShowChecked) return
                if (disabled) return

                // ?????? Picker ?????? onOpen/onClose
                evt.preventDefault()

                if (filterItems) {
                  setFilterItems(null)
                }

                if (menuVisible) {
                  if (expandedViewRef.current === 'normal') {
                    menuVisibleAction.off()
                  }
                } else {
                  menuVisibleAction.on()
                }

                expandedViewRef.current = 'normal'
              }}
              expandable={showOnlyShowChecked}
              activeExpandable={activeExpandable}
              onExpand={(evt) => {
                if (!showOnlyShowChecked) return
                if (disabled) return

                // ???????????????????????? onClick
                evt.stopPropagation()
                evt.preventDefault()

                setFilterItems(() => {
                  return mergedData.filter((item) => {
                    return value.includes(item.id)
                  })
                })

                if (menuVisible) {
                  if (expandedViewRef.current !== 'normal') {
                    menuVisibleAction.off()
                  }
                } else {
                  menuVisibleAction.on()
                }

                expandedViewRef.current = 'onlyChecked'
              }}
            />
          }
        >
          {isArrayNonEmpty(dropdownItems) ? (
            <VirtualList itemKey="id" fullHeight={false} {...virtualListProps}>
              {(node: any) => {
                /* ?????? map???????????????????????????????????????????????? */
                return 'groupTitle' in node ? (
                  <CheckSelectOptionGroup label={node.groupTitle} />
                ) : (
                  <CheckSelectOption
                    option={node}
                    depth={node.depth}
                    titleRender={proxyTitleRender}
                  />
                )
              }}
            </VirtualList>
          ) : null}
        </Picker>
      </CheckSelectProvider>
    )
  }
)

export interface CheckSelectProps
  extends Omit<PickerProps, 'trigger' | 'scrollable'>,
    UseCheckSelectProps {
  /**
   * ????????????????????????????????????????????????????????????
   * @private
   */
  height?: number
  /**
   * ????????????????????????????????????????????????????????????
   * @private
   */
  itemHeight?: number
  /**
   * 	?????? `true` ??????????????????
   */
  virtual?: boolean
  /**
   * ???????????????????????? title ????????????????????????
   */
  searchable?: boolean
  /**
   * ???????????????
   */
  clearable?: boolean
  /**
   * ?????????????????? tags
   */
  onClear?: () => void
  /**
   * ???????????????
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * ???????????????????????? title ??????
   */
  render?: (item: CheckSelectItemEventData) => React.ReactNode
  /**
   * ?????????????????????????????????????????????????????? title ?????????????????????
   */
  displayRender?: (option: CheckSelectItemEventData) => React.ReactNode
  /**
   * ???????????????????????????
   */
  placeholder?: string
  /**
   * ??????????????????
   */
  appearance?: CheckSelectAppearanceEnum
  /**
   * ???????????????????????????mode=normal???????????????
   */
  searchMode?: 'highlight' | 'filter'
  /**
   * ????????????????????????????????? searchable ??? true ?????????
   * ???????????????????????????????????????
   * ???????????????????????????????????? true ????????????????????????
   */
  filterOption?: (keyword: string, item: CheckSelectDataItem) => boolean
  /**
   * ??????????????????
   */
  dataSource?: UseDataSource<CheckSelectMergedItem[]>
  /**
   * ?????????????????????????????????
   */
  renderExtraFooter?: () => React.ReactNode
  /**
   * ????????? input ?????? icon
   */
  suffixIcon?: React.ReactNode
  /**
   * ??????????????? tags ??? icon
   */
  clearIcon?: React.ReactNode
  /**
   * ?????????????????????
   */
  onOpen?: () => void
  /**
   * ?????????????????????
   */
  onClose?: () => void
  /**
   * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
   */
  showCheckAll?: boolean
  /**
   * ?????????????????????????????????
   */
  showOnlyShowChecked?: boolean
}

// @ts-ignore
CheckSelect.HiName = 'CheckSelect'
if (__DEV__) {
  CheckSelect.displayName = 'CheckSelect'
}

const optionPrefix = getPrefixCls('check-select-option')

/**
 * TODO: What is CheckSelectOption
 */
export const CheckSelectOption = forwardRef<HTMLDivElement | null, CheckSelectOptionProps>(
  (
    {
      prefixCls = optionPrefix,
      className,
      children,
      option = {},
      onClick,
      titleRender,
      depth,
      ...rest
    },
    ref
  ) => {
    const { isCheckedId, onSelect } = useCheckSelectContext()

    const { id, disabled = false } = option
    const checked = isCheckedId(id)

    const eventNodeRef = useLatestRef(
      Object.assign({}, option, {
        disabled: disabled,
        checked: checked,
      })
    )

    const cls = cx(
      prefixCls,
      className,
      checked && `${prefixCls}--checked`,
      disabled && `${prefixCls}--disabled`
    )

    const handleOptionCheck = useCallback(
      (evt) => {
        onSelect(option, !checked)
        onClick?.(evt)
      },
      [onSelect, option, checked, onClick]
    )

    const renderTitle = useCallback(
      (node: any, titleRender?: (node: any) => React.ReactNode) => {
        // ?????? titleRender ?????? `true`?????????????????? title
        const title = titleRender ? titleRender(node) : true

        return (
          <div className={`${prefixCls}__title`}>
            {title === true ? (
              <Checkbox checked={node.checked} disabled={node.disabled}>
                {node.title}
              </Checkbox>
            ) : (
              title
            )}
          </div>
        )
      },
      [prefixCls]
    )

    return (
      <div ref={ref} className={cls} {...rest} onClick={handleOptionCheck}>
        {renderIndent(prefixCls, depth)}
        {renderTitle(eventNodeRef.current, titleRender)}
      </div>
    )
  }
)

export interface CheckSelectOptionProps extends HiBaseHTMLProps {}

// @ts-ignore
CheckSelectOption.HiName = 'CheckSelectOption'
if (__DEV__) {
  CheckSelectOption.displayName = 'CheckSelectOption'
}

const optionGroupPrefix = getPrefixCls('select-option-group')

/**
 * TODO: What is CheckSelectOptionGroup
 */
export const CheckSelectOptionGroup = forwardRef<
  HTMLDivElement | null,
  CheckSelectOptionGroupProps
>(({ prefixCls = optionGroupPrefix, className, label, ...rest }, ref) => {
  const cls = cx(prefixCls, className)

  return (
    <div ref={ref} className={cls} {...rest}>
      <span>{label}</span>
    </div>
  )
})

export interface CheckSelectOptionGroupProps extends HiBaseHTMLProps {}

// @ts-ignore
CheckSelectOptionGroup.HiName = 'CheckSelectOptionGroup'
if (__DEV__) {
  CheckSelectOptionGroup.displayName = 'CheckSelectOptionGroup'
}

/**
 * ??????????????????
 */
const renderIndent = (prefixCls: string, depth: number) => {
  return times(depth, (index: number) => {
    return (
      <span key={index} style={{ alignSelf: 'stretch' }}>
        <span className={cx(`${prefixCls}__indent`)} />
      </span>
    )
  })
}
