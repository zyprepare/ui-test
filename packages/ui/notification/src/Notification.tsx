import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { HiBaseHTMLProps } from '@hi-ui/core'
import { CSSTransition } from 'react-transition-group'
import { IconButton } from '@hi-ui/icon-button'
import {
  InfoCircleFilled,
  CloseCircleFilled,
  CheckCircleFilled,
  ExclamationCircleFilled,
  CloseOutlined,
} from '@hi-ui/icons'

const _role = 'notification'
export const notificationPrefix = getPrefixCls(_role)

const notificationIconMap: any = {
  success: <CheckCircleFilled />,
  error: <CloseCircleFilled />,
  warning: <ExclamationCircleFilled />,
  info: <InfoCircleFilled />,
}

/**
 * TODO: What is Notification
 */
export const Notification = forwardRef<HTMLDivElement | null, NotificationProps>(
  (
    {
      prefixCls = notificationPrefix,
      role = _role,
      className,
      children,
      title,
      content,
      visible = true,
      duration = 5000,
      autoClose = true,
      closable = true,
      type = 'info',
      action,
      destroy,
      onClose,
      ...rest
    },
    ref
  ) => {
    const [transitionVisible, setTransitionVisible] = useState(false)

    const timerRef = useRef(0)

    const requestClose = useCallback(() => {
      timerRef.current = 0
      setTransitionVisible(false)
    }, [])

    useEffect(() => {
      setTransitionVisible(visible)

      if (!visible) return
      if (autoClose === false) return
      if (typeof duration !== 'number') return

      timerRef.current = window.setTimeout(() => {
        requestClose()
      }, duration)

      return () => {
        clearTimeout(timerRef.current)
      }
    }, [duration, visible, autoClose, requestClose])

    const [height, setHeight] = useState<number>()
    const motionElRef = useRef<HTMLDivElement>(null)

    // 0 => scrollHeight
    const open = useCallback(() => {
      const nextHeight = motionElRef.current?.scrollHeight || 0
      setHeight(nextHeight)
    }, [])
    // scrollHeight => 0
    const close = useCallback(() => {
      // ?????????????????? dom ??????????????????????????????????????????????????????????????????
      window.requestAnimationFrame(() => {
        setHeight(0)
      })
    }, [])

    const cls = cx(prefixCls, className, `${prefixCls}--type-${type}`)

    return (
      <CSSTransition
        classNames={`${prefixCls}--motion`}
        in={transitionVisible}
        timeout={410}
        style={{ height }}
        onExit={open}
        onExiting={close}
        onExited={() => {
          destroy?.()
          onClose?.()
        }}
      >
        <div ref={motionElRef} className={`${prefixCls}-container`}>
          <div ref={ref} role={role} className={cls} {...rest}>
            <div className={`${prefixCls}__header`}>
              <span className={`${prefixCls}__icon`}> {notificationIconMap[type]}</span>
              <span className={`${prefixCls}__title`}>{title}</span>
            </div>
            {content ? <div className={`${prefixCls}__content`}>{content}</div> : null}
            {action ? <div className={`${prefixCls}__footer`}>{action}</div> : null}
            {closable ? (
              <IconButton
                className={`${prefixCls}__close`}
                effect
                icon={<CloseOutlined />}
                onClick={requestClose}
              />
            ) : null}
          </div>
        </div>
      </CSSTransition>
    )
  }
)

export interface NotificationProps extends Omit<HiBaseHTMLProps<'div'>, 'title'> {
  /**
   * ????????????
   */
  visible?: boolean
  /**
   * ??????????????????????????????
   */
  onClose?: () => void
  /**
   * ???????????????
   */
  title: React.ReactNode
  /**
   * ???????????????
   */
  content?: React.ReactNode
  /**
   * ???????????????
   */
  type?: 'info' | 'success' | 'error' | 'warning'
  /**
   * ?????????????????????????????? ms
   */
  duration?: number
  /**
   * ????????????????????????
   */
  autoClose?: boolean
  /**
   * ??????????????????
   */
  closable?: boolean
  /**
   * ?????????????????????????????????????????????
   * @private
   */
  destroy?: () => void
  /**
   * ???????????????????????????????????????
   * @private
   */
  timeout?: number
  /**
   * ????????????
   */
  action?: React.ReactNode
}

if (__DEV__) {
  Notification.displayName = 'Notification'
}
