/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
// import { Global, css } from '@emotion/react'

import { Modal, Dropdown } from '../../components'
import { Provider, Context } from '../'
// import { useTranslation as t } from '../'
// import t from '../useTranslation'
import useTranslation, {
  getTranslation,
  Translation,
} from '../useTranslation'
// import { format } from '../../components/NumberFormat'
import { P } from '../../elements'

// import nbNO from '../locales/nb-NO'
import nbNO from './translation/nb.json'
import enGB from './translation/en.json'

const nbNOx = {
  'Modal.close_title': 'StengX',
  'other.string': '{foo} ({bar} X {max})',
}

export default {
  title: 'Eufemia/Components/Translation',
}

const UseTrans = () => {
  const str = useTranslation('other.string', {
    foo: 'foo',
    bar: 'riskScore',
    max: 'max',
  })
  console.log('str', str)

  return useTranslation('other.string', {
    foo: 'foo',
    bar: 'riskScore',
    max: 'max',
  })
}

const ChangeLocale = () => {
  const {
    setLocale,
    // setCurrentLocale,// to update only the current context
    locale,
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
          'en-GB': enGB,
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
            'en-GB': enGB,
          }}
        >
          {getTranslation('other.string', {
            foo: 'foo',
            bar: 'riskScore',
            max: 'max',
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
            <Modal.Content spacing style_type="mint-green">
              <P>This is the modal text.</P>
            </Modal.Content>
          </Modal>
        </Provider>
      </Provider>
    </Box>
  </Wrapper>
)
