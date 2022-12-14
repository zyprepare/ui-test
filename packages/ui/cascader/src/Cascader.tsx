import React, { forwardRef, useState, useMemo, useEffect } from 'react'
import type { HiBaseAppearanceEnum } from '@hi-ui/core'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { useUncontrolledToggle } from '@hi-ui/use-toggle'
import { useCascader, UseCascaderProps } from './use-cascader'
import { MockInput } from '@hi-ui/input'
import type { PopperOverlayProps } from '@hi-ui/popper'
import { DownOutlined, UpOutlined } from '@hi-ui/icons'
import { flattenTreeData, getItemEventData, getFilteredMenuList } from './utils'
import { CascaderProvider } from './context'
import { CascaderExpandTriggerEnum, FlattedCascaderDataItem, CascaderItemEventData } from './types'
import { getNodeAncestorsWithMe, getTopDownAncestors } from '@hi-ui/tree-utils'
import { isArrayNonEmpty, isFunction, isUndef } from '@hi-ui/type-assertion'
import { Picker, PickerProps } from '@hi-ui/picker'
import { useSearchMode, useTreeCustomSearch, useTreeUpMatchSearch } from '@hi-ui/use-search-mode'
import { uniqBy } from '@hi-ui/array-utils'
import { useCache } from '@hi-ui/use-cache'
import { useLocaleContext } from '@hi-ui/core'
import { callAllFuncs } from '@hi-ui/func-utils'
import { CascaderMenuList } from './CascaderMenuList'
import Highlighter from '@hi-ui/highlighter'

const _prefix = getPrefixCls('cascader')

const NOOP_ARRAY = [] as []

/**
 * TODO: What is Cascader
 * Trigger + MenuList + Search
 */
export const Cascader = forwardRef<HTMLDivElement | null, CascaderProps>((props, ref) => {
  const {
    prefixCls = _prefix,
    className,
    placeholder: placeholderProp,
    disabled = false,
    clearable = true,
    type = 'tree',
    fieldNames,
    expandTrigger = 'click',
    displayRender: displayRenderProp,
    onSelect: onSelectProp,
    onLoadChildren,
    appearance,
    invalid,
    filterOption,
    searchable: searchableProp,
    onSearch: onSearchProp,
    render: titleRender,
    overlayClassName,
    data = NOOP_ARRAY,
    flattedSearchResult = true,
    visible,
    onOpen,
    onClose,
    ...rest
  } = props
  const i18n = useLocaleContext()

  const placeholder = isUndef(placeholderProp) ? i18n.get('cascader.placeholder') : placeholderProp

  const [menuVisible, menuVisibleAction] = useUncontrolledToggle({
    visible,
    disabled,
    onOpen,
    onClose,
  })

  // ?????????????????????????????????
  const [selectedItem, setSelectedItem] = useState<CascaderItemEventData | null>(null)
  const onSelect = (
    value: React.ReactText,
    item: CascaderItemEventData,
    itemPaths: FlattedCascaderDataItem[]
  ) => {
    onSelectProp?.(value, item, itemPaths)
    setSelectedItem(item)
    // ????????????
    menuVisibleAction.off()
  }

  // ?????? titleRender????????????????????????
  const proxyTitleRender = (node: CascaderItemEventData) => {
    // ????????????????????????????????????
    const highlight = !!searchValue && searchMode === 'upMatch'

    if (highlight) {
      return flattedSearchResult
        ? renderHighlightTitles(searchValue, node, titleRender)
        : renderHighlightTitle(searchValue, node, titleRender)
    }

    return isFunction(titleRender) ? titleRender(node) : true
  }

  const [cascaderData, setCascaderData] = useCache(data)

  const flattedData = useMemo(() => flattenTreeData(cascaderData, fieldNames), [
    cascaderData,
    fieldNames,
  ])

  // ************************** ???????????? ************************* //

  // TODO: ????????? Item ?????? ??????
  const customSearchStrategy = useTreeCustomSearch({ data: flattedData, filterOption })

  const upMatchSearchStrategy = useTreeUpMatchSearch({
    data: cascaderData,
    flattedData: flattedData,
    enabled: searchableProp,
    exclude: (node: any) => node.disabled,
    // exclude: (option: FlattedCascaderDataItem) => {
    //   return checkCanLoadChildren(option, onLoadChildren)
    // },
  })

  const {
    state: stateInSearch,
    searchable,
    searchMode,
    onSearch,
    keyword: searchValue,
  } = useSearchMode({
    searchable: searchableProp,
    strategies: [customSearchStrategy, upMatchSearchStrategy],
  })

  const displayRender = (item: CascaderItemEventData) => {
    const itemPaths = getTopDownAncestors(item)

    if (displayRenderProp) {
      const eventOption = getItemEventData(item, getItemRequiredProps(item))

      return displayRenderProp(
        eventOption,
        itemPaths.map((item) => getItemEventData(item, getItemRequiredProps(item)))
      )
    }

    const mergedTitle = itemPaths.reduce((acc, item, index, { length }) => {
      acc.push(item.title as string)

      if (length - 1 !== index) {
        acc.push('/')
      }

      return acc
    }, [] as string[])

    return <span className="title__text">{mergedTitle}</span>
  }

  const shouldUseSearch = !!searchValue
  // ?????????????????????????????? flatted ??????????????????
  const flatted = shouldUseSearch ? flattedSearchResult : type === 'flatted'

  const { rootProps, ...context } = useCascader({
    ...rest,
    disabled,
    fieldNames,
    flatted,
    onSelect,
    onLoadChildren,
    data,
    // @ts-ignore
    cascaderData,
    setCascaderData,
    flattedData,
  })

  const { value, tryChangeValue, reset, menuList, getItemRequiredProps } = context

  const showData = useMemo(() => {
    if (shouldUseSearch) {
      if (!flattedSearchResult) {
        return getFilteredMenuList(menuList, stateInSearch.data)
      }
      return isArrayNonEmpty(stateInSearch.data) ? [stateInSearch.data] : []
    }

    return menuList
  }, [shouldUseSearch, flattedSearchResult, stateInSearch.data, menuList])

  useEffect(() => {
    // ????????????????????????????????????????????????
    if (!menuVisible) {
      reset()
    }
  }, [menuVisible, reset])

  // ????????????????????????????????????????????????????????????????????????
  const mergedData = useMemo(() => {
    if (selectedItem) {
      const nextData = [selectedItem].concat(flattedData as any[])
      return uniqBy(nextData, 'id')
    }

    return flattedData
  }, [selectedItem, flattedData])

  const cls = cx(prefixCls, className, `${prefixCls}--${menuVisible ? 'open' : 'closed'}`)

  return (
    <CascaderProvider
      value={{ ...context, expandTrigger, titleRender: proxyTitleRender, menuList: showData }}
    >
      <Picker
        ref={ref}
        className={cls}
        overlayClassName={cx(`${prefixCls}__popper`, overlayClassName)}
        {...rootProps}
        // ??????????????????????????????????????????????????????????????????
        overlay={{ matchWidth: false, ...rest.overlay }}
        visible={menuVisible}
        disabled={disabled}
        onOpen={menuVisibleAction.on}
        onClose={menuVisibleAction.off}
        searchable={searchable}
        scrollable={false}
        onSearch={callAllFuncs(onSearchProp, onSearch)}
        trigger={
          <MockInput
            clearable={clearable}
            placeholder={placeholder}
            displayRender={displayRender as any}
            suffix={menuVisible ? <UpOutlined /> : <DownOutlined />}
            focused={menuVisible}
            value={value[value.length - 1]}
            onChange={() => {
              tryChangeValue([])
            }}
            data={mergedData}
            invalid={invalid}
            appearance={appearance}
          />
        }
      >
        {isArrayNonEmpty(showData) ? <CascaderMenuList /> : null}
      </Picker>
    </CascaderProvider>
  )
})

