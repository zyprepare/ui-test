import React, { useState, useMemo } from 'react'
import { useUncontrolledState } from '@hi-ui/use-uncontrolled-state'
import { useLatestCallback } from '@hi-ui/use-latest'

export type UseToggleAction = {
  set: React.Dispatch<React.SetStateAction<boolean>>
  on: () => void
  off: () => void
  not: () => void
}

/**
 * Handles Boolean switching by `on`, `off`, `not`
 *
 * @param initialState
 */
export function useToggle(initialState: boolean | (() => boolean) = false) {
  const [bool, setBool] = useState(initialState)

  const toggle = useMemo(
    () => ({
      set: setBool,
      on: () => {
        setBool(true)
      },
      off: () => {
        setBool(false)
      },
      not: () => {
        setBool((prev) => !prev)
      },
    }),
    []
  )

  return [bool, toggle] as const
}

interface UseUncontrolledToggleProps {
  defaultVisible?: boolean | (() => boolean)
  disabled?: boolean
  visible?: boolean
  onToggle?: (visible: boolean) => void
  onClose?: () => void
  onOpen?: () => void
  isEqual?: (prev: boolean, next: boolean) => boolean
}

/**
 * Handles uncontrolled boolean switching by `on`, `off`, `not`
 */
export function useUncontrolledToggle({
  defaultVisible = false,
  visible: visibleProp,
  onClose,
  onOpen,
  onToggle,
  isEqual,
  disabled = false,
}: UseUncontrolledToggleProps) {
  const onVisibleChange = useLatestCallback((nextVisible: boolean) => {
    const callback = nextVisible ? onOpen : onClose
    callback?.()
    onToggle?.(nextVisible)
  })

  const [bool, setBool] = useUncontrolledState(
    defaultVisible,
    visibleProp,
    onVisibleChange,
    isEqual
  )

  const proxySetBool: typeof setBool = useLatestCallback((stateOrFunction) => {
    if (disabled) return
    setBool(stateOrFunction)
  })

  const toggle = useMemo(
    () => ({
      set: proxySetBool,
      on: () => {
        proxySetBool(true)
      },
      off: () => {
        proxySetBool(false)
      },
      not: () => {
        proxySetBool((prev) => !prev)
      },
    }),
    [proxySetBool]
  )

  return [bool, toggle] as const
}
