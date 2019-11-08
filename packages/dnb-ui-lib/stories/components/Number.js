/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'
import Number, { format } from '../../src/components/Number'
import Provider from '../../src/shared/Provider'
import Context from '../../src/shared/Context'

const CustomStyle = styled.div`
  .dnb-number {
    ${'' /* display: block; */}
    ${'' /* color: hotpink; */}
  }
`

const ChangeLocale = () => {
  const props = React.useContext(Context)
  console.log('ChangeLocale', props)
  const { update, locale } = React.useContext(Context)

  React.useEffect(() => {
    setTimeout(() => {
      // update({ locale: 'en' })
      update({ currency: 'USD' })
    }, 3e3)
  }, [])

  return (
    <>
      {/* Can be e.g. a Dropdown */}
      {format(12345678.9, {
        locale,
        currency: true
      })}{' '}
      text
    </>
  )
}

export default [
  'Number',
  () => {
    return (
      <CustomStyle>
        <Provider
        // locale={'en'}
        >
          <Wrapper>
            <Box>
              text <Number value="12345" /> text{' '}
              <Number value={-12345678.9} />{' '}
            </Box>
            <Box>
              text <Number currency>12 345 678</Number> text text{' '}
              <Number currency>12 345</Number> text{' '}
              <Number currency>12345.0</Number> text{' '}
              <Number currency="EUR">-12345,68</Number> text{' '}
              <ChangeLocale />
            </Box>
            <Box>
              random phone number <Number value="99999999" phone /> random
              phone number <Number value="4799999999" phone /> random phone
              number <Number value="++4799999999" phone /> random phone
              number <Number value="004780022222" phone link="sms" />{' '}
              random phone number <Number value="+47116000" phone /> random
              text <Number value="+4702000" phone />
            </Box>
            <Box>
              bank account number <Number value="20001234567" ban /> random
              account number
            </Box>
            <Box>
              national identification number{' '}
              <Number value="18089212345" nin /> random identification
              number
            </Box>
          </Wrapper>
        </Provider>
      </CustomStyle>
    )
  }
]
