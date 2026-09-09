import { Card, P } from '@dnb/eufemia/src'
import './MotionPriorities.scss'
import './MotionRings.scss'

const priorities = [
  {
    name: 'Purposeful',
    frequency: 'Every motion',
    guidance: 'Explain a change, support an action or confirm a result.',
  },
  {
    name: 'Guiding',
    frequency: 'When it helps',
    guidance:
      'Direct attention and make relationships between states clear.',
  },
  {
    name: 'Delightful',
    frequency: 'A finishing touch',
    guidance: 'Add warmth only when it does not interrupt the task.',
  },
] as const

export default function MotionCharacter() {
  return (
    <Card
      className="dnb-motion-priorities"
      innerSpace="medium"
      responsive={false}
      layoutEngine="css"
    >
      <figure aria-label="Motion priority graph">
        <ol>
          {priorities.map(({ name, frequency, guidance }) => (
            <li
              key={name}
              className={`dnb-motion-priorities__item dnb-motion-priorities__item--${name.toLowerCase()}`}
            >
              <div className="dnb-motion-priorities__labels">
                <strong>{name}</strong>
                <span>{frequency}</span>
              </div>
              <div
                className="dnb-motion-priorities__bar"
                aria-hidden="true"
              />
              <P top="x-small" bottom={0} size="small">
                {guidance}
              </P>
            </li>
          ))}
        </ol>
        <figcaption className="dnb-sr-only">
          Motion should always be purposeful, guide when helpful and add
          delight only as a finishing touch.
        </figcaption>
      </figure>
    </Card>
  )
}

function Rings() {
  return (
    <Card
      className="dnb-motion-rings"
      innerSpace="medium"
      outlineWidth={0}
      responsive={false}
      layoutEngine="css"
    >
      <figure aria-label="Motion priority rings">
        <div
          className="dnb-motion-rings__ring dnb-motion-rings__ring--delightful"
          aria-hidden="true"
        >
          <strong>Delightful</strong>
          <div className="dnb-motion-rings__ring dnb-motion-rings__ring--guiding">
            <strong>Guiding</strong>
            <div className="dnb-motion-rings__ring dnb-motion-rings__ring--purposeful">
              <strong>Purposeful</strong>
            </div>
          </div>
        </div>
        <figcaption className="dnb-sr-only">
          Purpose is at the core of every motion. Guidance surrounds it
          when helpful, while delight is reserved for the outer finishing
          touch.
        </figcaption>
      </figure>
    </Card>
  )
}

MotionCharacter.Rings = Rings
