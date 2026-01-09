/**
 * Test Helpers for InputMasked Hooks
 *
 */

import type { ReactNode } from 'react';
import React from 'react'
import InputMaskedContext from '../../InputMaskedContext'
import type { ContextProps } from '../../../../shared/Context'
import type { InputMaskedProps } from '../../InputMasked'

type TestContextProps = Partial<Pick<ContextProps, 'locale'>>

interface WrapperProps {
  children: ReactNode
}

export const createWrapper = (
  props: Partial<InputMaskedProps> = {},
  context: TestContextProps = {}
) => {
  return ({ children }: WrapperProps) => (
    <InputMaskedContext.Provider
      value={{
        props: { value: null, ...props },
        context: context as ContextProps,
      }}
    >
      {children}
    </InputMaskedContext.Provider>
  )
}