export interface CascaderProps
  extends Omit<PickerProps, 'data' | 'onChange' | 'trigger' | 'scrollable'>,
    UseCascaderProps {
  /**
   * ??? check ???????????????????????????????????????
   * @private
   */
  type?: 'flatted' | 'tree'
  /**
   * ???????????????????????????
   */
  expandTrigger?: CascaderExpandTriggerEnum
  /**
   * ???????????????????????? title ????????????????????????
   */
  searchable?: boolean
  /**
   * ???????????????
   */
  clearable?: boolean
  /**
   * ????????????????????????????????????
   */
  emptyContent?: React.ReactNode
  /**
   * ???????????????????????? title ??????
   */
  render?: (item: CascaderItemEventData, keyword?: string) => React.ReactNode
  /**
   * ?????????????????????????????????????????????????????? title ?????????????????????
   */
  displayRender?: (
    checkedOption: CascaderItemEventData,
    checkedOptionPaths: CascaderItemEventData[]
  ) => React.ReactNode
  /**
   * ???????????????????????????
   */
  placeholder?: string
  /**
   * ????????????????????????
   */
  searchPlaceholder?: string
  /**
   * ????????????????????????????????? searchable ??? true ?????????
   * ???????????????????????????????????????
   * ???????????????????????????????????? true ????????????????????????
   */
  filterOption?: (keyword: string, item: CascaderItemEventData) => boolean
  /**
   * ??????????????? popper ??????
   */
  overlay?: PopperOverlayProps
  /**
   * ??????????????????
   */
  appearance?: HiBaseAppearanceEnum
  /**
   * ????????????????????????
   */
  flattedSearchResult?: boolean
}

if (__DEV__) {
  Cascader.displayName = 'Cascader'
}

const renderHighlightTitle = (
  keyword: string,
  option: CascaderItemEventData,
  titleRender?: (item: CascaderItemEventData, keyword?: string) => React.ReactNode
) => {
  // ?????? titleRender ?????? `true`?????????????????? title
  const title = titleRender ? titleRender(option, keyword) : true
  if (title !== true) return title

  return (
    <Highlighter key={option.id} keyword={keyword}>
      {option.title}
    </Highlighter>
  )
}

const renderHighlightTitles = (
  keyword: string,
  option: CascaderItemEventData,
  titleRender?: (item: CascaderItemEventData, keyword?: string) => React.ReactNode
) => {
  // ?????? titleRender ?????? `true`?????????????????? title
  const title = titleRender ? titleRender(option, keyword) : true
  if (title !== true) return title

  if (typeof option.title !== 'string') {
    console.info('WARNING: The `option.title` should be `string` when searchable is enabled.')
    return option.title
  }

  let found = false

  return (
    <span className={cx(`title__text`, `title__text--cols`)}>
      {/* ???????????????????????? title */}
      {getNodeAncestorsWithMe(option)
        .map((item) => {
          const { title, id } = item
          const raw = (
            <span className="title__text--col" key={id}>
              {title}
            </span>
          )

          if (typeof title !== 'string') return raw
          if (found) return raw

          const index = title.indexOf(keyword)
          if (index === -1) return raw

          found = true

          const beforeStr = title.substr(0, index)
          const afterStr = title.substr(index + keyword.length)

          return (
            <span key={id} className="title__text--col">
              {beforeStr}
              <span className="title__text--matched">{keyword}</span>
              {afterStr}
            </span>
          )
        })
        .reverse()}
    </span>
  )
}
