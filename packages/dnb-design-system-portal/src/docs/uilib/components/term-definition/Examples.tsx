import React from 'react'
import { H2, Lead, P, TermDefinition } from '@dnb/eufemia/src'
import ComponentBox from '../../../../shared/tags/ComponentBox'

export function TermDefinitionExampleBasic() {
  return (
    <ComponentBox
      data-visual-test="term-definition-basic"
      background="white"
      hideCode
    >
      <P>
        A text with{' '}
        <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
          unusual words (yeah)
        </TermDefinition>{' '}
        lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </P>
    </ComponentBox>
  )
}

export function TermDefinitionExampleLead() {
  return (
    <ComponentBox
      data-visual-test="term-definition-typography"
      background="white"
    >
      <Lead>
        As a lead with{' '}
        <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
          unusual words (yeah)
        </TermDefinition>
        .
      </Lead>
      <H2 top={false}>
        As a heading with{' '}
        <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
          unusual words (yeah)
        </TermDefinition>
        .
      </H2>
    </ComponentBox>
  )
}
