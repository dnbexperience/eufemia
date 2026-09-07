import { useId, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Button, H2, Icon, P } from '@dnb/eufemia/src'
import { bell_medium, pause, play } from '@dnb/eufemia/src/icons'
import { useMediaQuery } from '@dnb/eufemia/src/shared'
import familyHomeBody from './assets/dnb-family-home-body.svg'
import familyHomeRoof from './assets/dnb-family-home-roof.svg'
import familyHomeDetails from './assets/dnb-family-home-details.svg'
import './MotionDemos.scss'

export default function MotionDemos() {
  const [paused, setPaused] = useState(false)
  const reducedMotion = useMediaQuery({
    query: '(prefers-reduced-motion: reduce)',
  })

  return (
    <div className="dnb-motion-demos" data-paused={paused}>
      <div className="dnb-motion-demos__controls">
        <P className="dnb-motion-demos__hint">
          {reducedMotion
            ? 'Reduced motion: showing still illustrations.'
            : 'Looping previews'}
        </P>
        <Button
          variant="secondary"
          icon={paused || reducedMotion ? play : pause}
          text={
            reducedMotion
              ? 'Motion paused'
              : paused
                ? 'Resume all'
                : 'Pause all'
          }
          disabled={reducedMotion}
          onClick={() => setPaused((value) => !value)}
        />
      </div>
      <div className="dnb-motion-demos__grid">
        <MotionStudy
          id="enter-and-exit"
          title="Enter and exit"
          description="Bring a dialog into focus, then let it leave without moving the page."
        >
          <DialogScene />
        </MotionStudy>
        <MotionStudy
          id="expand-and-collapse"
          title="Make room"
          description="Reveal more in place. Let nearby content move with it."
        >
          <ExpansionScene />
        </MotionStudy>
        <MotionStudy
          id="respond-to-input"
          title="Respond to input"
          description="Make a change feel immediate, with a small movement that settles."
        >
          <SwitchScene />
        </MotionStudy>
        <MotionStudy
          id="open-from-an-edge"
          title="Open from an edge"
          description="Slide a drawer in from the side without moving the page."
        >
          <DrawerScene />
        </MotionStudy>
        <MotionStudy
          id="reveal-the-path"
          title="Reveal the path"
          description="Unfold the breadcrumb trail with a short, local slide."
        >
          <BreadcrumbScene />
        </MotionStudy>
        <MotionStudy
          id="keep-details-with-the-row"
          title="Keep details with the row"
          description="Open the row while its details settle into place."
        >
          <TableScene />
        </MotionStudy>
        <MotionStudy
          id="show-feedback-in-place"
          title="Show feedback in place"
          description="Make room for a warning beside the text, without shaking the field."
        >
          <TextCounterScene />
        </MotionStudy>
        <MotionStudy
          id="show-activity"
          title="Show activity"
          description="Repeat the indicator while work is in progress, without implying a percentage."
        >
          <ProgressScene />
        </MotionStudy>
        <MotionStudy
          id="show-submission"
          title="Show submission"
          description="Keep the label and shape still while the border signals that submission is in progress."
        >
          <SubmitScene />
        </MotionStudy>
        <MotionStudy
          id="animate-an-illustration"
          title="Animate an illustration"
          description="Bring the roof, windows and greenery into place, then open the garage."
        >
          <IllustrationScene />
        </MotionStudy>
        <MotionStudy
          id="animate-an-icon"
          title="Animate an icon"
          description="Let the bell ring briefly, then settle. Keep its background still."
        >
          <IconScene />
        </MotionStudy>
        <MotionStudy
          id="update-a-bar-graph"
          title="Update a bar graph"
          description="Move from the old values to the new ones. Keep the baseline and scale fixed."
        >
          <BarGraphScene />
        </MotionStudy>
        <MotionStudy
          id="reshape-a-line-graph"
          title="Reshape a line graph"
          description="Keep each point at the same date as the values change, without redrawing from zero."
        >
          <LineGraphScene />
        </MotionStudy>
      </div>
    </div>
  )
}

function MotionStudy({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <figure className="dnb-motion-demo" aria-labelledby={id}>
      <svg
        className="dnb-motion-demo__stage"
        viewBox="0 0 360 240"
        aria-hidden="true"
        focusable="false"
      >
        {children}
      </svg>
      <figcaption className="dnb-motion-demo__caption">
        <H2 id={id} size="medium" top={0} bottom="x-small">
          {title}
        </H2>
        <P top={0} bottom={0}>
          {description}
        </P>
      </figcaption>
    </figure>
  )
}

