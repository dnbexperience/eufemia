import ui from '@dnb/eufemia/src/style/themes/ui/ui-theme-basis.scss?inline'
import uiDark from '@dnb/eufemia/src/style/themes/ui/ui-theme-dark-mode.scss?inline'
import sbanken from '@dnb/eufemia/src/style/themes/sbanken/sbanken-theme-basis.scss?inline'
import sbankenDark from '@dnb/eufemia/src/style/themes/sbanken/sbanken-theme-dark-mode.scss?inline'
import eiendom from '@dnb/eufemia/src/style/themes/eiendom/eiendom-theme-basis.scss?inline'
import eiendomDark from '@dnb/eufemia/src/style/themes/eiendom/eiendom-theme-dark-mode.scss?inline'
import carnegie from '@dnb/eufemia/src/style/themes/carnegie/carnegie-theme-basis.scss?inline'

// Keep the real brand palettes local when the Portal swaps its active stylesheet.
const styles = Object.entries({
  ui: ui + uiDark,
  sbanken: sbanken + sbankenDark,
  eiendom: eiendom + eiendomDark,
  carnegie,
})
  .map(([brand, css]) =>
    css.replaceAll('.eufemia-scope--portal', '.portal-home-brand-' + brand)
  )
  .join('\n')

export default function HomeBrands() {
  return <style>{styles}</style>
}
