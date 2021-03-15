/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'
import { P } from '@dnb/eufemia/src/elements'
import Provider from '@dnb/eufemia/src/shared/Provider'
import NumberFormat from '@dnb/eufemia/src/components/NumberFormat'
// import Dropdown from '@dnb/eufemia/src/components/Dropdown'
import ToggleButton from '@dnb/eufemia/src/components/ToggleButton'

// import { format } from '@dnb/eufemia/src/components/NumberFormat'
import Context from '@dnb/eufemia/src/shared/Context'

export default {
  title: 'Eufemia/Components/NumberFormat'
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
    locale
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
          <Box>
            <p className="dnb-p">
              Hidden text:
              <span className="dnb-sr-only--inline">
                I am only visible to screen readers, so you probably can't
                see me.. Unless you're using a screen reader.
              </span>
              !
            </p>
            <p className="dnb-p dnb-sr-only dnb-not-sr-only">
              I'm the opposite of .dnb-sr-only, so you should be able to
              see me.
            </p>
            <p className="dnb-sr-only--shadow">hello 1</p>
            <span className="dnb-sr-only">hello 2</span>
            <span className="dnb-sr-only--inline">hello 3</span>
            <p className="dnb-sr-only--shadow">end</p>
            ---
            <p className="dnb-sr-only--shadow">hello 1</p>
            <p className="dnb-sr-only">hello 2</p>
            <div className="dnb-sr-only--inline">hello 3</div>
            {/* <span className="dnb-sr-only--inline-wrapper">
            </span> */}
            <p className="dnb-sr-only--shadow">end</p>
            <button className="dnb-button dnb-button--primary">
              <NumberFormat value={-12345678.9} />
            </button>
          </Box>
        </Wrapper>
      </Provider>
    </CustomStyle>
  )
}
