import React from 'react'
import { H2, Lead, P, WordDefinition } from '@dnb/eufemia/src'
import ComponentBox from '../../../../shared/tags/ComponentBox'

export function WordDefinitionExampleBasic() {
  return (
    <ComponentBox
      data-visual-test="word-definition-basic"
      background="white"
      hideCode
    >
      <P>
        A text with{' '}
        <WordDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
          unusual words (yeah)
        </WordDefinition>{' '}
        lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </P>
    </ComponentBox>
  )
}

export function WordDefinitionExampleLead() {
  return (
    <ComponentBox
      data-visual-test="word-definition-typography"
      background="white"
    >
      <Lead>
        As a lead with{' '}
        <WordDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
          unusual words (yeah)
        </WordDefinition>
        .
      </Lead>
      <H2 top={false}>
        As a heading with{' '}
        <WordDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
          unusual words (yeah)
        </WordDefinition>
        .
      </H2>
    </ComponentBox>
  )
}
