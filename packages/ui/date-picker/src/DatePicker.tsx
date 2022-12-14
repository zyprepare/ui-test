import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { clone as cloneDeep } from '@hi-ui/object-utils'
import { useLocaleContext } from '@hi-ui/core'
import moment from 'moment'
import { useDate } from './hooks/useData'
import useFormat from './hooks/useFormat'
import useAltData from './hooks/useAltData'
import { getInRangeDate } from './utils'
import DPContext from './context'
import Popper from '@hi-ui/popper'
import Root from './components/root'
import Panel from './components/panel'
import RangePanel from './components/range-panel'
import {
  CalendarItemV3,
  DatePickerProps,
  DatePickerTypeEnum,
  DatePickerValueV3,
  DateRange,
  DatePickerOnChangeDateString,
  DatePickerOnChangeDate,
} from './types'
import { getBelongWeek, getBelongWeekYear } from './utils/week'
import { DateRangeTimePanel } from './components/date-range-time-panel'
import { GranularityMap } from './utils/constants'

const DATE_PICKER_PREFIX = getPrefixCls('date-picker')

const DEFAULT_DISABLED_DATE = () => false
const DEFAULT_ON_CHANGE = () => {}
const DEFAULT_DISABLED_FUNCTION = () => []

export const DatePicker = forwardRef<HTMLDivElement | null, DatePickerProps>(
  (
    {
      prefixCls = DATE_PICKER_PREFIX,
      role = 'date-picker',
      className,
      type: propType = 'date',
      value: controlledValue,
      defaultValue: uncontrolledValue,
      placeholder,
      showTime = false,
      format,
      disabled,
      clearable = true,
      // width = 'auto',
      weekOffset,
      hourStep = 1,
      minuteStep = 1,
      secondStep = 1,
      onChange: onChangeOriginal = DEFAULT_ON_CHANGE,
      timeInterval = 240,
      shortcuts,
      altCalendar: altCalendarOriginal,
      altCalendarPreset,
      dateMarkRender,
      dateMarkPreset,
      inputReadOnly,
      disabledDate = DEFAULT_DISABLED_DATE,
      maxDate: max = null,
      minDate: min = null,
      onSelect: propsOnSelectOriginal,
      theme,
      disabledHours = DEFAULT_DISABLED_FUNCTION,
      disabledMinutes = DEFAULT_DISABLED_FUNCTION,
      disabledSeconds = DEFAULT_DISABLED_FUNCTION,
      appearance = 'line',
      size = 'md',
      overlay,
      invalid = false,
      ...otherProps
    },
    ref
  ) => {
    const i18n = useLocaleContext()
    const locale = i18n.locale

    const [dateRangeTimePanelNow, setDateRangeTimePanelNow] = useState(0)

    const cacheDate = useRef<(moment.Moment | null)[]>([])
    const [inputFocus, setInputFocus] = useState(false)
    const [type, setType] = useState<DatePickerTypeEnum>(propType)
    useEffect(() => {
      moment.locale(locale === 'en-US' ? 'en' : 'zh-CN')
      // V4: ????????? weekOffset ?????????????????????
      // if (weekOffset !== undefined) {
      //   moment.locale(weekOffset === 0 ? 'en' : 'zh-CN')
      // }
    }, [locale, weekOffset])
    useEffect(() => {
      setType(propType)
    }, [propType])

    const propsOnSelect = useCallback(
      (data: moment.Moment, isCompleted: boolean) => {
        propsOnSelectOriginal && propsOnSelectOriginal(moment(data).toDate(), isCompleted)
      },
      [propsOnSelectOriginal]
    )

    const safeWeekOffset = useMemo(
      () => (weekOffset !== undefined ? weekOffset : locale === 'en-US' ? 0 : 1),
      [weekOffset, locale]
    )

    const valueAdapter = useCallback((original?: DatePickerValueV3 | DatePickerValueV3[]) => {
      if (!original) {
        return original
      } else {
        if (Array.isArray(original)) {
          return {
            start: original[0],
            end: original[1],
          } as DateRange
        } else {
          return original
        }
      }
    }, [])

    const altCalendar = useMemo<CalendarItemV3[] | undefined>(
      () =>
        altCalendarOriginal &&
        altCalendarOriginal.map((item) => ({
          date: item.date,
          text: item.content,
          highlight: item.highlighted,
        })),
      [altCalendarOriginal]
    )

    // ??? v4 ??? api ??????????????? v3 ??? api ??????????????????
    const onChange = useCallback(
      (disposeDate: DatePickerOnChangeDate, disposeString: DatePickerOnChangeDateString) => {
        let resultData = null
        let resultString = null

        if (disposeDate) {
          resultData = ((disposeDate as unknown) as DateRange).start
            ? [
                moment(((disposeDate as unknown) as DateRange).start).toDate(),
                moment(((disposeDate as unknown) as DateRange).end).toDate(),
              ]
            : moment(disposeDate as any).toDate()
        }

        if (disposeString) {
          resultString = (((disposeString as unknown) as DateRange).start as string)
            ? [
                ((disposeString as unknown) as DateRange).start as string,
                ((disposeString as unknown) as DateRange).end as string,
              ]
            : (disposeString as string)
        }

        onChangeOriginal(resultData, resultString)
      },
      [onChangeOriginal]
    )

    const value = useMemo(() => valueAdapter(controlledValue), [valueAdapter, controlledValue])
    const defaultValue = useMemo(() => valueAdapter(uncontrolledValue), [
      valueAdapter,
      uncontrolledValue,
    ])

    const [outDate, changeOutDate] = useDate({
      value,
      type,
      defaultValue,
      cacheDate,
      format,
      weekOffset: safeWeekOffset,
      locale,
    })
    const realFormat = useFormat({
      type,
      showTime,
      format,
      locale,
    })

    const [showPanel, setShowPanel] = useState(false)
    const [altCalendarPresetData, dateMarkPresetData] = useAltData({
      altCalendar,
      altCalendarPreset,
      // dateMarkRender,
      dateMarkPreset,
      showPanel,
      prefixCls,
    })
    const inputChangeEvent = (val: moment.Moment, dir: number) => {
      if (val.isValid()) {
        const oData = cloneDeep(outDate)
        oData[dir] = val
        // ??????????????????????????????
        if (oData[0] && oData[1] && oData[0]?.isAfter(oData[1])) {
          const temp = oData[0]
          oData[0] = oData[1]
          oData[1] = temp
        }
        changeOutDate(oData)
      }
    }

    const callback = useCallback(
      (dates: (moment.Moment | null)[], emitOnChange = true) => {
        // ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        // ?????????????????????????????????????????????????????????????????????????????????
        let compareNumber = 1
        const _dates = cloneDeep(dates)
        let returnDate = {} as any
        let returnDateStr = '' as any
        if (type.includes('week')) {
          returnDate = {
            start: _dates[0]?.toDate(),
            end: _dates[1]?.toDate(),
          }
          const getWeekString = (disposeDate: moment.Moment | null) => {
            if (disposeDate) {
              return format
                ? disposeDate.format(realFormat)
                : i18n.get('datePicker.weekRange', {
                    year: getBelongWeekYear(disposeDate, safeWeekOffset),
                    week: getBelongWeek(disposeDate, safeWeekOffset),
                  })
            } else {
              return ''
            }
          }
          returnDateStr = type.includes('range')
            ? {
                start: getWeekString(_dates[0]),
                end: getWeekString(_dates[1]),
              }
            : getWeekString(_dates[0])
        } else if (type.includes('range') || type === 'timeperiod') {
          returnDate = {
            start: _dates[0]?.toDate(),
            end: _dates[1]?.toDate(),
          }
          returnDateStr = {
            start: _dates[0]?.format(realFormat),
            end: _dates[1]?.format(realFormat),
          }
          compareNumber = 2
        } else {
          returnDate = _dates[0]?.toDate()
          returnDateStr = _dates[0]?.format(realFormat)
        }

        // ?????????????????????????????????????????????
        if (
          _dates.slice(0, compareNumber).some((od: moment.Moment | null, index: number) => {
            return od
              ? !od.isSame(cacheDate.current![index], showTime ? 'second' : GranularityMap[type])
              : // ?????? ??????????????????????????????????????????
                // ?????? ???????????????????????????????????????????????????????????????????????????????????????????????? null undefined ??????????????????
                od || cacheDate.current![index]
          })
        ) {
          cacheDate.current = _dates
          emitOnChange && onChange(returnDate as any, returnDateStr)
        }
      },
      [format, i18n, onChange, realFormat, safeWeekOffset, type, showTime]
    )

    const onPick = useCallback(
      (dates: (moment.Moment | null)[], isShowPanel = false) => {
        setTimeout(() => {
          setShowPanel(isShowPanel)
        }, 0)
        if (!isShowPanel) {
          setInputFocus(false)
          callback(dates)
        }
        changeOutDate([...dates])
      },
      [callback, changeOutDate]
    )

    const resetStatus = useCallback(() => {
      setShowPanel(false)
      setInputFocus(false)
    }, [])

    const isInDateRangeTimeMode = useMemo(() => type === 'daterange' && showTime, [type, showTime])

    const onPopperClose = useCallback(() => {
      resetStatus()
      if (!isInDateRangeTimeMode) {
        const outDateValue = outDate[0]
        const isValid = moment(outDateValue).isValid()
        // @ts-ignore
        const { startDate, endDate } = isValid && getInRangeDate(outDate[0], outDate[1], max, min)
        const _outDate = isValid ? [moment(startDate), moment(endDate)] : [null]
        callback(_outDate, true)

        changeOutDate(_outDate)
      }
      // ?????????????????????????????????????????????????????????????????????????????????
      else {
        changeOutDate(cacheDate.current!.map((item) => item && item.clone()))
      }
    }, [outDate, callback, min, max, resetStatus, changeOutDate, isInDateRangeTimeMode])

    const onClear = () => {
      resetStatus()
      changeOutDate([])
      // @ts-ignore
      onChange(null, '')
    }

    const onSelect = useCallback(
      (date, ...arg) => {
        if (propsOnSelect) {
          const _date = Array.isArray(date) ? date[0] : date
          // @ts-ignore
          propsOnSelect(_date, ...arg)
        }
      },
      [propsOnSelect]
    )

    const popperCls = cx(
      `${prefixCls}__popper`,
      type === 'date' && showTime && `${prefixCls}__popper--time`,
      type.includes('range') && `${prefixCls}__popper--range`,
      type === 'timeperiod' && `${prefixCls}__popper--timeperiod`,
      shortcuts && `${prefixCls}__popper--shortcuts`
    )
    const [attachEl, setAttachEl] = useState<HTMLElement | null>(null)

    const popContent = useMemo(() => {
      // ???????????????????????????????????????
      if (isInDateRangeTimeMode) {
        return (
          <DateRangeTimePanel
            nowIndex={dateRangeTimePanelNow}
            onChangeNowIndex={setDateRangeTimePanelNow}
          />
        )
      }
      return (
        <div className={popperCls}>
          {type.includes('range') || type === 'timeperiod' ? (
            <RangePanel />
          ) : (
            <Panel onPick={onPick} outDate={outDate} disabledDate={disabledDate} />
          )}
        </div>
      )
    }, [
      isInDateRangeTimeMode,
      popperCls,
      type,
      onPick,
      outDate,
      disabledDate,
      dateRangeTimePanelNow,
    ])

    return (
      <DPContext.Provider
        value={{
          ...otherProps,
          locale,
          appearance,
          i18n,
          type,
          outDate,
          weekOffset: safeWeekOffset,
          onPick,
          min,
          max,
          disabled,
          placeholder,
          showTime,
          format,
          realFormat,
          timeInterval,
          shortcuts,
          altCalendar,
          altCalendarPreset,
          dateMarkRender,
          dateMarkPreset,
          altCalendarPresetData,
          dateMarkPresetData,
          disabledHours,
          disabledMinutes,
          disabledSeconds,
          clearable,
          theme,
          hourStep,
          minuteStep,
          secondStep,
          inputReadOnly,
          value,
          disabledDate,
          onSelect,
          prefixCls,
          showPanel,
          isInDateRangeTimeMode,
          size,
        }}
      >
        <div className={cx(prefixCls, className)} {...otherProps}>
          <Root
            inputChangeEvent={inputChangeEvent}
            onClear={onClear}
            inputFocus={inputFocus}
            onTrigger={(index) => {
              setDateRangeTimePanelNow(index)
              setShowPanel(true)
              setInputFocus(true)
            }}
            setAttachEl={setAttachEl}
            dateRangeTimePanelNow={dateRangeTimePanelNow}
            invalid={invalid}
          />
          <Popper
            {...(overlay || {})}
            visible={showPanel}
            onClose={onPopperClose}
            attachEl={attachEl}
            unmountOnClose={false}
            preload
            autoFocus={false}
          >
            {popContent}
          </Popper>
        </div>
      </DPContext.Provider>
    )
  }
)

if (__DEV__) {
  DatePicker.displayName = 'DatePicker'
}
