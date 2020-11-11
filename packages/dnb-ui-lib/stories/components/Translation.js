/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import { Global, css } from '@emotion/core'

import { Modal, Dropdown } from '../../src/components'
import { Provider, Context } from '../../src/shared'
// import { useTranslation as t } from '../../src/shared'
// import t from '../../src/shared/useTranslation'
import useTranslation, {
  getTranslation,
  Translation
} from '../../src/shared/useTranslation'
// import { format } from '../../src/components/Number'
import { P } from '../../src/elements'

// import nbNO from 'dnb-ui-lib/src/shared/locales/nb-NO'
import nbNO from './translation/nb.json'
import enUS from './translation/en.json'

const nbNOx = {
  'Modal.close_title': 'StengX',
  'other.string': '{foo} ({bar} X {max})'
}

export default {
  title: 'Eufemia/Components/Translation'
}

const UseTrans = () => {
  const str = useTranslation('other.string', {
    foo: 'foo',
    bar: 'riskScore',
    max: 'max'
  })
  console.log('str', str)

  return useTranslation('other.string', {
    foo: 'foo',
    bar: 'riskScore',
    max: 'max'
  })
}

const ChangeLocale = () => {
  const {
    setLocale,
    // setCurrentLocale,// to update only the current context
    locale
  } = React.useContext(Context)
  console.log('locale', locale)

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setLocale('en-GB')
  //   }, 2e3)
  // }, [])

  return (
    <Dropdown
      value={locale}
      data={{ 'en-GB': 'English', 'nb-NO': 'Norsk' }}
      on_change={({ data: { selected_key: locale } }) => {
        setLocale(locale)
      }}
    />
  )
}

export const TranslationSandbox = () => (
  <Wrapper>
    <Box>
      <Provider
        // locale="en-GB"
        locales={{
          'nb-NO': nbNOx,
          'en-GB': enUS
        }}
      >
        <ChangeLocale />
        <br />
        <br />
        <UseTrans />
        ---
        <Provider
          // locale="en-GB"
          locales={{
            'nb-NO': nbNO,
            'en-GB': enUS
          }}
        >
          {getTranslation('other.string', {
            foo: 'foo',
            bar: 'riskScore',
            max: 'max'
          })}

          <Translation
            id="other.string"
            foo="foo"
            bar="riskScore"
            max="max"
          />
          <Translation foo="foo" bar="riskScore" max="max">
            other.string
          </Translation>

          <Modal
            title="Modal Title"
            //  open_state="opened"
          >
            <Modal.Inner spacing style_type="mint-green">
              <P>This is the modal text. Triggered by the help button.</P>
            </Modal.Inner>
          </Modal>
        </Provider>
      </Provider>
    </Box>
  </Wrapper>
)