function Lines({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g
      className="dnb-motion-scene__lines"
      transform={`translate(${x} ${y})`}
    >
      <rect width="104" height="6" rx="3" />
      <rect y="15" width="72" height="6" rx="3" />
    </g>
  )
}

function DialogScene() {
  return (
    <>
      <rect
        className="dnb-motion-scene__surface"
        x="24"
        y="24"
        width="312"
        height="192"
        rx="12"
      />
      <Lines x={48} y={48} />
      <rect
        className="dnb-motion-scene__muted"
        x="48"
        y="92"
        width="264"
        height="44"
        rx="6"
      />
      <rect
        className="dnb-motion-scene__muted"
        x="48"
        y="148"
        width="264"
        height="44"
        rx="6"
      />
      <rect
        className="dnb-motion-scene__backdrop"
        data-motion=""
        x="24"
        y="24"
        width="312"
        height="192"
        rx="12"
      />
      <g className="dnb-motion-scene__dialog" data-motion="">
        <rect
          className="dnb-motion-scene__surface"
          x="82"
          y="52"
          width="196"
          height="136"
          rx="10"
        />
        <circle
          className="dnb-motion-scene__accent-soft"
          cx="180"
          cy="78"
          r="12"
        />
        <path className="dnb-motion-scene__stroke" d="M180 76v8m0-13v1" />
        <rect
          className="dnb-motion-scene__ink"
          x="128"
          y="101"
          width="104"
          height="7"
          rx="3.5"
        />
        <Lines x={128} y={118} />
        <rect
          className="dnb-motion-scene__accent"
          x="147"
          y="153"
          width="66"
          height="18"
          rx="9"
        />
      </g>
    </>
  )
}

function ExpansionScene() {
  return (
    <g>
      <rect
        className="dnb-motion-scene__surface"
        x="44"
        y="28"
        width="272"
        height="184"
        rx="12"
      />
      <rect
        className="dnb-motion-scene__expansion-fill"
        data-motion=""
        x="60"
        y="80"
        width="240"
        height="64"
        rx="6"
      />
      <text className="dnb-motion-scene__label" x="64" y="63">
        Payment details
      </text>
      <g transform="translate(284 58)">
        <path
          className="dnb-motion-scene__chevron dnb-motion-scene__stroke"
          data-motion=""
          d="M -5 3 L 0 -2 L 5 3"
        />
      </g>
      <RevealClip
        x={60}
        y={80}
        width={240}
        height={64}
        clipClassName="dnb-motion-scene__expansion-clip"
      >
        <g className="dnb-motion-scene__expansion-content" data-motion="">
          <Lines x={76} y={94} />
          <rect
            className="dnb-motion-scene__accent"
            x="244"
            y="94"
            width="40"
            height="6"
            rx="3"
          />
        </g>
      </RevealClip>
      <g className="dnb-motion-scene__following-row" data-motion="">
        <path className="dnb-motion-scene__divider" d="M60 88h240" />
        <text className="dnb-motion-scene__label" x="64" y="117">
          Message
        </text>
        <path className="dnb-motion-scene__stroke" d="m279 110 5 5 5-5" />
      </g>
    </g>
  )
}

function SwitchScene() {
  return (
    <>
      <rect
        className="dnb-motion-scene__surface"
        x="36"
        y="62"
        width="288"
        height="116"
        rx="12"
      />
      <text className="dnb-motion-scene__label" x="56" y="95">
        Notifications
      </text>
      <Lines x={56} y={116} />
      <rect
        className="dnb-motion-scene__switch-track"
        data-motion=""
        x="236"
        y="99"
        width="64"
        height="36"
        rx="18"
      />
      <g className="dnb-motion-scene__switch-thumb" data-motion="">
        <circle cx="254" cy="117" r="12" />
        <path
          className="dnb-motion-scene__switch-check dnb-motion-scene__stroke"
          data-motion=""
          d="m249 117 4 4 7-8"
        />
      </g>
    </>
  )
}

