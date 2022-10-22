import React, { useRef, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { cx } from '@hi-ui/classname'
import { getTimePeriodData } from '../utils'
import DPContext from '../context'
import moment from 'moment'

const TimePeriodPanel = ({
  date,
  onTimePeriodPick,
  value,
  showPanel,
}: {
  date: moment.Moment
  onTimePeriodPick: (ts1: string, ts2: string) => void
  value: string[]
  showPanel: boolean
}) => {
  const { timeInterval = 240, i18n, prefixCls } = useContext(DPContext)

  const listEl = useRef<HTMLUListElement | null>(null)
  const [periodData, setPeriodData] = useState<ReturnType<typeof getTimePeriodData>>([])

  useEffect(() => {
    setPeriodData(getTimePeriodData(timeInterval))
  }, [timeInterval])

  const criticalDisposedValue = useMemo(() => {
    const result = [...value]
    if (result[1] === '00:00') {
      result[1] = '24:00'
    }

    return result
  }, [value])

  useEffect(() => {
    // 判断当前时间是否合法（存在于选项中）
    // 如果不存在，则通知外部，重置为第一个（模拟第一个时间被点击操作）
    // 只有当 面板 展开的时候才会去做判断
    if (
      periodData.length &&
      !periodData.find(
        (item) =>
          item.timeStr
            .split('~')
            .map((item) => item.trim())
            .join('') === criticalDisposedValue.join('')
      ) &&
      showPanel
    ) {
      const [ts, te] = periodData[0].timeStr.split('~')
      onTimePeriodPick(ts, te)
    }
  }, [periodData, criticalDisposedValue, onTimePeriodPick, showPanel])

  const getActiveIndex = useCallback(() => {
    return Number(
      (timeInterval >= 60
        ? (date.hour() * 60) / timeInterval
        : (date.minute() + date.hour() * 60) / timeInterval
      ).toFixed(0)
    )
  }, [timeInterval, date])

  useEffect(() => {
    setTimeout(() => {
      listEl.current && (listEl.current.scrollTop = getActiveIndex() * 36)
    }, 0)
  }, [getActiveIndex])

  return (
    <div className={`${prefixCls}__time-period`}>
      <div className={`${prefixCls}__period-header`}>{i18n.get('datePicker.timePeriod')}</div>
      <div className={`${prefixCls}__period-body`}>
        <ul className={`${prefixCls}__period-list`} ref={listEl}>
          {periodData.map((item, index) => {
            const cls = cx(
              `${prefixCls}__period-item`,
              getActiveIndex() === index && `${prefixCls}__period-item--active`
            )
            return (
              <li
                className={cls}
                key={index}
                onClick={(e) => {
                  const [ts, te] = item.timeStr.split('~')
                  onTimePeriodPick(ts, te)
                }}
              >
                {item.timeStr}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default TimePeriodPanel
