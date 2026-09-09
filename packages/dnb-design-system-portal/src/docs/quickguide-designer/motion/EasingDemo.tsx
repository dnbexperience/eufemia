import { Card, P } from '@dnb/eufemia/src'
import './EasingDemo.scss'

const variants = {
  default: {
    token: '--easing-default',
    title: 'Default easing',
    description: 'For standard transitions.',
    timing: '300ms in production, shown 4× slower at 1200ms',
    curve: 'M48 120C84.96 120 48 32 136 32',
  },
  bounce: {
    token: '--easing-fast-bounce',
    title: 'Fast bounce',
    description:
      'Only for small, direct interactions that benefit from a subtle settling effect, such as a control changing state.',
    timing: '180ms in production, shown 4× slower at 720ms',
    curve: 'M48 120C77.92 -17.28 104.32 32 136 32',
  },
} as const

export default function EasingDemo() {
  return (
    <div className="dnb-easing-demos">
      {Object.entries(variants).map(([variant, content]) => (
        <EasingPreview
          key={variant}
          variant={variant as keyof typeof variants}
          {...content}
        />
      ))}
    </div>
  )
}

function EasingPreview({
  variant,
  token,
  title,
  description,
  timing,
  curve,
}: (typeof variants)[keyof typeof variants] & {
  variant: keyof typeof variants
}) {
  return (
    <figure
      className={`dnb-easing-demo dnb-easing-demo--${variant}`}
      aria-label={title}
    >
      <Card
        className="dnb-easing-demo__card"
        innerSpace="small"
        backgroundColor="var(--token-color-background-neutral-subtle)"
        responsive={false}
        layoutEngine="css"
      >
        <code>{token}</code>
        <svg
          className="dnb-easing-demo__stage"
          viewBox="0 0 184 184"
          aria-hidden="true"
          focusable="false"
        >
          <path
            className="dnb-easing-demo__guide"
            d="M48 32H136V120H48Z"
          />
          <path className="dnb-easing-demo__diagonal" d="M48 120L136 32" />
          <path className="dnb-easing-demo__curve" d={curve} />
          <circle
            className="dnb-easing-demo__curve-runner"
            cx="48"
            cy="120"
            r="5"
            data-motion=""
          />
          <circle
            className="dnb-easing-demo__point"
            cx="48"
            cy="120"
            r="4"
          />
          <circle
            className="dnb-easing-demo__point"
            cx="136"
            cy="32"
            r="4"
          />
          <circle
            className="dnb-easing-demo__runner"
            cx="92"
            cy="168"
            r="10"
            data-motion=""
          />
        </svg>
      </Card>
      <figcaption>
        <P top="small" bottom="x-small">
          {description}
        </P>
        <P bottom={0} size="small" className="dnb-easing-demo__timing">
          {timing}
        </P>
      </figcaption>
    </figure>
  )
}
