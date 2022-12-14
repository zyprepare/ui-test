import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useCallback,
  forwardRef,
  useRef,
} from 'react'
import { debounce } from '@hi-ui/func-utils'
import type { DebounceReturn } from '@hi-ui/func-utils'
import { CSSTransition } from 'react-transition-group'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { Portal } from '@hi-ui/portal'
import { HiBaseHTMLProps, HiBaseSizeEnum } from '@hi-ui/core'

const _role = 'loading'
export const _prefix = getPrefixCls('loading')

export const Loading = forwardRef<null, LoadingProps>(
  (
    {
      prefixCls = _prefix,
      className,
      children,
      role = _role,
      container,
      content,
      visible = true,
      full = false,
      part = false,
      size = 'md',
      delay = -1,
      disabledPortal = false,
      innerRef,
      timeout = 300,
      ...restProps
    },
    ref
  ) => {
    const [internalVisible, setInternalVisible] = useState(false)

    // Real trigger loading update
    const updateLoadingStatus = useCallback(() => {
      if (internalVisible === visible) return
      setInternalVisible(visible)
    }, [internalVisible, visible])

    const prevDebouncedUpdateRef = useRef<null | DebounceReturn>(null)

    const cancelWaitingLoading = () => {
      prevDebouncedUpdateRef.current?.cancel()
    }

    const shouldDelay = visible && delay >= 0

    const debouncedLoadingUpdater = useCallback(() => {
      cancelWaitingLoading()

      if (shouldDelay) {
        const debouncedUpdateLoading = debounce(updateLoadingStatus, delay)
        prevDebouncedUpdateRef.current = debouncedUpdateLoading

        debouncedUpdateLoading()
      } else {
        updateLoadingStatus()
        prevDebouncedUpdateRef.current = null
      }
    }, [delay, shouldDelay, updateLoadingStatus])

    useEffect(() => {
      debouncedLoadingUpdater()

      return () => {
        cancelWaitingLoading()
      }
    }, [debouncedLoadingUpdater])

    useImperativeHandle(innerRef, () => ({
      close: () => setInternalVisible(false),
    }))

    const cls = cx(
      prefixCls,
      className,
      size && `${prefixCls}--size-${size}`,
      !full && (part || !!children) && `${prefixCls}--part`,
      full && `${prefixCls}--full`
    )

    const loadingComponent = (
      <CSSTransition
        classNames={`${prefixCls}--motion`}
        in={internalVisible}
        timeout={timeout}
        unmountOnExit
      >
        <div ref={ref} role={role} className={cls} {...restProps}>
          <div className={`${prefixCls}__mask`} />
          <div className={`${prefixCls}__icon-wrapper`}>
            <div className={`${prefixCls}__icon`}>
              <div />
              <div />
            </div>
          </div>
          {content ? <span className={`${prefixCls}__content`}>{content}</span> : null}
        </div>
      </CSSTransition>
    )

    return (
      <Portal container={container} disabled={!container && !full}>
        {children ? (
          // ???????????? children margin??????????????????????????????????????? margin ??????
          // ??????????????????????????????????????????????????? margin ????????????????????????
          <div className={`${prefixCls}__wrapper`}>
            {children}
            {loadingComponent}
          </div>
        ) : (
          loadingComponent
        )}
      </Portal>
    )
  }
)

export type LoadingSizeEnum = HiBaseSizeEnum | undefined

export interface LoadingProps extends HiBaseHTMLProps<'div'> {
  /**
   * 	?????????????????????????????????
   */
  content?: React.ReactNode
  /**
   * ??????????????????
   */
  visible?: boolean
  /**
   * ????????????????????????????????????????????? body
   */
  full?: boolean
  /**
   * ????????????????????????????????????????????????????????????
   */
  delay?: number
  /**
   * ???????????????
   */
  size?: LoadingSizeEnum
  /**
   * ?????? portal?????????????????????
   * @private
   */
  disabledPortal?: boolean
  /**
   * ?????? ref???????????????????????????
   * @private
   */
  innerRef?: React.Ref<{ close: () => void }>
  /**
   * ?????? portal ??????????????????????????????
   * @private
   */
  container?: HTMLElement | null
  /**
   * ????????????????????????????????????????????????
   * @private
   */
  timeout?: number
  /**
   * ?????????????????????????????????
   * @private
   */
  part?: boolean
}

if (__DEV__) {
  Loading.displayName = 'Loading'
}
