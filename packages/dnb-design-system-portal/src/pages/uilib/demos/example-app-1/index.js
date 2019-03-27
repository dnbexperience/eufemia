/**
 * Page
 *
 */

import React, { PureComponent } from 'react'
import { css } from '@emotion/core'
import Head from 'react-helmet'
import dnb from 'dnb-ui-lib/src/lib'
import {
  Input,
  Dropdown,
  Switch,
  MainNav,
  ViewTitle,
  StepIndicator,
  FormLabel,
  LineTitle,
  Form,
  Modal,
  FieldsetDescription,
  ActionNav
} from 'dnb-ui-lib/src'

const style = css`
  background: white;
`

export default class ExampleAppPage extends PureComponent {
  componentDidMount() {
    dnb.enableWebComponents()
  }
  render() {
    return (
      <div className="main">
        <Head>
          <title>Example App 1</title>
          <link
            rel="preload"
            href="/static/FedraSansStd-Book-16f3175a8555daaac25d4ece485c9486.woff"
            as="font"
            type="font/woff"
            crossOrigin
          />
        </Head>
        <div css={style}>
          <MainNav
            notification_amount="2"
            data={[
              { title: 'Title 1', url: '?url1' },
              { title: 'Title 2', url: '?url2' },
              { title: 'Title 3', url: '?url3' },
              { title: 'Title 4', url: '?url4' },
              { title: 'Title 5', url: '?url5' },
              { title: 'Title 6', url: '?url6' }
            ]}
          />

          <div className="dnb-width-limit">
            <ViewTitle text="Søk om lån" />
          </div>

          <StepIndicator data={stepIndicatorData} active_item="1" />

          <Form>
            <fieldset className="dnb-form__fieldset">
              <div className="dnb-width-limit">
                <LineTitle content="Informasjon om kjøpet" tag="legend" />

                <FieldsetDescription text="Vi trenger informasjon om boligkjøpet for å beregne et låneforslag. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.              " />

                <div className="dnb-form__item">
                  <div className="dnb-form__cell">
                    <FormLabel for_id="kjopesum" text="Kjøpesum:" />
                  </div>

                  <div className="dnb-form__cell">
                    <Input
                      type="text"
                      id="kjopesum"
                      placeholder="1 000 000"
                      value=""
                      description="Kr"
                    />
                  </div>
                </div>

                <div className="dnb-form__item">
                  <div className="dnb-form__cell">
                    <FormLabel
                      for_id="radio-switch-1"
                      text="Boligen har fellesgjeld:"
                    />
                  </div>
                  <div className="dnb-form__cell">
                    <Switch
                      id="radio-switch-1"
                      title_positive="ja"
                      title_negative="nei"
                      title="Ths is the title"
                      value="Value of switch"
                      is_on={false}
                    />
                  </div>
                </div>

                <div className="dnb-form__item">
                  <div className="dnb-form__cell">
                    <FormLabel
                      for_id="radio-switch-2"
                      text="Boligen er selveierbolig:"
                    />
                  </div>
                  <div className="dnb-form__cell">
                    <Switch
                      id="radio-switch-2"
                      title_positive="ja"
                      title_negative="nei"
                      title="Ths is the title"
                      value="Value of switch"
                      is_on={true}
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="dnb-form__fieldset">
              <div className="dnb-width-limit">
                <LineTitle content="Informasjon om megler" tag="legend" />

                <FieldsetDescription text="Vi ønsker informasjon om hvordan boligkjøpet ble gjennomført." />

                <div className="dnb-form__item">
                  <div className="dnb-form__cell">
                    <FormLabel
                      for_id="radio-switch-3"
                      text="Boligen er kjøpt privat:"
                    />
                  </div>

                  <div className="dnb-form__cell">
                    <div className="dnb-form__cell__cell">
                      <Switch
                        id="radio-switch-3"
                        title_positive="ja"
                        title_negative="nei"
                        title="Ths is the title"
                        value="Value of switch"
                        is_on={false}
                      />
                    </div>
                    <div className="dnb-form__cell__cell">
                      <Modal
                        type="button"
                        trigger_text="Trykk for mer info"
                        modal_content="Dette er litt ekstra informasjon. Lorem ipsum lipsumbolius."
                      />
                    </div>
                  </div>
                </div>

                <div className="dnb-form__item">
                  <div className="dnb-form__cell">
                    <FormLabel for_id="meglernavn" text="Meglers navn:" />
                  </div>

                  <div className="dnb-form__cell">
                    <Input
                      type="text"
                      id="meglernavn"
                      placeholder="Hans Kristian"
                      value=""
                      description=""
                    />
                  </div>
                </div>

                <div className="dnb-form__item">
                  <div className="dnb-form__cell">
                    <FormLabel
                      for_id="eiendomsmegler"
                      text="Eiendomsmegler/firma:"
                    />
                  </div>

                  <div className="dnb-form__cell">
                    <Input
                      type="text"
                      id="eiendomsmegler"
                      placeholder="DNB Eiendom"
                      value=""
                      description=""
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="dnb-form__fieldset">
              <div className="dnb-width-limit">
                <LineTitle content="Nedbetaling" tag="legend" />

                <div className="dnb-form__item dnb-form__item--top-align">
                  <div className="dnb-form__cell">
                    <FormLabel
                      for_id="account_dropdown"
                      text="Velg konto som skal belastes:"
                    />
                  </div>
                  <div className="dnb-form__cell">
                    <Dropdown
                      id="account_dropdown"
                      data={dropdownData}
                      selected_item={3}
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="dnb-form__fieldset">
              <div className="dnb-width-limit">
                <LineTitle content="Matrikkelinformasjon" tag="legend" />

                <FieldsetDescription text="For å etablere sikkerhet (pant) for et boligjøp trenger vi spesifikk informasjon om boligen. Du finner dette i prospektet." />

                <div className="dnb-form__item">
                  <div className="dnb-form__cell">
                    <FormLabel for_id="kommune" text="Kommune:" />
                  </div>
                  <div className="dnb-form__cell">
                    <Input
                      type="text"
                      id="kommune"
                      placeholder=""
                      value=""
                      description=""
                    />
                  </div>
                </div>

                <div className="dnb-form__item">
                  <div className="dnb-form__cell">
                    <FormLabel for_id="gardsnr" text="Gårdsnr:" />
                  </div>
                  <div className="dnb-form__cell">
                    <Input
                      type="text"
                      id="gardsnr"
                      placeholder=""
                      value=""
                      description=""
                    />
                  </div>
                </div>

                <div className="dnb-form__item">
                  <div className="dnb-form__cell">
                    <FormLabel for_id="bruksnr" text="Bruksnr:" />
                  </div>
                  <div className="dnb-form__cell">
                    <Input
                      type="text"
                      id="bruksnr"
                      placeholder=""
                      value=""
                      description=""
                    />
                  </div>
                </div>

                <div className="dnb-form__item">
                  <div className="dnb-form__cell">
                    <FormLabel for_id="seksjonsnr" text="Seksjonsnr:" />
                  </div>
                  <div className="dnb-form__cell">
                    <Input
                      type="number"
                      id="seksjonsnr"
                      placeholder=""
                      value=""
                      description=""
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <ActionNav
              prev_href="?back"
              next_href="/uilib/demos/example-app-2/"
            />
          </Form>
        </div>
      </div>
    )
  }
}

const stepIndicatorData = JSON.stringify([
  {
    title: 'Om din nye bolig',
    url: '?a'
  },
  {
    title: 'Ditt lån og egenkapital',
    url: '?d'
  },
  {
    title: 'Oppsummering',
    url: '?c'
  }
])

const dropdownData = JSON.stringify([
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: ['1234.56.78901', 'Brukskonto - Kari Nordmann']
  },
  {
    selected_value: 'Sparekonto - Kari Nordmann',
    content: ['1234.56.78901', 'Sparekonto - Kari Nordmann']
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      '1134.56.78961',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: 'Oppussing - Kari Nordmann',
    content: ['1534.96.48901', 'Oppussing - Kari Nordmann']
  }
])
