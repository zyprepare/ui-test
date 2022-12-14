import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { HiBaseHTMLProps, useLocaleContext } from '@hi-ui/core'
import {
  TimePickerStep,
  TimePickerType,
  TimePickerFormat,
  TimePickerPanelType,
  TimePickerFilterProps,
  TimePickerValue,
} from './@types'
import { Input, InputRef } from './Input'
import { useUncontrolledState } from '@hi-ui/use-uncontrolled-state'
import { PopperOverlayProps, Popper } from '@hi-ui/popper'
import { CloseCircleFilled, TimeOutlined } from '@hi-ui/icons'
import { PopContent } from './PopContent'
import { valueChecker } from './utils/valueChecker'
import { useFilter } from './hooks/useFilter'
import { Button } from '@hi-ui/button'
import { getNowString } from './utils/getNowString'
import DayJs from 'dayjs'

const _role = 'time-picker'
export const timePickerPrefix = getPrefixCls(_role)

const DefaultValue = ['', ''] as TimePickerValue[]
const DefaultDisabledFunc = () => []
const DefaultPlaceholder = ['', '']

const getValueMatchString = (value?: TimePickerValue[] | TimePickerValue) => {
  if (!value) {
    return undefined
  }
  const result = Array.isArray(value) ? value : [value]
  return result.map((item) => (typeof item === 'string' ? item : DayJs(item).format('HH:mm:ss')))
}

