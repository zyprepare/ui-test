import React, { forwardRef, useCallback, useMemo } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { useUncontrolledToggle } from '@hi-ui/use-toggle'
import { useUncontrolledState } from '@hi-ui/use-uncontrolled-state'
import { DownOutlined, UpOutlined } from '@hi-ui/icons'
import {
  CheckCascaderDataItem,
  CheckCascaderExpandTriggerEnum,
  CheckCascaderItemEventData,
  FlattedCheckCascaderDataItem,
} from './types'
import { useCache } from '@hi-ui/use-cache'
import { Picker, PickerProps } from '@hi-ui/picker'
import { TagInputMock } from '@hi-ui/tag-input'
import { CheckCascaderMenuList } from './CheckCascaderMenuList'
import {
  matchStrategy,
  useSearchMode,
  useTreeCustomSearch,
  useTreeUpMatchSearch,
} from '@hi-ui/use-search-mode'
import { flattenTreeData } from './utils'
import { getNodeAncestorsWithMe, getTopDownAncestors } from '@hi-ui/tree-utils'
import { useLatestCallback } from '@hi-ui/use-latest'
import { isArrayNonEmpty, isUndef } from '@hi-ui/type-assertion'
import { HiBaseAppearanceEnum, useLocaleContext } from '@hi-ui/core'

import { callAllFuncs } from '@hi-ui/func-utils'

const _prefix = getPrefixCls('check-cascader')
const NOOP_ARRAY = [] as []

/**
 * TODO: What is CheckCascader
 */
