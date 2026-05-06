import type { FieldToggleProps as ToggleFieldProps } from '../Toggle'
import ToggleField from '../Toggle'
import useTranslation from '../../hooks/useTranslation'
import type { FieldProps } from '../../types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

type BooleanProps = {
  /** Custom label text shown when the value is `true`. Defaults to localized "Yes". */
  trueText?: string
  /** Custom label text shown when the value is `false`. Defaults to localized "No". */
  falseText?: string
  /** The visual variant of the toggle field: `checkbox`, `checkbox-button`, `button`, or `buttons`. */
  variant?: ToggleFieldProps['variant']
  /** The size of the toggle. Available sizes: `small`, `medium` (default), `large`. */
  size?: ToggleFieldProps['size']
  /** Callback fired when the toggle is clicked. */
  onClick?: ToggleFieldProps['onClick']
}

type SharedFieldProps = Omit<
  FieldProps<unknown>,
  'layout' | 'layoutOptions'
>

export type FieldBooleanProps = SharedFieldProps & BooleanProps

function BooleanComponent(props: FieldBooleanProps) {
  const { trueText, falseText, ...restProps } = props
  const translations = useTranslation().BooleanField

  return (
    <ToggleField
      {...(restProps as ToggleFieldProps)}
      valueOn={true}
      valueOff={false}
      textOn={trueText ?? translations.yes}
      textOff={falseText ?? translations.no}
      valueType="boolean"
    />
  )
}

withComponentMarkers(BooleanComponent, {
  _supportsSpacingProps: true,
})

export default BooleanComponent
