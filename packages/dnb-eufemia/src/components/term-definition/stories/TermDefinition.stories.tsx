import React from 'react'
import TermDefinition from '../TermDefinition'
import '../style/dnb-term-definition.scss'
import { P } from '../../../elements'

export default {
  title: 'Eufemia/Components/TermDefinition',
}

export const Basic = {
  render: () => (
    <P space="2rem">
      <button>A</button> before{' '}
      <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
        unusual words
      </TermDefinition>{' '}
      text. <button>B</button> after.
    </P>
  ),
}
