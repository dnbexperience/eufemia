import {
  actionArtworkStyle,
  artworkBrowserStyle,
  artworkButtonStyle,
  artworkCursorStyle,
  artworkFadeStyle,
  artworkSelectionStyle,
  artworkSurfaceStyle,
  designArtworkStyle,
  developArtworkStyle,
} from './Home.module.scss'

function ButtonArtwork() {
  return (
    <>
      <rect
        width="60"
        height="28"
        rx="14"
        fill="var(--token-color-decorative-first-subtle)"
      />
      <path d="m16 15 2-3 3 4 2-2 4 1m3-1 2-2 3 4 2-3 3 1" />
    </>
  )
}

export default function HomeArtwork({
  variant,
}: {
  variant: 'design' | 'develop'
}) {
  return (
    <svg
      className={`${actionArtworkStyle} ${variant === 'design' ? designArtworkStyle : developArtworkStyle}`}
      viewBox="0 0 112 88"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {variant === 'design' ? (
        <>
          <g className={artworkSelectionStyle}>
            <path d="M10 12h72v40H10z" />
            <path
              className={artworkSurfaceStyle}
              d="M7.5 9.5h5v5h-5zM79.5 9.5h5v5h-5zM7.5 49.5h5v5h-5zM79.5 49.5h5v5h-5z"
            />
          </g>
          <g className={artworkButtonStyle} transform="translate(19.6 20)">
            <ButtonArtwork />
          </g>
          <circle
            cx="18"
            cy="72"
            r="6"
            fill="var(--token-color-decorative-second-subtle)"
          />
          <circle
            cx="39"
            cy="72"
            r="6"
            fill="var(--token-color-decorative-first-subtle)"
          />
          <circle
            cx="60"
            cy="72"
            r="6"
            fill="var(--token-color-decorative-third-subtle)"
          />
          <path
            className={`${artworkSurfaceStyle} ${artworkCursorStyle}`}
            d="m82 51 3 22 6-7 8 2z"
          />
        </>
      ) : (
        <>
          <g className={artworkBrowserStyle}>
            <rect
              className={artworkSurfaceStyle}
              x="6"
              y="10"
              width="92"
              height="64"
              rx="5"
            />
            <path d="M6 24h92m-81-7h1m5 0h1m5 0h1" />
            <path
              className={artworkFadeStyle}
              d="m24 35-7 10 7 10m62-20 7 10-7 10M60 34l-8 22"
            />
          </g>
          <rect
            className={`${artworkSurfaceStyle} ${artworkFadeStyle}`}
            x="42"
            y="49"
            width="68"
            height="36"
            rx="5"
          />
          <g className={artworkButtonStyle}>
            <ButtonArtwork />
          </g>
        </>
      )}
    </svg>
  )
}