export const CheckCascader = forwardRef<HTMLDivElement | null, CheckCascaderProps>(
  (
    {
      prefixCls = _prefix,
      className,
      defaultValue = NOOP_ARRAY,
      value: valueProp,
      onChange,
      data = NOOP_ARRAY,
      placeholder: placeholderProp,
      clearable,
      onSelect,
      expandTrigger,
      disabled = false,
      emptyContent,
      changeOnSelect,
      render: titleRender,
      displayRender,
      checkCascaded,
      searchPlaceholder,
      onLoadChildren,
      // picker
      appearance,
      invalid,
      // search
      filterOption,
      searchable: searchableProp,
      onSearch: onSearchProp,
      overlayClassName,
      type = 'tree',
      checkedMode,
      visible,
      onOpen,
      onClose,
      ...rest
    },
    ref
  ) => {
    const i18n = useLocaleContext()

    const placeholder = isUndef(placeholderProp)
      ? i18n.get('checkCascader.placeholder')
      : placeholderProp

    const flatted = type === 'flatted'

    const [menuVisible, menuVisibleAction] = useUncontrolledToggle({
      visible,
      disabled,
      onOpen,
      onClose,
    })

    const [cascaderData, setCascaderData] = useCache(data)

    const flattedData = useMemo(() => flattenTreeData(cascaderData), [cascaderData])

    const [_value, tryChangeValue] = useUncontrolledState(defaultValue, valueProp, onChange)
    // ???????????????????????? id
    const value = _value.map((path) => path[path.length - 1])

    const proxyOnChange = useLatestCallback(
      (value: React.ReactText[], item: any, shouldChecked: boolean) => {
        const flattedItems = flattedData

        const itemsPaths = value.map((lastId) => {
          const item = flattedItems.find((item) => item.id === lastId)
          if (item) {
            return getTopDownAncestors(item).map(({ id }) => id)
          }

          // ?????????????????????????????????????????????????????????
          const idPaths = _value.find((item) => item[item.length - 1] === lastId)
          return idPaths || [lastId]
        })

        tryChangeValue(itemsPaths)
      }
    )

    // ************************** ?????? ************************* //
    // ??????????????????????????????????????????????????????????????????????????????????????????????????????

    const customSearchStrategy = useTreeCustomSearch({ data: flattedData, filterOption })

    const upMatchSearchStrategy = useTreeUpMatchSearch({
      data: cascaderData,
      flattedData: flattedData,
      enabled: searchableProp,
      exclude: (node: any) => !node.checkable,
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

    // ?????? titleRender????????????????????????
    const proxyTitleRender = useCallback(
      (node: any) => {
        if (titleRender) {
          const ret = titleRender(node)
          if (ret && ret !== true) return ret
        }

        // ????????????????????????????????????
        const highlight = !!searchValue && searchMode === 'upMatch'

        let found = false

        const ret = highlight ? (
          <span className={cx(`title__text`, `title__text--cols`)}>
            {getNodeAncestorsWithMe(node)
              .map((item) => {
                const { title, id } = item
                const raw = (
                  <span className="title__text--col" key={id}>
                    {title}
                  </span>
                )

                if (typeof title !== 'string') return raw
                if (found) return raw

                const index = matchStrategy(title, searchValue)
                if (index === -1) return raw

                found = true

                const resultLength = searchValue.length

                const beforeStr = title.substr(0, index)
                const resultStr = title.substr(index, searchValue.length)
                const afterStr = title.substr(index + resultLength)

                return (
                  <span className={`title__text--col`} key={id}>
                    {beforeStr}
                    <span className="title__text--matched">{resultStr}</span>
                    {afterStr}
                  </span>
                )
              })
              .reverse()}
          </span>
        ) : (
          true
        )

        return ret
      },
      [titleRender, searchValue, searchMode]
    )

    const shouldUseSearch = !!searchValue

    const selectProps = {
      data: shouldUseSearch ? stateInSearch.data : flattedData,
      titleRender: proxyTitleRender,
    }

    const cls = cx(prefixCls, className, `${prefixCls}--${menuVisible ? 'open' : 'closed'}`)

    return (
      <Picker
        ref={ref}
        className={cls}
        overlayClassName={cx(`${prefixCls}__popper`, overlayClassName)}
        {...rest}
        // ??????????????????????????????????????????????????????????????????
        overlay={{ matchWidth: false, ...rest.overlay }}
        visible={menuVisible}
        onOpen={() => {
          // setViewSelected(false)
          menuVisibleAction.on()
        }}
        disabled={disabled}
        onClose={menuVisibleAction.off}
        searchable={searchable}
        scrollable={false}
        onSearch={callAllFuncs(onSearchProp, onSearch)}
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
            onChange={proxyOnChange}
            data={flattedData}
            invalid={invalid}
            // onExpand={() => {
            //   // setViewSelected(true)
            //   menuVisibleAction.on()
            // }}
          />
        }
      >
        {isArrayNonEmpty(selectProps.data) ? (
          <CheckCascaderMenuList
            disabled={disabled}
            value={value}
            // @ts-ignore
            onChange={proxyOnChange}
            expandTrigger={expandTrigger}
            changeOnSelect={changeOnSelect}
            checkCascaded={checkCascaded}
            onSelect={onSelect}
            onLoadChildren={onLoadChildren}
            titleRender={proxyTitleRender}
            flatted={flatted || !!searchValue}
            // @ts-ignore
            flattedData={selectProps.data}
            data={cascaderData}
            onChangeData={setCascaderData}
            checkedMode={checkedMode}
          />
        ) : null}
      </Picker>
    )
  }
)

export interface CheckCascaderProps extends Omit<PickerProps, 'trigger' | 'scrollable'> {
  /**
   * ????????????????????????
   */
  data: CheckCascaderDataItem[]
  /**
   * ?????????????????????
   */
  value?: React.ReactText[][]
  /**
   * ??????????????????????????????
   */
  defaultValue?: React.ReactText[][]
  /**
   * ???????????????????????????
   */
  onChange?: (values: React.ReactText[][]) => void
  /**
   * ????????????????????????????????????????????????
   * @private
   */
  onSelect?: (selectedId: React.ReactText, selectedOption: CheckCascaderItemEventData) => void
  /**
   * ???????????????????????????
   */
  expandTrigger?: CheckCascaderExpandTriggerEnum
  /**
   * ???????????????????????? title ????????????????????????
   */
  searchable?: boolean
  /**
   * ???????????????
   */
  clearable?: boolean
  /**
   * ??????????????????
   */
  disabled?: boolean
  /**
   * ????????????????????????????????????
   */
  emptyContent?: React.ReactNode
  /**
   * ?????????????????????????????????
   */
  changeOnSelect?: boolean
  /**
   * ???????????????????????? title ??????
   */
  render?: (item: CheckCascaderItemEventData) => React.ReactNode
  /**
   * ?????????????????????????????????????????????
   */
  displayRender?: (checkedOption: FlattedCheckCascaderDataItem) => React.ReactNode
  /**
   * ?????? checkbox ???????????????????????????
   */
  checkCascaded?: boolean
  /**
   * ??? check ???????????????????????????????????????
   * @private
   */
  type?: 'flatted' | 'tree'
  /**
   * ???????????????????????????
   */
  placeholder?: string
  /**
   * ????????????????????????
   */
  searchPlaceholder?: string
  /**
   * ????????????????????????
   */
  onLoadChildren?: (
    item: CheckCascaderItemEventData,
    idPaths: React.ReactText[]
  ) => Promise<CheckCascaderDataItem[] | void> | void
  /**
   * ??????????????????
   */
  appearance?: HiBaseAppearanceEnum
  /**
   * ????????????????????????????????? searchable ??? true ?????????
   * ???????????????????????????????????????
   * ???????????????????????????????????? true ????????????????????????
   */
  filterOption?: (keyword: string, item: any) => boolean
  /**
   * ??????????????????????????????????????????
   * PARENT: ???????????????????????????????????????????????????
   * ALL: ?????????????????????????????????????????????????????????????????????????????????checkbox???
   * CHILD: ??????????????????????????????????????????????????????checkbox???
   * SEPARATE???????????????????????????
   */
  checkedMode?: 'PARENT' | 'CHILD' | 'ALL' | 'SEPARATE'
}

if (__DEV__) {
  CheckCascader.displayName = 'CheckCascader'
}
