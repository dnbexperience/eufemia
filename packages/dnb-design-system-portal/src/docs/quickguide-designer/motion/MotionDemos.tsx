import { useId } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { FormStatus, H2, Icon, P } from '@dnb/eufemia/src'
import { bell_medium } from '@dnb/eufemia/src/icons'
import { useMediaQuery } from '@dnb/eufemia/src/shared'
import FamilyHomeIllustration from './FamilyHomeIllustration'
import './MotionDemos.scss'

const chevronPoints = [
  { x: -5, from: -2, to: 3 },
  { x: 0, from: 3, to: -2 },
  { x: 5, from: -2, to: 3 },
]

export default function MotionDemos({
  children,
}: {
  children?: ReactNode
}) {
  const reducedMotion = useMediaQuery({
    query: '(prefers-reduced-motion: reduce)',
  })

  return (
    <div className="dnb-motion-demos">
      {reducedMotion && (
        <FormStatus state="warning" role="status" bottom="medium">
          Reduced motion: showing still illustrations.
        </FormStatus>
      )}
      <div className="dnb-motion-demos__grid">
        <MotionStudy
          id="enter-and-exit"
          title="Enter and exit"
          description="Preserve the page as context for a temporary task, so people know where they will return when they close it."
        >
          <DialogScene />
        </MotionStudy>
        <MotionStudy
          id="expand-and-collapse"
          title="Make room"
          description="Connect new information to the action that revealed it, so people can follow the change without losing their place."
        >
          <ExpansionScene />
        </MotionStudy>
        <MotionStudy
          id="respond-to-input"
          title="Respond to input"
          description="Confirm a change immediately and locally, so people can trust that their input was accepted and continue without waiting."
        >
          <SwitchScene />
        </MotionStudy>
        <MotionStudy
          id="open-from-an-edge"
          title="Open from an edge"
          description="Present supporting information without implying that people have left the page. A consistent return path helps them stay oriented."
        >
          <DrawerScene />
        </MotionStudy>
        <MotionStudy
          id="reveal-the-path"
          title="Reveal the path"
          description="Reveal enough of the hierarchy to explain the current location without making it harder to find."
        >
          <BreadcrumbScene />
        </MotionStudy>
        <MotionStudy
          id="keep-details-with-the-row"
          title="Keep details with the row"
          description="Keep details connected to their row, so people can inspect more information without losing their place in the table."
        >
          <TableScene />
        </MotionStudy>
        <MotionStudy
          id="show-feedback-in-place"
          title="Show feedback in place"
          description="Keep feedback close to the input so people know what to correct. The message should be understandable without relying on motion."
        >
          <TextCounterScene />
        </MotionStudy>
        <MotionStudy
          id="show-activity"
          title="Show activity"
          description="Communicate that work is ongoing. A steady rhythm avoids suggesting progress we cannot measure."
        >
          <ProgressScene />
        </MotionStudy>
        <MotionStudy
          id="show-submission"
          title="Show submission"
          description="Confirm that the request is being processed so people do not submit again. Keep the action recognisable while they wait."
        >
          <SubmitScene />
        </MotionStudy>
        <MotionStudy
          id="animate-an-illustration"
          title="Animate an illustration"
          description="Keep the subject recognisable and animate only the part that supports the message. Here, the house stays still while the garage opens and closes."
        >
          <FamilyHomeIllustration />
        </MotionStudy>
        <MotionStudy
          id="animate-an-icon"
          title="Animate an icon"
          description="Reinforce the meaning of an event, such as a new notification. Keep the symbol recognisable; movement should not be the only signal."
        >
          <IconScene />
        </MotionStudy>
        <MotionStudy
          id="update-a-bar-graph"
          title="Update a bar graph"
          description="Keep values comparable during an update. A stable baseline and scale prevent the motion from exaggerating the change."
        >
          <BarGraphScene />
        </MotionStudy>
        <MotionStudy
          id="reshape-a-line-graph"
          title="Reshape a line graph"
          description="Preserve the connection between earlier and updated data. Keep dates and scale fixed so people can follow changes without misreading the trend."
        >
          <LineGraphScene />
        </MotionStudy>
      </div>
      {children}
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
    <figure
      id={id}
      className="dnb-motion-demo"
      aria-labelledby={`${id}-title`}
    >
      <figcaption className="dnb-motion-demo__caption">
        <H2 id={`${id}-title`} size="medium" top={0} bottom="x-small">
          {title}
        </H2>
        <P top={0} bottom={0}>
          {description}
        </P>
      </figcaption>
      <svg
        className="dnb-motion-demo__stage"
        viewBox="0 0 360 240"
        aria-hidden="true"
        focusable="false"
      >
        {children}
      </svg>
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

function MorphingLine({
  className,
  points,
}: {
  className: string
  points: Array<{ x: number; from: number; to: number }>
}) {
  return (
    <g className={className} data-motion="">
      {points.slice(1).map((end, index) => {
        const start = points[index]
        const width = end.x - start.x
        const style: CSSProperties & {
          '--motion-x': number
          '--motion-y': number
          '--motion-y-change': number
          '--motion-slope': number
          '--motion-slope-change': number
        } = {
          '--motion-x': start.x,
          '--motion-y': start.from,
          '--motion-y-change': start.to - start.from,
          '--motion-slope': (end.from - start.from) / width,
          '--motion-slope-change':
            (end.to - start.to - (end.from - start.from)) / width,
        }
        return (
          <path
            key={start.x}
            className="dnb-motion-scene__morph-segment"
            d={`M0 0H${width}`}
            style={style}
            vectorEffect="non-scaling-stroke"
          />
        )
      })}
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
        <MorphingLine
          className="dnb-motion-scene__chevron dnb-motion-scene__stroke"
          points={chevronPoints}
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
  const revealHeight = 104
  const style: CSSProperties & { '--motion-reveal-height': string } = {
    '--motion-reveal-height': `${revealHeight}px`,
  }

  return (
    <g className="dnb-motion-scene__breadcrumb" style={style}>
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
        <MorphingLine
          className="dnb-motion-scene__disclosure-chevron dnb-motion-scene__stroke"
          points={chevronPoints}
        />
      </g>
      <RevealClip y={76} height={revealHeight}>
        <rect
          className="dnb-motion-scene__muted"
          x="52"
          y="76"
          width="256"
          height={revealHeight}
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
  const revealHeight = 64
  const style: CSSProperties & { '--motion-reveal-height': string } = {
    '--motion-reveal-height': `${revealHeight}px`,
  }

  return (
    <g className="dnb-motion-scene__table" style={style}>
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
        <MorphingLine
          className="dnb-motion-scene__disclosure-chevron dnb-motion-scene__stroke"
          points={chevronPoints}
        />
      </g>
      <RevealClip y={100} height={revealHeight}>
        <rect
          className="dnb-motion-scene__muted"
          x="52"
          y="100"
          width="256"
          height={revealHeight}
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
        height="42"
        rx="6"
      />
      <Lines x={80} y={88} />
      {/* An SVG cutout avoids Safari's misplaced CSS mask inside foreignObject. */}
      <foreignObject x="120" y="144" width="120" height="48">
        <div className="dnb-motion-scene__submit-glow" data-motion="" />
      </foreignObject>
      <rect
        className="dnb-motion-scene__submit-cutout"
        x="122"
        y="146"
        width="116"
        height="44"
        rx="22"
      />
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

const graphBaseline = 180
const graphHeight = 112
const graphMaxValue = 100

function valueToGraphY(value: number) {
  return graphBaseline - (value / graphMaxValue) * graphHeight
}

function GraphFrame({ children }: { children: ReactNode }) {
  const ticks = [graphMaxValue, graphMaxValue / 2, 0]

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
          d={
            ticks
              .map((value) => `M80 ${valueToGraphY(value)}h224`)
              .join('') +
            `M80 ${valueToGraphY(graphMaxValue)}v${graphHeight}`
          }
        />
        {ticks.map((value) => (
          <text
            key={value}
            className="dnb-motion-scene__graph-label"
            x="72"
            y={valueToGraphY(value) + 4}
            textAnchor="end"
          >
            {value}
          </text>
        ))}
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
        const height = to * (graphHeight / graphMaxValue)
        const style: CSSProperties & { '--bar-start-scale': number } = {
          '--bar-start-scale': from / to,
        }

        return (
          <g key={label}>
            <rect
              className="dnb-motion-scene__graph-bar dnb-motion-scene__accent"
              data-motion=""
              x={x}
              y={graphBaseline - height}
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
  const values = [
    { month: 'Apr', from: 27, to: 49 },
    { month: 'May', from: 49, to: 37 },
    { month: 'Jun', from: 37, to: 79.5 },
    { month: 'Jul', from: 67, to: 92 },
  ]
  const points = values.map(({ month, from, to }, index) => ({
    month,
    x: 96 + index * 64,
    from: Math.round(valueToGraphY(from)),
    to: Math.round(valueToGraphY(to)),
  }))

  return (
    <GraphFrame>
      <MorphingLine
        className="dnb-motion-scene__graph-line dnb-motion-scene__stroke"
        points={points}
      />
      {points.map(({ month, x }) => (
        <text
          key={month}
          className="dnb-motion-scene__graph-label"
          x={x}
          y="200"
          textAnchor="middle"
        >
          {month}
        </text>
      ))}
    </GraphFrame>
  )
}
