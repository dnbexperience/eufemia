import React from 'react'
import { WordDefinition } from '@dnb/eufemia/src'

export function WordDefinitionExampleBasic() {
  return (
    <p>
      A text with{' '}
      <WordDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
        unusual words
      </WordDefinition>
      .
    </p>
  )
}
