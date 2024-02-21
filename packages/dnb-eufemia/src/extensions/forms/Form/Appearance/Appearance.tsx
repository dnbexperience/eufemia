import React from 'react'
import Provider from '../../../../shared/Provider'

export type Props = {
  size?: 'medium' | 'large'
  children: React.ReactNode
}

function FormAppearance({ children, size = null, ...rest }: Props) {
  return (
    <Provider
      Input={{ size }}
      DatePicker={{ size }}
      Autocomplete={{ size }}
      Dropdown={{ size }}
      {...rest}
    >
      {children}
    </Provider>
  )
}

export default FormAppearance