export const TimePicker = forwardRef<HTMLDivElement | null, TimePickerProps>(
  (
    {
      prefixCls = timePickerPrefix,
      role = _role,
      className,
      value: controlledValue,
      // itemHeight = 24,
      // fullDisplayItemNumber = 7,
      hourStep = 1,
      minuteStep = 1,
      secondStep = 1,
      format = 'HH:mm:ss',
      type = 'single',
      appearance = 'line',
      defaultValue: uncontrolledValue = DefaultValue,
      disabled = false,
      disabledHours: originalDisabledHours = DefaultDisabledFunc,
      disabledSeconds: originalDisabledSeconds = DefaultDisabledFunc,
      disabledMinutes: originalDisabledMinutes = DefaultDisabledFunc,
      onChange: notifyOutside,
      placeholder: originalPlaceholder = DefaultPlaceholder,
      inputReadonly = false,
      overlay,
      size = 'md',
      invalid = false,
    },
    ref
  ) => {
    const i18n = useLocaleContext()

    const confirmText = i18n.get('timePicker.ok')
    const nowText = i18n.get('timePicker.now')

    const [attachEl, setAttachEl] = useState<HTMLElement | null>(null)
    const formatUncontrolledValue = useMemo(() => getValueMatchString(uncontrolledValue)!, [
      uncontrolledValue,
    ])
    const formatControlledValue = useMemo(() => getValueMatchString(controlledValue), [
      controlledValue,
    ])
    const formatNotifyOutside = useCallback(
      (disposeValue: string[]) => {
        const result = disposeValue.filter((item) => item)
        notifyOutside && notifyOutside(result.length > 1 ? result : result[0])
      },
      [notifyOutside]
    )
    const isInSingleValueFormat = useMemo(() => {
      const singleFormat: TimePickerFormat[] = ['HH', 'mm', 'ss']
      return singleFormat.includes(format)
    }, [format])

    const [value, onChange] = useUncontrolledState<string[]>(
      formatUncontrolledValue,
      formatControlledValue,
      formatNotifyOutside
    )

    const placeholder = useMemo(
      () => (Array.isArray(originalPlaceholder) ? originalPlaceholder : [originalPlaceholder]),
      [originalPlaceholder]
    )

    const inputRef = useRef<InputRef | null>(null)
    const [isInputValid, setIsInputValid] = useState(true)
    const [cacheValue, setCacheValue] = useState<string[]>(value)
    const cacheValueRef = useRef(cacheValue)

    // ???????????????????????????
    const { disabledHours, disabledMinutes, disabledSeconds } = useFilter({
      disabledHours: originalDisabledHours,
      disabledMinutes: originalDisabledMinutes,
      disabledSeconds: originalDisabledSeconds,
    })

    useEffect(() => {
      cacheValueRef.current = [...value]
      setCacheValue((pre) => {
        if (pre.join('') !== value.join('')) {
          return [...value]
        }
        return pre
      })
    }, [value])

    const getPanelType = useCallback(
      (index: number): TimePickerPanelType => {
        if (type === 'single') {
          return 'single'
        } else {
          return index === 0 ? 'range-start' : 'range-end'
        }
      },
      [type]
    )

    // ?????????????????????
    const validChecker = useCallback(
      (checkValue: string[]) => {
        // ?????? range ????????????????????????
        // ???????????????????????????????????????
        const rangeValid = checkValue.join('') === '' || checkValue[1] > checkValue[0]
        return (
          checkValue.every((item, index) =>
            valueChecker({
              value: item,
              format,
              filter: {
                disabledSeconds,
                disabledMinutes,
                disabledHours,
              },
              step: {
                hourStep,
                minuteStep,
                secondStep,
              },
              panelType: getPanelType(index),
            })
          ) &&
          // ???????????????????????????
          (type === 'single' || rangeValid)
        )
      },
      [
        hourStep,
        getPanelType,
        minuteStep,
        secondStep,
        disabledHours,
        disabledMinutes,
        disabledSeconds,
        format,
        type,
      ]
    )

    const onCacheChange = useCallback(
      (newValue: string[]) => {
        const result = newValue.slice(0, type === 'single' ? 1 : 2)
        cacheValueRef.current = [...result]
        // ??????????????????
        setCacheValue((pre) => {
          if (pre.join('') !== result.join('')) {
            return [...result]
          }
          return pre
        })
      },
      [type]
    )

    const [showPopper, setShowPopper] = useState(false)
    const showPopperRef = useRef(false)

    const cls = cx(prefixCls, className, `${prefixCls}--appearance-${appearance}`, {
      [`${prefixCls}--active`]: showPopper && !disabled,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--input-not-valid`]: !isInputValid || invalid,
    })

    const functionButtons = useMemo(() => {
      return (
        <div className={`${prefixCls}__pop-function-buttons`}>
          <Button
            className={`${prefixCls}__pop-confirm-btn`}
            type={'primary'}
            disabled={!isInputValid}
            onClick={() => {
              // ???????????????????????????
              if (validChecker(cacheValue)) {
                if (cacheValue.join('') !== value.join('')) {
                  onChange([...cacheValue])
                }
              }
              showPopperRef.current = false
              setShowPopper(false)
            }}
          >
            {confirmText}
          </Button>
          {type === 'single' && !isInSingleValueFormat && (
            <Button
              className={`${prefixCls}__pop-now-btn`}
              appearance="link"
              type="primary"
              onClick={() => {
                onChange([getNowString(format)])
                showPopperRef.current = false
                setShowPopper(false)
              }}
            >
              {nowText}
            </Button>
          )}
        </div>
      )
    }, [
      confirmText,
      nowText,
      prefixCls,
      isInputValid,
      type,
      format,
      cacheValue,
      value,
      onChange,
      validChecker,
      isInSingleValueFormat,
    ])

    return (
      <div ref={ref} role={role} className={cls}>
        <div ref={setAttachEl} className={`${prefixCls}__input-wrapper`}>
          <Input
            size={size}
            isFitContent={appearance === 'unset'}
            ref={inputRef}
            onValidChange={setIsInputValid}
            disabled={inputReadonly || disabled}
            type={type}
            placeholders={placeholder}
            prefix={prefixCls}
            format={format}
            hourStep={hourStep}
            secondStep={secondStep}
            minuteStep={minuteStep}
            disabledHours={disabledHours}
            disabledMinutes={disabledMinutes}
            disabledSeconds={disabledSeconds}
            value={cacheValue}
            onChange={onCacheChange}
            onFocus={() => {
              showPopperRef.current = true
              setShowPopper(true)
            }}
          />
          <div
            className={`${prefixCls}__function-button`}
            onClick={() => {
              showPopperRef.current = !showPopperRef.current
              setShowPopper((pre) => !pre)
            }}
          >
            {showPopper ? (
              <CloseCircleFilled
                className={`${prefixCls}__close-button`}
                onClick={() => {
                  onCacheChange(type === 'single' ? [''] : ['', ''])
                }}
              />
            ) : (
              <TimeOutlined />
            )}
          </div>
        </div>
        <Popper
          {...(overlay || {})}
          unmountOnClose={false}
          visible={showPopper && !disabled}
          attachEl={attachEl}
          autoFocus={false}
          onClose={() => {
            // ????????????????????????????????????????????????????????????
            showPopperRef.current = false
            setShowPopper(false)
            onCacheChange([...value])
            // ???????????? input ???????????????
            inputRef.current?.refresh()
          }}
          preload
        >
          <PopContent
            // itemHeight={itemHeight}
            // fullDisplayItemNumber={fullDisplayItemNumber}
            type={type}
            prefix={prefixCls}
            format={format}
            hourStep={hourStep}
            secondStep={secondStep}
            minuteStep={minuteStep}
            disabledHours={disabledHours}
            disabledMinutes={disabledMinutes}
            disabledSeconds={disabledSeconds}
            value={cacheValue}
            onChange={(e) => {
              // ???????????????????????????????????? pop content ????????????
              // WARNING: ???????????????????????????????????????????????? 00:00:00???????????????????????????????????????????????????????????????FLAG????????????????????????
              if (showPopperRef.current) {
                // ???????????? input ???????????????
                // ??????????????????
                //  ????????????????????????????????????input??????????????????time-picker cache-value ????????????input??????value??????
                //  ?????????????????????pop-content????????????????????????time-picker cache-value ??????????????????input??????value????????????????????????????????????cache-value
                inputRef.current?.refresh()
                onCacheChange(e)
              }
            }}
          />
          {functionButtons}
        </Popper>
      </div>
    )
  }
)

type ExtendType = Omit<HiBaseHTMLProps<'div'>, 'placeholder' | 'value' | 'onChange'> &
  TimePickerFilterProps &
  TimePickerStep
export interface TimePickerProps extends ExtendType {
  /**
   * ???????????????
   * @default 'single'
   */
  type?: TimePickerType
  /**
   * ???????????????
   * @default 'HH:mm:ss'
   */
  format?: TimePickerFormat
  /**
   * ????????????type='single'????????????????????????type='range'?????????????????????????????????????????????????????????
   */
  value?: TimePickerValue[] | TimePickerValue
  /**
   * ?????????
   */
  defaultValue?: TimePickerValue[] | TimePickerValue
  /**
   * ???????????????????????? popper
   */
  overlay?: PopperOverlayProps
  /**
   * ???????????????????????????
   * @default false
   */
  inputReadonly?: boolean
  /**
   * ????????????
   * @default false
   */
  disabled?: boolean
  /**
   * ??????????????????
   */
  placeholder?: string | string[]
  /**
   * ???????????????
   * @default 'line'
   */
  appearance?: 'line' | 'filled' | 'unset'
  /**
   * ??????
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * ???????????????
   * @param value
   */
  onChange?: (value: string | string[]) => void
  /**
   * ????????????
   * @default false
   */
  invalid?: boolean
}

if (__DEV__) {
  TimePicker.displayName = 'TimePicker'
}
