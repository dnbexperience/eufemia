import NumberFormatBase, {
  type NumberFormatInternalFormatter,
  type NumberFormatProps,
} from './NumberFormatBase'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

/**
 * Create a `NumberFormat.*` variant component.
 *
 * Each variant imports only the formatter it cares about
 * (`formatCurrency`, `formatNumber`, …) and passes it here.
 *
 * - `ThisVariantProps` narrows the public prop surface of the variant.
 * - `formatter` is injected as `__format` so `NumberFormatBase` can pick
 *   the minimal formatter and allow tree shaking.
 * - `forcedProps` lets a variant force props that define it
 *   (e.g. `{ currency: true }` on `NumberFormat.Currency`).
 */
export function withFormatter<
  ThisVariantProps extends Partial<NumberFormatProps>,
>(
  displayName: string,
  formatter: NumberFormatInternalFormatter,
  forcedProps: Partial<NumberFormatProps> = {}
) {
  function NumberFormatVariant(props: ThisVariantProps) {
    return (
      <NumberFormatBase {...forcedProps} {...props} __format={formatter} />
    )
  }

  NumberFormatVariant.displayName = displayName
  withComponentMarkers(NumberFormatVariant, {
    _supportsSpacingProps: true,
  })

  return NumberFormatVariant
}
