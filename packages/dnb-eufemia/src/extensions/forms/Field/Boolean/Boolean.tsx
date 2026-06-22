import type { FieldToggleProps as ToggleFieldProps } from '../Toggle'
import ToggleField from '../Toggle'
import useTranslation from '../../hooks/useTranslation'
import type { FieldProps } from '../../types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

type BooleanProps = {
  /**
   * Text to show in the UI when value is `true`.
   */
  trueText?: string
  /**
   * Text to show in the UI when value is `false`.
   */
  falseText?: string
  /**
   * Choice of input feature. Can be: `checkbox`, `switch`, `button`, `checkbox-button` or `buttons`.
   */
  variant?: ToggleFieldProps['variant']
  /** The size of the toggle. Available sizes: `small`, `medium` (default), `large`. */
  size?: ToggleFieldProps['size']
  /**
   * Will be called on click.
   */
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