function DrawerScene() {
  const clipId = useId()

  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <rect x="24" y="24" width="312" height="192" rx="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect
          className="dnb-motion-scene__surface"
          x="24"
          y="24"
          width="312"
          height="192"
          rx="12"
        />
        <text className="dnb-motion-scene__label" x="48" y="60">
          Accounts
        </text>
        <rect
          className="dnb-motion-scene__muted"
          x="48"
          y="84"
          width="120"
          height="104"
          rx="8"
        />
        <Lines x={56} y={104} />
        <rect
          className="dnb-motion-scene__backdrop"
          data-motion=""
          x="24"
          y="24"
          width="312"
          height="192"
        />
        <g className="dnb-motion-scene__drawer" data-motion="">
          <rect
            className="dnb-motion-scene__surface"
            x="200"
            y="24"
            width="136"
            height="192"
          />
          <path
            className="dnb-motion-scene__stroke"
            d="m309 44 8 8m0-8-8 8"
          />
          <text className="dnb-motion-scene__label" x="216" y="80">
            Details
          </text>
          <Lines x={216} y={100} />
          <rect
            className="dnb-motion-scene__accent-soft"
            x="216"
            y="142"
            width="104"
            height="28"
            rx="6"
          />
        </g>
      </g>
    </>
  )
}

function RevealClip({
  x = 52,
  y,
  width = 256,
  height,
  clipClassName = 'dnb-motion-scene__disclosure-clip',
  children,
}: {
  x?: number
  y: number
  width?: number
  height: number
  clipClassName?: string
  children: ReactNode
}) {
  const clipId = useId()

  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <rect
            className={clipClassName}
            data-motion=""
            x={x}
            y={y}
            width={width}
            height={height}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{children}</g>
    </>
  )
}

function BreadcrumbScene() {
  return (
    <g className="dnb-motion-scene__breadcrumb">
      <rect
        className="dnb-motion-scene__surface"
        x="36"
        y="24"
        width="288"
        height="192"
        rx="12"
      />
      <text className="dnb-motion-scene__label" x="56" y="60">
        Back to...
      </text>
      <g transform="translate(292 56)">
        <path
          className="dnb-motion-scene__disclosure-chevron dnb-motion-scene__stroke"
          data-motion=""
          d="M -5 3 L 0 -2 L 5 3"
        />
      </g>
      <RevealClip y={76} height={104}>
        <rect
          className="dnb-motion-scene__muted"
          x="52"
          y="76"
          width="256"
          height="104"
          rx="6"
        />
        {['Home', 'Accounts', 'Everyday account'].map((label, index) => (
          <g
            key={label}
            className="dnb-motion-scene__breadcrumb-item"
            data-motion=""
          >
            <text
              className="dnb-motion-scene__label"
              x={index === 0 ? 68 : 84}
              y={100 + index * 30}
            >
              {label}
            </text>
          </g>
        ))}
      </RevealClip>
      <rect
        className="dnb-motion-scene__disclosure-following dnb-motion-scene__lines"
        data-motion=""
        x="56"
        y="94"
        width="120"
        height="6"
        rx="3"
      />
    </g>
  )
}

function TableScene() {
  return (
    <g className="dnb-motion-scene__table">
      <rect
        className="dnb-motion-scene__surface"
        x="36"
        y="24"
        width="288"
        height="192"
        rx="12"
      />
      <text className="dnb-motion-scene__label" x="56" y="52">
        Payments
      </text>
      <path className="dnb-motion-scene__divider" d="M52 64h256" />
      <text className="dnb-motion-scene__label" x="84" y="89">
        Transfer
      </text>
      <g transform="translate(66 84)">
        <path
          className="dnb-motion-scene__disclosure-chevron dnb-motion-scene__stroke"
          data-motion=""
          d="M -5 3 L 0 -2 L 5 3"
        />
      </g>
      <RevealClip y={100} height={64}>
        <rect
          className="dnb-motion-scene__muted"
          x="52"
          y="100"
          width="256"
          height="64"
        />
        <g className="dnb-motion-scene__table-content" data-motion="">
          <text className="dnb-motion-scene__label" x="68" y="126">
            To savings
          </text>
          <Lines x={68} y={138} />
        </g>
      </RevealClip>
      <g className="dnb-motion-scene__disclosure-following" data-motion="">
        <path className="dnb-motion-scene__divider" d="M52 100h256" />
        <text className="dnb-motion-scene__label" x="84" y="129">
          Card payment
        </text>
      </g>
    </g>
  )
}

