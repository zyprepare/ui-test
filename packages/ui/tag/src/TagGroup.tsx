import React, { forwardRef, useMemo, useState } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { PlusOutlined } from '@hi-ui/icons'
import { Tag, TagProps } from './Tag'
import { invariant, __DEV__ } from '@hi-ui/env'
import { Button } from '@hi-ui/button'
import { HiBaseHTMLProps, useLocaleContext } from '@hi-ui/core'

import { isUndef } from '@hi-ui/type-assertion'

const _role = 'tag-group'
const _prefix = getPrefixCls(_role)

const NOOP_ARRAY = [] as []

export const TagGroup = forwardRef<HTMLDivElement | null, TagGroupProps>(
  (
    {
      prefixCls = _prefix,
      role = _role,
      className,
      data = NOOP_ARRAY,
      maxWidth,
      style,
      editable = true,
      onAdd,
      onDelete,
      onEdit,
      addButton,
      ...rest
    },
    ref
  ) => {
    const rootClassName = useMemo(() => cx(className, prefixCls), [className, prefixCls])
    const [isInAdding, setIsInAdding] = useState(false)

    const i18n = useLocaleContext()
    const addText = i18n.get('tag.add')

    const displayTags = useMemo(() => {
      return data.map((item, index) => {
        const {
          closeable: itemCloseable,
          maxWidth: itemMaxWidth,
          editable: itemEditable,
          tagId: tagIdDeprecated,
          id,
          onDelete: itemOnDelete,
          onEdit: itemOnEdit,
          className: itemClassName,
          ...restItemProps
        } = item

        const tagId = id ?? tagIdDeprecated

        if (__DEV__) {
          invariant(
            typeof tagIdDeprecated === 'undefined',
            'The tagId is deprecated please use the id prop instead of it in TagGroup component.'
          )
        }

        return (
          <Tag
            {...restItemProps}
            className={cx(itemClassName, `${prefixCls}__item`)}
            key={tagId}
            closeable={itemCloseable === undefined ? editable : itemCloseable}
            editable={itemEditable === undefined ? editable : itemEditable}
            maxWidth={itemMaxWidth === undefined ? maxWidth : itemMaxWidth}
            onDelete={() => {
              itemOnDelete && itemOnDelete()
              onDelete && onDelete({ ...item }, index)
            }}
            onEdit={(e) => {
              itemOnEdit && itemOnEdit(e)
              onEdit && onEdit(e, { ...item }, index)
            }}
          />
        )
      })
    }, [data, editable, maxWidth, onDelete, onEdit, prefixCls])

    const addNewButton = useMemo(() => {
      return (
        <div className={`${prefixCls}__add-new-button`} onClick={() => setIsInAdding(true)}>
          {isUndef(addButton) ? (
            <Button type="primary" icon={<PlusOutlined />} appearance="link">
              {addText}
            </Button>
          ) : (
            addButton
          )}
        </div>
      )
    }, [prefixCls, addText, addButton])

    return (
      <div ref={ref} role={role} className={rootClassName} style={style} {...rest}>
        {displayTags}
        {editable && !isInAdding && addNewButton}
        {isInAdding && (
          <Tag
            autoEditable
            editable
            onEdit={(e) => {
              onAdd?.(e, data.length)
              setIsInAdding(false)
            }}
            className={`${prefixCls}__item`}
          />
        )}
      </div>
    )
  }
)

export interface TagGroupProps extends HiBaseHTMLProps<'div'> {
  /**
   * ????????????
   */
  data: TagGroupDataItem[]
  /**
   * ??????????????????????????????????????????????????????????????? node ?????????
   * @default true
   */
  editable?: boolean
  /**
   * ?????????????????????????????? node ???????????????
   * @default 0 ?????????????????????
   */
  maxWidth?: number
  /**
   * ?????????????????????
   * @param deleteNode
   * @param index
   */
  onDelete?: (disposeNode: TagGroupDataItem, index: number) => void
  /**
   * ?????????????????????
   * @param editNode
   * @param index
   */
  onEdit?: (newStringValue: string, disposeNode: TagGroupDataItem, index: number) => void
  /**
   * ?????????????????????
   */
  onAdd?: (newStringValue: string, index: number) => void
  /**
   * ????????????????????????????????????
   * @private
   */
  addButton?: React.ReactNode
}

export interface TagGroupDataItem
  extends Omit<TagProps, 'id' | 'role' | 'prefixCls' | 'autoEditable'> {
  /**
   * ???????????? id
   */
  id: React.ReactText
  /**
   * @deprecated please using id prop,
   */
  tagId?: React.ReactText
}

if (__DEV__) {
  TagGroup.displayName = 'TagGroup'
}
