import React from 'react'
import { P, WordDefinition } from '@dnb/eufemia/src'
import ComponentBox from '../../../../shared/tags/ComponentBox'

export function WordDefinitionExampleBasic() {
  return (
    <ComponentBox data-visual-test="word-definition-closed">
      <P>
        A text with{' '}
        <WordDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
          unusual words
        </WordDefinition>{' '}
        lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </P>
    </ComponentBox>
  )
}
