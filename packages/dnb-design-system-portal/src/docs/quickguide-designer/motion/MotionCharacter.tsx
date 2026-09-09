import { Card, P } from '@dnb/eufemia/src'
import './MotionCharacter.scss'

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
      className="dnb-motion-character"
      innerSpace="medium"
      outlineWidth={0}
      responsive={false}
      layoutEngine="css"
    >
      <figure aria-label="Motion character priority">
        <div className="dnb-motion-character__bar" aria-hidden="true">
          {priorities.map(({ name }) => (
            <span
              key={name}
              className={`dnb-motion-character__segment dnb-motion-character__segment--${name.toLowerCase()}`}
            />
          ))}
        </div>
        <dl className="dnb-motion-character__legend">
          {priorities.map(({ name, frequency, guidance }) => (
            <div key={name} className="dnb-motion-character__item">
              <dt>
                <span
                  className={`dnb-motion-character__swatch dnb-motion-character__swatch--${name.toLowerCase()}`}
                  aria-hidden="true"
                />
                <strong>{name}</strong>
              </dt>
              <dd>
                <span>{frequency}</span>
                <P top="xx-small" bottom={0} size="small">
                  {guidance}
                </P>
              </dd>
            </div>
          ))}
        </dl>
        <figcaption className="dnb-sr-only">
          Purpose should make up the largest part of DNB motion. Guidance
          supports it when helpful, while delight is reserved for a small
          finishing touch.
        </figcaption>
      </figure>
    </Card>
  )
}