function TextCounterScene() {
  return (
    <>
      <rect
        className="dnb-motion-scene__surface"
        x="36"
        y="40"
        width="288"
        height="160"
        rx="12"
      />
      <text className="dnb-motion-scene__label" x="56" y="70">
        Message
      </text>
      <rect
        className="dnb-motion-scene__surface"
        x="52"
        y="84"
        width="256"
        height="50"
        rx="6"
      />
      <text className="dnb-motion-scene__label" x="64" y="114">
        Thanks for your help
        <tspan className="dnb-motion-scene__counter-error" data-motion="">
          !!!
        </tspan>
      </text>
      <g transform="translate(64 150)">
        <g className="dnb-motion-scene__counter-icon" data-motion="">
          <path d="M8 1 15 14H1Z" />
          <path d="M8 5v4m0 2v.5" />
        </g>
      </g>
      <g className="dnb-motion-scene__counter-gap" data-motion="">
        <g className="dnb-motion-scene__counter-width" data-motion="">
          <text
            className="dnb-motion-scene__counter-normal dnb-motion-scene__label"
            data-motion=""
            x="64"
            y="164"
          >
            2 characters left
          </text>
          <text
            className="dnb-motion-scene__counter-error dnb-motion-scene__counter-message dnb-motion-scene__label"
            data-motion=""
            x="64"
            y="164"
          >
            1 character too many
          </text>
        </g>
      </g>
    </>
  )
}

function ProgressScene() {
  return (
    <>
      <rect
        className="dnb-motion-scene__surface"
        x="72"
        y="28"
        width="216"
        height="184"
        rx="12"
      />
      <circle
        className="dnb-motion-scene__progress-track"
        cx="180"
        cy="104"
        r="24"
      />
      <circle
        className="dnb-motion-scene__progress"
        data-motion=""
        cx="180"
        cy="104"
        r="24"
        pathLength="100"
      />
      <circle
        className="dnb-motion-scene__progress-wipe"
        data-motion=""
        cx="180"
        cy="104"
        r="24"
        pathLength="100"
      />
      <text
        className="dnb-motion-scene__label"
        x="180"
        y="167"
        textAnchor="middle"
      >
        Loading
      </text>
    </>
  )
}

function SubmitScene() {
  return (
    <>
      <rect
        className="dnb-motion-scene__surface"
        x="44"
        y="28"
        width="272"
        height="184"
        rx="12"
      />
      <text className="dnb-motion-scene__label" x="64" y="62">
        Payment
      </text>
      <rect
        className="dnb-motion-scene__muted"
        x="64"
        y="78"
        width="232"
        height="34"
        rx="6"
      />
      <Lines x={80} y={88} />
      {/* CSS supplies the conic-gradient border used in the draft component. */}
      <foreignObject x="120" y="144" width="120" height="48">
        <div className="dnb-motion-scene__submit-glow" data-motion="" />
      </foreignObject>
      <rect
        className="dnb-motion-scene__submit-button"
        x="124"
        y="148"
        width="112"
        height="40"
        rx="20"
      />
      <text
        className="dnb-motion-scene__submit-label"
        x="180"
        y="174"
        textAnchor="middle"
      >
        Send
      </text>
    </>
  )
}

function IllustrationScene() {
  return (
    <svg
      className="dnb-motion-scene__illustration-artwork"
      x="49.25"
      y="57.5"
      width="261.5"
      height="125"
      viewBox="0 0 523 250"
      preserveAspectRatio="xMidYMid meet"
      overflow="visible"
    >
      <IllustrationGreenery side="left" />
      <image
        className="dnb-motion-scene__illustration-body"
        data-motion=""
        href={familyHomeBody}
        width="523"
        height="250"
      />
      <image
        className="dnb-motion-scene__illustration-details"
        data-motion=""
        href={familyHomeDetails}
        width="523"
        height="250"
      />
      <image
        className="dnb-motion-scene__illustration-roof"
        data-motion=""
        href={familyHomeRoof}
        width="523"
        height="250"
      />
      <IllustrationGarage />
      <IllustrationGreenery side="right" />
    </svg>
  )
}

function IllustrationGarage() {
  const clipId = useId()

  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <rect x="105.921" y="183.7" width="112" height="65" />
        </clipPath>
      </defs>
      <g
        className="dnb-motion-scene__garage"
        clipPath={`url(#${clipId})`}
        data-motion=""
      >
        <rect
          x="105.921"
          y="183.7"
          width="112"
          height="65"
          fill="#00343E"
        />
        <g className="dnb-motion-scene__garage-door" data-motion="">
          <path
            d="M217.921 183.7H105.921V248.7H217.921V183.7Z"
            fill="#65BDB4"
          />
          <rect
            x="153.921"
            y="235.7"
            width="9"
            height="3"
            rx="1.5"
            fill="#007272"
          />
          <rect
            x="152.921"
            y="234.7"
            width="9"
            height="3"
            rx="1.5"
            fill="#E9F8F4"
          />
        </g>
        <path
          d="M111.921 183.7H105.921V248.7H111.921V183.7Z"
          fill="#007272"
        />
      </g>
    </>
  )
}

