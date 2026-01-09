import React, { useCallback, useMemo } from 'react'
import type { Props as ToggleAllProps } from '../Toggle/Toggle'
import Toggle from '../Toggle/Toggle'
import useDependencePaths from './useDependencePaths'
import type { Path } from '../../types'

export type Props = Partial<Omit<ToggleAllProps, 'textOn' | 'textOff'>> & {
  /**
   * An array of paths to the data object.
   */
  dependencePaths: Array<Path>

  /**
   * When `checked`, the dependent checkboxes will always be set to "checked" when in indeterminate state.
   * When `unchecked`, the dependent checkboxes will be set to "unchecked" when in indeterminate state.
   * When "auto", the dependent checkboxes will get the inverted state from where the (this) parent checkbox is in.
   * Default is `checked`.
   */
  propagateIndeterminateState?: 'checked' | 'unchecked' | 'auto'
}

export default function Indeterminate(props: Props) {
  const {
    dependencePaths,
    propagateIndeterminateState = 'checked',
    valueOn = true,
    valueOff = false,
    value: valueProp,
    onChange,
    ...rest
  } = props

  const { indeterminate, internalValue, setAllStates, ariaControlsIds } =
    useDependencePaths(dependencePaths, propagateIndeterminateState)

  const changeHandler = useCallback(
    (value: unknown) => {
      setAllStates(value === valueOn)
      onChange?.(value === valueOn ? valueOn : valueOff)
    },
    [onChange, setAllStates, valueOff, valueOn]
  )

  const value = useMemo(() => {
    if (typeof internalValue !== 'undefined') {
      return internalValue ? valueOn : valueOff
    }

    return valueProp
  }, [valueProp, internalValue, valueOn, valueOff])

  return (
    <Toggle
      {...rest}
      variant="checkbox"
      htmlAttributes={{
        indeterminate,
        ['aria-controls']: ariaControlsIds,
      }}
      valueOn={valueOn}
      valueOff={valueOff}
      value={value}
      onChange={changeHandler}
    />
  )
}
