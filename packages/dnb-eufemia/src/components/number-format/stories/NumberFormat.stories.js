/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'
import { P } from '../../../elements'
import Provider from '../../../shared/Provider'
import NumberFormat from '../../NumberFormat'
// import Dropdown from '../../Dropdown'
import ToggleButton from '../../ToggleButton'

// import { format } from '../../NumberFormat'
import Context from '../../../shared/Context'

export default {
  title: 'Eufemia/Components/NumberFormat',
}

const CustomStyle = styled.div`
  .dnb-number-format {
    ${'' /* display: block; */}
    ${'' /* color: hotpink; */}
  }
  .dnb-sr-only--shadow {
    box-shadow: 0 0 1px 1px blue;
    margin: 0;
  }
`

const ChangeLocale = () => {
  const {
    setLocale,
    // setCurrentLocale,// to update only the current context
    locale,
  } = React.useContext(Context)

  return (
    <ToggleButton.Group
      value={locale}
      on_change={({ value }) => {
        setLocale(value)
      }}
    >
      <ToggleButton value="nb-NO" className="nb-NO">
        Norsk
      </ToggleButton>
      <ToggleButton value="en-GB" className="en-GB">
        English
      </ToggleButton>
    </ToggleButton.Group>
  )

  // return (
  // <Dropdown
  // value={locale}
  // data={{ 'en-GB': 'English', 'nb-NO': 'Norsk' }}
  // on_change={({ data: { selected_key: locale } }) => {
  // setLocale(locale)
  // }}
  // />
  // )
}

const Prefix = styled.b`
  color: red;
`

// new Intl.NumberFormat('nb-NO', { minimumFractionDigits: 4, maximumFractionDigits: 4, style: 'currency', currency: 'NOK' }).format(-12345)

export const NumberFormatSandbox = () => {
  return (
    <CustomStyle>
      <Provider
        // locale="nb-NO"
        locale="en-GB"
      >
        <Wrapper>
          <Box>
            <div
              role="tooltip"
              className="dnb-tooltip dnb-tooltip--active dnb-core-style"
            >
              <span className="dnb-tooltip__arrow dnb-tooltip__arrow__arrow--center dnb-tooltip__arrow__position--bottom" />
              <div className="dnb-tooltip__content">Copied!</div>
            </div>
          </Box>
          <Box>
            <Provider
              // locale="de-DE"
              locale="nb-NO"
              // locale="en-GB"
            >
              <NumberFormat
                prefix={() => <i>S</i>}
                suffix={<b>E</b>}
                value={'-12 345,99'}
                currency
                clean
                decimals={2}
                // locale={'nb-NO'}
                currency_position="after"
                // currency_display="name"
                // options={{
                //   // minimumSignificantDigits: 1,
                //   // maximumSignificantDigits: 6,
                //   // minimumIntegerDigits: 0
                //   minimumFractionDigits: 1,
                //   maximumFractionDigits: 1
                //   // maximumFractionDigits: 1
                // }}
              />
              <br />
              <NumberFormat
                prefix={<Prefix className="custom">S</Prefix>}
                suffix="E"
                // value={'-12 623,988'}
                // value={'-12.623,988'}
                value={'-12,623.988'}
                decimals={3}
                clean
                // currency
              />
            </Provider>
          </Box>
          <Box>
            <Provider locale="nb-NO">
              <P>
                <NumberFormat>12345.987654321</NumberFormat> text{' '}
                <NumberFormat>-12345678.9834523</NumberFormat> text{' '}
              </P>
            </Provider>
          </Box>
          <Box>
            <Provider
            //  locale="en-GB"
            >
              <ChangeLocale />
              <br />
              <NumberFormat value="-1234" decimals="2" />
              <br />
              <NumberFormat value="-1234.05" decimals="2" />
              <br />
              <P>
                text{' '}
                <NumberFormat currency clean>
                  12 345
                </NumberFormat>{' '}
                text <NumberFormat currency="USD" value="12345" /> text{' '}
                <NumberFormat currency clean>
                  12 345 678
                </NumberFormat>{' '}
                text <NumberFormat currency>12345.0</NumberFormat> text{' '}
                <NumberFormat currency="EUR">-12345,68</NumberFormat> text{' '}
              </P>
            </Provider>
          </Box>
          <Box>
            <P>
              text <NumberFormat value="12345" /> text{' '}
              <NumberFormat value={-12345678.9} />{' '}
            </P>
          </Box>
          <Box>
            <P>
              random phone number <NumberFormat value="99999999" phone />{' '}
              random phone number <NumberFormat value="4799999999" phone />{' '}
              random phone number{' '}
              <NumberFormat value="++4799999999" phone /> random phone
              number <NumberFormat value="004780022222" phone link="sms" />{' '}
              random phone number <NumberFormat value="+47116000" phone />{' '}
              random text <NumberFormat value="+4702000" phone />
            </P>
          </Box>
          <Box>
            <P>
              bank account number <NumberFormat value="20001234567" ban />{' '}
              random account number
            </P>
          </Box>
          <Box>
            <P>
              national identification number{' '}
              <NumberFormat value="18089212345" nin /> random
              identification number
            </P>
          </Box>
        </Wrapper>
      </Provider>
    </CustomStyle>
  )
}