function IllustrationGreenery({ side }: { side: 'left' | 'right' }) {
  return (
    <g transform={`translate(${side === 'right' ? 399 : 0} 0)`}>
      <path
        className={`dnb-motion-scene__illustration-greenery dnb-motion-scene__illustration-greenery--${side}`}
        data-motion=""
        fillRule="evenodd"
        clipRule="evenodd"
        d="M121.81 248H0.592879C0.250578 246.593 0.0482497 245.15 0.00756007 243.693C-0.172685 237.255 2.8806 230.736 8.03796 227.229C13.1944 223.723 20.3154 223.517 25.4846 227.005C26.6032 227.76 27.6475 228.704 28.325 229.892C29.7479 227.22 31.9127 225.182 34.4778 224.239C34.9632 216.964 40.5626 211.223 47.4037 211.223C48.4979 211.223 49.5594 211.371 50.5739 211.648C52.9678 209.386 56.1787 208 59.7093 208C64.4455 208 68.6047 210.491 70.9886 214.248C72.5773 213.49 74.3372 213.065 76.1904 213.065C80.038 213.065 83.4853 214.885 85.8221 217.758C88.553 215.686 91.9984 214.446 95.7474 214.446C103.982 214.446 110.763 220.413 111.68 228.095C112.351 227.903 113.048 227.799 113.765 227.799C118.984 227.799 123.214 233.158 123.214 239.769C123.214 242.047 122.69 245.65 121.81 248Z"
        fill="#13937A"
      />
    </g>
  )
}

function IconScene() {
  return (
    <>
      <circle
        className="dnb-motion-scene__icon-background"
        cx="180"
        cy="120"
        r="48"
      />
      <g className="dnb-motion-scene__icon" data-motion="">
        <foreignObject x="156" y="96" width="48" height="48">
          <Icon icon={bell_medium} size="xx-large" />
        </foreignObject>
      </g>
    </>
  )
}

function GraphFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <rect
        className="dnb-motion-scene__surface"
        x="36"
        y="24"
        width="288"
        height="192"
        rx="12"
      />
      <g className="dnb-motion-scene__graph-axes">
        <text className="dnb-motion-scene__graph-label" x="56" y="48">
          Example data
        </text>
        <path
          className="dnb-motion-scene__divider"
          fill="none"
          d="M80 68h224M80 124h224M80 180h224M80 68v112"
        />
        <text
          className="dnb-motion-scene__graph-label"
          x="72"
          y="72"
          textAnchor="end"
        >
          100
        </text>
        <text
          className="dnb-motion-scene__graph-label"
          x="72"
          y="128"
          textAnchor="end"
        >
          50
        </text>
        <text
          className="dnb-motion-scene__graph-label"
          x="72"
          y="184"
          textAnchor="end"
        >
          0
        </text>
      </g>
      {children}
    </>
  )
}

function BarGraphScene() {
  const values = [
    { label: 'A', from: 35, to: 55 },
    { label: 'B', from: 55, to: 40 },
    { label: 'C', from: 40, to: 75 },
    { label: 'D', from: 65, to: 85 },
  ]

  return (
    <GraphFrame>
      {values.map(({ label, from, to }, index) => {
        const x = 96 + index * 52
        const height = to * 1.12
        const style: CSSProperties & { '--bar-start-scale': number } = {
          '--bar-start-scale': from / to,
        }

        return (
          <g key={label}>
            <rect
              className="dnb-motion-scene__graph-bar dnb-motion-scene__accent"
              data-motion=""
              x={x}
              y={180 - height}
              width="28"
              height={height}
              rx="3"
              style={style}
            />
            <text
              className="dnb-motion-scene__graph-label"
              x={x + 14}
              y="200"
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        )
      })}
    </GraphFrame>
  )
}

function LineGraphScene() {
  return (
    <GraphFrame>
      <path
        className="dnb-motion-scene__graph-line dnb-motion-scene__stroke"
        data-motion=""
        d="M96 125 160 139 224 91 288 77"
      />
      {['Apr', 'May', 'Jun', 'Jul'].map((label, index) => (
        <text
          key={label}
          className="dnb-motion-scene__graph-label"
          x={96 + index * 64}
          y="200"
          textAnchor="middle"
        >
          {label}
        </text>
      ))}
    </GraphFrame>
  )
}
