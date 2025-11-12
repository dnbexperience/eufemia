import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import WordDefinition from './WordDefinition'
import './style/dnb-word-definition.scss'
import { P } from '../../elements'

const meta: Meta<typeof WordDefinition> = {
  title: 'Components/WordDefinition',
  component: WordDefinition,
}

export default meta
type Story = StoryObj<typeof WordDefinition>

export const Basic: Story = {
  render: () => (
    <P top="8rem">
      <button>A</button>A text with{' '}
      <WordDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
        unusual words
      </WordDefinition>
      .<button>B</button>
    </P>
  ),
}
