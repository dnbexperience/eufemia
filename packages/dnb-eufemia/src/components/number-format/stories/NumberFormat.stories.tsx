/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useLayoutEffect } from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'
import { H3, P } from '../../..'
import Provider from '../../../shared/Provider'
import NumberFormat from '../../NumberFormat'
import ToggleButton from '../../ToggleButton'
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
  const { setLocale, locale } = React.useContext(Context)

  return (
    <ToggleButton.Group
      value={locale}
      onChange={({ value }) => {
        setLocale(value as string)
      }}
    >
      <ToggleButton value="nb-NO" className="nb-NO">
        Norsk
      </ToggleButton>
      <ToggleButton value="sv-SE" className="sv-SE">
        Svenska
      </ToggleButton>
      <ToggleButton value="en-GB" className="en-GB">
        GB
      </ToggleButton>
      <ToggleButton value="en-US" className="en-US">
        US
      </ToggleButton>
    </ToggleButton.Group>
  )
}

const Prefix = styled.b`
  color: red;
`

export const NumberFormatSandbox = () => {
  return (
    <CustomStyle>
      <Provider locale="en-GB">
        <Wrapper>
          <Box>
            <Provider
              // locale="de-DE"
              locale="nb-NO"
              // locale="en-GB"
            >
              <NumberFormat.Currency
                prefix={() => <i>S</i>}
                suffix={<b>E</b>}
                value={'-12 345,99'}
                clean
                decimals={2}
                currencyPosition="after"
              />
              <br />
              <NumberFormat.Number
                prefix={<Prefix className="custom">S</Prefix>}
                suffix="E"
                value={'-12,623.988'}
                decimals={3}
                clean
              />
            </Provider>
          </Box>
          <Box>
            <Provider locale="nb-NO">
              <P>
                <NumberFormat.Number>12345.987654321</NumberFormat.Number>{' '}
                text{' '}
                <NumberFormat.Number>
                  -12345678.9834523
                </NumberFormat.Number>{' '}
                text{' '}
              </P>
            </Provider>
          </Box>
          <Box>
            <Provider>
              <ChangeLocale />
              <br />
              <NumberFormat.Number value="-1234" decimals={2} />
              <br />
              <NumberFormat.Number value="-1234.05" decimals={2} />
              <br />
              <P>
                text{' '}
                <NumberFormat.Currency clean>12 345</NumberFormat.Currency>{' '}
                text <NumberFormat.Currency currency="USD" value="12345" />{' '}
                text{' '}
                <NumberFormat.Currency clean>
                  12 345 678
                </NumberFormat.Currency>{' '}
                text <NumberFormat.Currency>12345.0</NumberFormat.Currency>{' '}
                text{' '}
                <NumberFormat.Currency currency="EUR">
                  -12345,68
                </NumberFormat.Currency>{' '}
                text{' '}
              </P>
            </Provider>
          </Box>
          <Box>
            <P>
              text <NumberFormat.Number value="12345" /> text{' '}
              <NumberFormat.Number value={-12345678.9} />{' '}
            </P>
          </Box>
          <Box>
            <P>
              random phone number{' '}
              <NumberFormat.PhoneNumber value="99999999" /> random phone
              number <NumberFormat.PhoneNumber value="4799999999" /> random
              phone number{' '}
              <NumberFormat.PhoneNumber value="++4799999999" /> random
              phone number{' '}
              <NumberFormat.PhoneNumber value="004780022222" link="sms" />{' '}
              random phone number{' '}
              <NumberFormat.PhoneNumber value="+47116000" /> random text{' '}
              <NumberFormat.PhoneNumber value="+4702000" />
            </P>
          </Box>
          <Box>
            <P>
              bank account number{' '}
              <NumberFormat.BankAccountNumber value="20001234567" /> random
              account number
            </P>
          </Box>
          <Box>
            <P>
              national identification number{' '}
              <NumberFormat.NationalIdentityNumber value="18089212345" />{' '}
              random identification number
            </P>
          </Box>

          <Box>
            <H3>Not Monospace</H3>
            <div>
              <NumberFormat.Currency value="1111111.11" currency="NOK" />
            </div>
            <div>
              <NumberFormat.Currency value="2222222.22" currency="AAA" />
            </div>
            <div>
              <NumberFormat.Currency value="1212121.12" currency="III" />
            </div>
            <div>
              <NumberFormat.Currency value="1010101.01" currency="LLL" />
            </div>
            <H3>Monospace</H3>
            <div>
              <NumberFormat.Currency
                monospace
                value="1111111.11"
                currency="NOK"
              />
            </div>
            <div>
              <NumberFormat.Currency
                monospace
                value="2222222.22"
                currency="AAA"
              />
            </div>
            <div>
              <NumberFormat.Currency
                monospace
                value="1212121.12"
                currency="III"
              />
            </div>
            <div>
              <NumberFormat.Currency
                monospace
                value="1010101.01"
                currency="LLL"
              />
            </div>
          </Box>
        </Wrapper>
      </Provider>
    </CustomStyle>
  )
}

export function Hover() {
  useLayoutEffect(() => {
    document.documentElement.setAttribute('lang', 'nb-NO')
  }, [])

  return (
    <>
      <button>my button</button>
      <p>text A</p>

      <NumberFormat.NationalIdentityNumber>
        18089212345
      </NumberFormat.NationalIdentityNumber>

      <p>text B</p>
    </>
  )
}
