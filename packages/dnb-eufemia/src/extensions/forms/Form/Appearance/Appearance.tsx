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
      Textarea={{ size }}
      DatePicker={{ size }}
      Autocomplete={{ size }}
      Dropdown={{ size }}
      {...rest}
    >
      {children}
    </Provider>
  )
}

FormAppearance._supportsSpacingProps = 'children'
export default FormAppearance
