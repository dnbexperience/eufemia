import { Card } from '@dnb/eufemia/src'
import './EasingDemo.scss'

export default function EasingDemo({
  variant,
}: {
  variant: 'default' | 'bounce'
}) {
  const title = variant === 'default' ? 'Default easing' : 'Fast bounce'

  return (
    <figure
      className={`dnb-easing-demo dnb-easing-demo--${variant}`}
      aria-label={title}
    >
      <Card innerSpace="small" responsive={false} layoutEngine="css">
        <svg
          className="dnb-easing-demo__stage"
          viewBox="0 0 520 96"
          aria-hidden="true"
          focusable="false"
        >
          <rect
            className="dnb-easing-demo__lane"
            x="24"
            y="12"
            width="472"
            height="32"
            rx="16"
          />
          <path
            className="dnb-easing-demo__track dnb-easing-demo__track--eased"
            d="M48 28H464"
          />
          <path className="dnb-easing-demo__track" d="M48 72H416" />
          <g className="dnb-easing-demo__track-ends dnb-easing-demo__track-ends--eased">
            <circle cx="48" cy="28" r="2.5" />
            <circle cx="464" cy="28" r="2.5" />
          </g>
          <g className="dnb-easing-demo__track-ends">
            <circle cx="48" cy="72" r="2.5" />
            <circle cx="416" cy="72" r="2.5" />
          </g>
          <path className="dnb-easing-demo__finish" d="M416 12V88" />
          <circle
            className="dnb-easing-demo__target"
            cx="416"
            cy="28"
            r="12"
          />
          <circle
            className="dnb-easing-demo__target"
            cx="416"
            cy="72"
            r="12"
          />
          <g
            className="dnb-easing-demo__runner dnb-easing-demo__runner--trail-far"
            data-motion=""
          >
            <circle cx="48" cy="28" r="4.5" opacity="0.12" />
          </g>
          <g
            className="dnb-easing-demo__runner dnb-easing-demo__runner--trail-near"
            data-motion=""
          >
            <circle cx="48" cy="28" r="6.75" opacity="0.25" />
          </g>
          <g
            className="dnb-easing-demo__runner dnb-easing-demo__runner--eased"
            data-motion=""
          >
            <circle cx="48" cy="28" r="9" />
            <path
              className="dnb-easing-demo__arrow"
              d="M44 28H52M49 25L52 28L49 31"
            />
          </g>
          <g
            className="dnb-easing-demo__runner dnb-easing-demo__runner--linear"
            data-motion=""
          >
            <circle cx="48" cy="72" r="9" />
          </g>
        </svg>
      </Card>
    </figure>
  )
}
