import type { ReactNode } from 'react'
import Provider from '../../../../shared/Provider'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type FormAppearanceProps = {
  size?: 'medium' | 'large'
  children: ReactNode
}

function FormAppearance({ children, size, ...rest }: FormAppearanceProps) {
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

withComponentMarkers(FormAppearance, {
  _supportsSpacingProps: 'passthrough',
})

export default FormAppearance
