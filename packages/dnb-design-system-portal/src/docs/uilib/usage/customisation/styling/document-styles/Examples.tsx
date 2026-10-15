import { useState } from 'react'
import { H1, H2, P } from '@dnb/eufemia/src/elements'
import {
  Button,
  Checkbox,
  Dropdown,
  Logo,
} from '@dnb/eufemia/src/components'
import {
  DnbDefault,
  SbankenDefault,
  CarnegieDefault,
  EiendomDefault,
} from '@dnb/eufemia/src/components/Logo'
import { Theme, useTheme } from '@dnb/eufemia/src/shared'
import { useThemeHandler } from '../../../../../../../vite/client/shims/theme-handler'
import '@dnb/eufemia/src/style/dnb-ui-document.scss'
import '@dnb/eufemia/src/style/dnb-ui-print.scss'
import styles from './preview.module.scss'

const brands = {
  ui: 'DNB',
  sbanken: 'Sbanken',
  carnegie: 'DNB Carnegie',
  eiendom: 'DNB Eiendom',
}
type DocumentBrand = keyof typeof brands
const logos = {
  ui: DnbDefault,
  sbanken: SbankenDefault,
  carnegie: CarnegieDefault,
  eiendom: EiendomDefault,
}

export function DocumentLetter({
  brand: brandProp,
  long = false,
}: {
  brand?: DocumentBrand
  long?: boolean
}) {
  const theme = useTheme()
  const brand = brandProp ?? theme?.brand ?? 'ui'

  return (
    <Theme brand={brand} colorScheme="light">
      <article
        className={`dnb-document dnb-print ${styles.letter}`}
        lang="nb"
        id="letter"
      >
        <header className={styles.letterHeader}>
          <Logo svg={logos[brand]} height="2rem" />
          <p className="dnb-document__return-address">
            Returadresse: {brands[brand]}, Postboks 1600 Sentrum, 0021 Oslo
          </p>
        </header>
        <div className={styles.recipient}>
          <p>
            Ola Nordmann
            <br />
            Eksempelveien 12
            <br />
            0123 Oslo
          </p>
          <p>14. oktober 2026</p>
        </div>
        <H1 bottom="small">Informasjon om avtalen din</H1>
        <P>Hei Ola,</P>
        <P>
          Vi har samlet informasjon om avtalen din og hva du bør være
          oppmerksom på. Du finner detaljene i oversikten nedenfor.
        </P>
        <H2 size="x-large">Dette gjelder for deg</H2>
        <ul className="dnb-ul">
          <li>Avtalen fortsetter som før.</li>
          <li>
            Du kan se oppdatert informasjon i appen eller på nettsiden vår.
          </li>
          <li>Ta kontakt dersom du har spørsmål.</li>
        </ul>
        <h3>Oversikt over avtalen</h3>
        <table className="dnb-table">
          <thead>
            <tr>
              <th scope="col">Beskrivelse</th>
              <th scope="col">Dato</th>
              <th scope="col" align="right">
                Beløp
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: long ? 80 : 3 }, (_, index) => (
              <tr key={index}>
                <td>Avtalepost {index + 1}</td>
                <td>14.10.2026</td>
                <td align="right">1 250,00 kr</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          Har du spørsmål, kan du ta kontakt med oss på 915 04800.
          <br />
          Takk for at du er kunde hos oss.
        </P>
        <P className="dnb-document__signature dnb-print__keep-together">
          Vennlig hilsen
          <br />
          {brands[brand]}
        </P>
        <footer className="dnb-document__footer">
          <P>
            Kun stilforhåndsvisning. Innhold og oppsett er eksempler, ikke
            en brevmal.
          </P>
        </footer>
      </article>
    </Theme>
  )
}

export function DocumentPreview() {
  const { brand: activeBrand, setTheme } = useThemeHandler()
  const [long, setLong] = useState(false)

  return (
    <div className={styles.preview} data-document-preview>
      <div className={`dnb-print-hidden ${styles.controls}`}>
        <H1>Document style preview</H1>
        <P>
          This page previews typography, spacing, branding and print
          behavior. The fictional content and letter layout are
          illustrative, not a document template. Create your own layout and
          content when using these styles.
        </P>
        <Dropdown
          id="document-preview-brand"
          label="Brand"
          labelDirection="horizontal"
          data={brands}
          value={activeBrand}
          onChange={({ data }) =>
            setTheme({ brand: data.selectedKey as DocumentBrand })
          }
        />
        <Checkbox
          label="Multi-page table"
          checked={long}
          onChange={({ checked }) => setLong(checked)}
        />
        <Button
          text="Print / save PDF"
          variant="secondary"
          onClick={async () => {
            await document.fonts.ready
            window.print()
          }}
        />
        <P>Application text outside the document keeps its normal size.</P>
      </div>
      <DocumentLetter long={long} />
    </div>
  )
}
