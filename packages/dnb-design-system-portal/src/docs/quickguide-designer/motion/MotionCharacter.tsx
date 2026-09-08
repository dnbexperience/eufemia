import { useState } from 'react'
import { Button, Card, H4, P, ProgressIndicator } from '@dnb/eufemia/src'
import './MotionCharacter.scss'

const groups = [
  {
    emphasis: 'lead',
    title: 'Lead with',
    qualities: [
      {
        name: 'Purposeful',
        description: 'Movement has a clear reason.',
        example:
          'Show what changed after an action. If movement explains nothing, leave it out.',
      },
      {
        name: 'Focused',
        description: 'Supports attention on the task.',
        example:
          'Keep feedback close to the action, without moving unrelated content.',
      },
      {
        name: 'Calm',
        description: 'Restrained and gentle.',
        example:
          'Move only what needs to change. Let the rest of the interface stay still.',
      },
    ],
  },
  {
    emphasis: 'support',
    title: 'Support with',
    qualities: [
      {
        name: 'Guiding',
        description: 'Helps explain where to look or what changed.',
        example:
          'Make the relationship between a trigger and the content it opens clear.',
      },
      {
        name: 'Natural',
        description: 'Behaves as users expect.',
        example: 'Let a panel return in the direction it came from.',
      },
      {
        name: 'Reassuring',
        description: 'Gives confirmation and confidence.',
        example:
          'Acknowledge a completed action without making the user wait.',
      },
      {
        name: 'Smooth',
        description: 'Continuous and comfortable.',
        example:
          'Avoid abrupt jumps when content changes size or position.',
      },
      {
        name: 'Fluid',
        description: 'Transitions effortlessly.',
        example:
          'Keep a clear connection between the old state and the new one.',
      },
      {
        name: 'Refined',
        description: 'Subtle, controlled and precise.',
        example:
          'Use short travel distances and let related elements settle together.',
      },
      {
        name: 'Confident',
        description: 'Decisive and intentional.',
        example:
          'Respond promptly, then settle. Avoid hesitation or repeated bouncing.',
      },
    ],
  },
  {
    emphasis: 'accent',
    title: 'Use sparingly',
    qualities: [
      {
        name: 'Energetic',
        description: 'Active and quick.',
        example:
          'Keep a small control responsive, not restless. Speed should never hide what changed.',
      },
      {
        name: 'Delightful',
        description: 'Adds a small moment of pleasure.',
        example:
          'A small finishing touch can reward an action, but should not interrupt the next one.',
      },
      {
        name: 'Playful',
        description: 'Lively and expressive.',
        example:
          'Reserve expression for suitable moments, not errors, payments or repeated tasks.',
      },
    ],
  },
]

const spectrums = [
  {
    from: 'Overwhelming',
    to: 'Calm',
    value: 86,
    guidance: 'One clear change, not everything at once.',
  },
  {
    from: 'Distracting',
    to: 'Focused',
    value: 88,
    guidance: 'Keep attention on the task.',
  },
  {
    from: 'Chaotic',
    to: 'Coordinated',
    value: 86,
    guidance: 'Related movements belong together.',
  },
  {
    from: 'Sluggish',
    to: 'Energetic',
    value: 62,
    guidance: 'Prompt and light, without feeling rushed.',
  },
  {
    from: 'Mechanical',
    to: 'Natural',
    value: 82,
    guidance: 'Ease into place rather than stop abruptly.',
  },
  {
    from: 'Rigid',
    to: 'Fluid',
    value: 82,
    guidance: 'Connect states without unnecessary detours.',
  },
  {
    from: 'Decorative',
    to: 'Purposeful',
    value: 88,
    guidance: 'Explain a change or confirm an action.',
  },
  {
    from: 'Dull',
    to: 'Delightful',
    value: 56,
    guidance: 'A small touch of warmth, not a performance.',
  },
]

export default function MotionCharacter() {
  const [selected, setSelected] = useState(groups[0].qualities[0])

  return (
    <Card
      className="dnb-motion-character"
      stack
      innerSpace="medium"
      gap="large"
      responsive={false}
      layoutEngine="css"
    >
      {groups.map(({ emphasis, title, qualities }) => (
        <section
          key={emphasis}
          className={`dnb-motion-character__group dnb-motion-character__group--${emphasis}`}
          aria-label={title}
        >
          <H4 top={0} bottom="small">
            {title}
          </H4>
          <ul className="dnb-motion-character__bubbles">
            {qualities.map((quality) => (
              <li key={quality.name}>
                <Button
                  variant="unstyled"
                  className="dnb-motion-character__bubble"
                  aria-pressed={selected.name === quality.name}
                  text={quality.name}
                  onClick={() => setSelected(quality)}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
      <div
        className="dnb-motion-character__meaning"
        role="status"
        aria-atomic="true"
      >
        <strong>{selected.name}</strong>
        <P top="xx-small" bottom={0}>
          {selected.description} {selected.example}
        </P>
      </div>
    </Card>
  )
}

function Spectrums() {
  return (
    <Card stack innerSpace="medium" responsive={false} layoutEngine="css">
      <ul className="dnb-motion-character__spectrums">
        {spectrums.map(({ from, to, value, guidance }) => {
          const emphasis =
            value >= 80 ? 'Strong emphasis' : 'In moderation'
          return (
            <li key={from}>
              <div className="dnb-motion-character__labels">
                <strong>{to}</strong>
                <span>{emphasis}</span>
              </div>
              <ProgressIndicator
                type="linear"
                progress={value}
                noAnimation
                title={`${to}: ${emphasis}. ${guidance}`}
                top="small"
                bottom="x-small"
              />
              <P top="x-small" bottom={0} size="small">
                Rather than {from.toLowerCase()}.
              </P>
              <P top="xx-small" bottom={0} size="small">
                {guidance}
              </P>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

MotionCharacter.Spectrums = Spectrums
