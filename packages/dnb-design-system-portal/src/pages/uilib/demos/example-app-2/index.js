/**
 * Page
 *
 */

import React, { Component } from 'react'
import { css } from 'react-emotion'
import Head from 'react-helmet'
import dnb, {
  Button,
  // Slider,
  Body,
  MainNav,
  ViewTitle,
  StepIndicator,
  LineTitle,
  Form,
  RangeSlider,
  FormSummary,
  ActionNav
} from 'dnb-ui-lib/src'
import LoanSausage from './LoanSausage'
// import 'dnb-ui-lib/src/components/style'
// import 'dnb-ui-lib/src/patterns/style'

// UI Style
import 'dnb-ui-lib/src/style'

const style = css`
  background: white;
`

export default class ExampleAppPage extends Component {
  componentDidMount() {
    dnb.enableWebComponents()
  }
  render() {
    return (
      <Body className="main">
        <Head>
          <title>Example App</title>
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
            <ViewTitle text="Finansieringsbevis" />
          </div>

          <StepIndicator data={stepIndicatorData} active_item="4" />

          <Form>
            <fieldset className="dnb-form__fieldset">
              <div className="dnb-width-limit">
                <LineTitle
                  content="Din egenkapital og lånemulighet"
                  tag="legend"
                />
              </div>

              <LoanSausage
                equity="1 808 888"
                loan="4 300 000"
                currency="kr"
              />

              <div className="dnb-width-limit">
                <RangeSlider
                  label_text="Hvor mye ønsker du å kjøpe bolig for?"
                  range_min={1000000}
                  range_max={8000000}
                  range_val={5908000}
                  range_step={100000}
                  range_output_description="Kr"
                  range_output_extra_information="Maksimumsbeløpet inkluderer eventuell fellesgjeld og omkostninger ved kjøp."
                  range_modal_trigger_text="Trykk for mer info"
                  range_modal_text="Dette er litt ekstra informasjon. Lorem ipsum lipsumbolius."
                />
              </div>
            </fieldset>

            <FormSummary
              title="Hva vil dette koste?"
              text="Dette er et estimat basert på eksempelrente og en nedbetalingstid på 25 år. Månedkostnadene inkluderer renter og avdrag."
              descriptionListInfo="* Du må alltid ta høyde for en renteøkning på 5%. Samtidig må du også vurdere hvordan lånekostnadene vil påvirke din økonomi."
              descriptionListData={[
                {
                  title: 'Månedskostnad',
                  value: '19 200 kr'
                },
                {
                  title: 'Månedkostnad ved 5% renteøkning',
                  value: '31 500 kr*'
                }
              ]}
            />
          </Form>

          <ActionNav
            prev_href="/uilib/demos/example-app-1/"
            next_href="/uilib/demos/example-app-3/"
            // render_left_content={() => <h3>Custom left nav content</h3>}
          >
            <div className="dnb-action-nav__item">
              <Button
                text="Lagre"
                title="Lagre"
                icon_position="left"
                variant="secondary"
                icon="download"
              />
            </div>
            <div className="dnb-action-nav__item">
              <Button
                text="Avbryt"
                title="Avbryt"
                icon_position="left"
                variant="secondary"
                icon="close"
              />
            </div>
          </ActionNav>
        </div>
      </Body>
    )
  }
}

const stepIndicatorData = JSON.stringify([
  {
    title: 'Velg bolig',
    url: '?a'
  },
  {
    title: 'Egenkapital bolig',
    url: '?b'
  },
  {
    title: 'Din økonomi',
    url: '?c'
  },
  {
    title: 'Dine muligheter',
    url: '?d'
  },
  {
    title: 'Oppsummering',
    url: '?e'
  }
])
