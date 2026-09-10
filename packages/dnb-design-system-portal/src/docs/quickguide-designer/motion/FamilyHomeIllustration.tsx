import { useId } from 'react'

// Original Family Home artwork: https://www.figma.com/design/dgJbK9h01WK6JsnFEozlFKYO?node-id=4162-0
export default function FamilyHomeIllustration() {
  const id = useId()

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
      fill="none"
    >
      <Greenery side="left" />
      <g className="dnb-motion-scene__illustration-body" data-motion="">
        <path
          d="M66.0293 104.303L164.854 16.7002L271.413 104.303V248.76H66.0293V104.303Z"
          fill="#A5E1D2"
        />
      </g>
      <g className="dnb-motion-scene__illustration-details" data-motion="">
        <path
          d="M270.805 248.76L408.351 246.968V130.922L270.805 104.303V248.76Z"
          fill="#A0D8CB"
        />
        <path
          d="M269.621 248.76L443.098 248.216L444.394 103.967H269.621V248.76Z"
          fill="#A5E1D2"
        />
        <path
          opacity="0.39"
          d="M269.621 248.76L443.098 248.216L444.394 103.967H269.621V248.76Z"
          fill="#008484"
        />
        <g
          className="dnb-motion-scene__illustration-windows dnb-motion-scene__illustration-windows--side"
          data-motion=""
        >
          <g>
            <mask
              id={`${id}-window-1`}
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="290"
              y="132"
              width="64"
              height="39"
            >
              <rect
                x="290.921"
                y="132.7"
                width="62.1079"
                height="38"
                rx="2"
                fill="#C4C4C4"
              />
            </mask>
            <g mask={`url(#${id}-window-1)`}>
              <rect
                x="290.921"
                y="132.7"
                width="62.1079"
                height="38"
                fill="#14555A"
              />
              <rect
                x="286.485"
                y="132.7"
                width="62.1079"
                height="38"
                fill="#00343E"
              />
              <path
                opacity="0.5"
                d="M347.921 171.121L347.921 144.5C345.24 148.33 342.506 152.282 339.333 155.331C335.777 158.77 331.675 161.272 327.353 161.428C325.384 161.506 323.414 161.037 321.445 160.881C313.349 160.021 305.034 162.835 298.087 168.932C296.446 170.339 294.805 171.981 293 172.919C292.343 173.231 291.632 173.466 290.921 173.7L346.171 173.7C347.101 173.7 347.921 172.528 347.921 171.121Z"
                fill="#007272"
              />
            </g>
          </g>
          <g>
            <mask
              id={`${id}-window-2`}
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="364"
              y="132"
              width="64"
              height="39"
            >
              <rect
                x="364.921"
                y="132.7"
                width="62.1079"
                height="38"
                rx="2"
                fill="#C4C4C4"
              />
            </mask>
            <g mask={`url(#${id}-window-2)`}>
              <rect
                x="364.921"
                y="132.7"
                width="62.1079"
                height="38"
                fill="#14555A"
              />
              <rect
                x="360.485"
                y="132.7"
                width="62.1079"
                height="38"
                fill="#00343E"
              />
              <path
                opacity="0.5"
                d="M421.921 169.193L421.921 142.7C419.264 146.541 417.049 150.224 413.904 153.28C410.38 156.729 406.314 159.237 402.03 159.394C400.078 159.473 398.127 159.002 396.175 158.846C388.15 157.983 379.909 160.805 373.024 166.919C371.397 168.33 369.77 169.976 367.981 170.916C367.331 171.23 366.626 171.465 365.921 171.7L420.681 171.7C421.603 171.7 421.921 170.604 421.921 169.193Z"
                fill="#007272"
              />
            </g>
          </g>
          <g>
            <mask
              id={`${id}-window-3`}
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="365"
              y="179"
              width="63"
              height="38"
            >
              <rect
                x="365"
                y="179"
                width="62.1079"
                height="38"
                rx="2"
                fill="#C4C4C4"
              />
            </mask>
            <g mask={`url(#${id}-window-3)`}>
              <rect
                x="365"
                y="179"
                width="62.1079"
                height="38"
                fill="#14555A"
              />
              <rect
                x="360.564"
                y="179"
                width="62.1079"
                height="38"
                fill="#00343E"
              />
              <path
                opacity="0.5"
                d="M422 215.42L422 188.8C419.319 192.63 416.584 196.582 413.412 199.631C409.856 203.07 405.753 205.571 401.432 205.728C399.462 205.806 397.493 205.337 395.524 205.181C387.428 204.321 379.113 207.135 372.166 213.232C370.525 214.639 368.884 216.28 367.079 217.218C366.422 217.531 365.711 217.765 365 218L420.249 218C421.179 218 422 216.828 422 215.42Z"
                fill="#007272"
              />
            </g>
          </g>
        </g>
        <g
          className="dnb-motion-scene__illustration-windows dnb-motion-scene__illustration-windows--front"
          data-motion=""
        >
          <g>
            <mask
              id={`${id}-window-4`}
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="167"
              y="132"
              width="51"
              height="39"
            >
              <rect
                width="49.888"
                height="38"
                rx="2"
                transform="matrix(-1 0 0 1 217.814 132.7)"
                fill="#C4C4C4"
              />
            </mask>
            <g mask={`url(#${id}-window-4)`}>
              <rect
                width="49.888"
                height="38"
                transform="matrix(-1 0 0 1 217.814 132.7)"
                fill="#00343E"
              />
              <rect
                width="49.888"
                height="38"
                transform="matrix(-1 0 0 1 221.377 132.7)"
                fill="#005458"
              />
              <path
                opacity="0.5"
                d="M171.921 133.28V159.7C174.602 155.87 177.337 152.118 180.509 149.069C184.065 145.63 188.168 143.129 192.489 142.972C194.459 142.894 196.428 143.363 198.397 143.52C206.493 144.379 214.808 141.565 221.755 135.468C223.396 134.061 225.037 132.42 226.842 131.482C227.499 131.169 228.21 130.935 228.921 130.7H173.672C172.742 130.7 171.921 131.873 171.921 133.28Z"
                fill="#28B482"
              />
            </g>
          </g>
          <g>
            <mask
              id={`${id}-window-5`}
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="105"
              y="132"
              width="51"
              height="39"
            >
              <rect
                width="49.888"
                height="38"
                rx="2"
                transform="matrix(-1 0 0 1 155.81 132.7)"
                fill="#C4C4C4"
              />
            </mask>
            <g mask={`url(#${id}-window-5)`}>
              <rect
                width="49.888"
                height="38"
                transform="matrix(-1 0 0 1 155.81 132.7)"
                fill="#00343E"
              />
              <rect
                width="49.888"
                height="38"
                transform="matrix(-1 0 0 1 159.374 132.7)"
                fill="#005458"
              />
              <path
                opacity="0.5"
                d="M109.921 132.28V158.7C112.602 154.87 115.337 151.118 118.509 148.069C122.065 144.63 126.168 142.129 130.489 141.972C132.459 141.894 134.428 142.363 136.397 142.52C144.493 143.379 152.808 140.565 159.755 134.468C161.396 133.061 163.037 131.42 164.842 130.482C165.499 130.169 166.21 129.935 166.921 129.7H111.672C110.742 129.7 109.921 130.873 109.921 132.28Z"
                fill="#28B482"
              />
            </g>
          </g>
          <g>
            <mask
              id={`${id}-round-window`}
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="147"
              y="60"
              width="35"
              height="35"
            >
              <circle cx="164.921" cy="77.7002" r="17" fill="#C4C4C4" />
            </mask>
            <g mask={`url(#${id}-round-window)`}>
              <ellipse
                cx="163.921"
                cy="76.7002"
                rx="22"
                ry="21"
                fill="#00343E"
              />
              <circle cx="169.921" cy="77.7002" r="17" fill="#14555A" />
            </g>
          </g>
        </g>
        <g>
          <mask
            id={`${id}-front-door`}
            style={{ maskType: 'alpha' }}
            maskUnits="userSpaceOnUse"
            x="308"
            y="184"
            width="33"
            height="64"
          >
            <rect x="308" y="184" width="33" height="64" fill="#C4C4C4" />
          </mask>
          <g mask={`url(#${id}-front-door)`}>
            <rect
              opacity="0.5"
              x="309"
              y="184"
              width="32"
              height="87"
              fill="#007272"
            />
            <rect x="306" y="184" width="32" height="87" fill="#007272" />
          </g>
          <rect
            x="312"
            y="189"
            width="22"
            height="18"
            rx="1"
            fill="#14555A"
          />
        </g>
      </g>
      <g className="dnb-motion-scene__illustration-roof" data-motion="">
        <path
          d="M164.805 16.7002L341.69 17.4841L444.394 103.967L268.997 104.303L164.805 16.7002Z"
          fill="#C1F8EA"
        />
        <path
          opacity="0.93"
          d="M159.529 16.7002L350.325 17.4841L453.421 104.303H263.721L159.529 16.7002Z"
          fill="#008484"
        />
        <g>
          <path
            d="M277.029 2.7002H290.029V49.7002L277.029 38.7002V2.7002Z"
            fill="#A5E1D2"
          />
          <path
            d="M290.029 2.7002H311.029V49.7002H290.029V2.7002Z"
            fill="#65BDB4"
          />
          <rect
            x="272.921"
            y="0.700195"
            width="15"
            height="7"
            fill="#65BDB4"
          />
          <rect
            x="287.921"
            y="0.700195"
            width="27"
            height="7"
            fill="#0E8C8B"
          />
        </g>
        <path
          d="M51.0293 116.2L159.029 22.7002L262.529 109.7H453.529"
          stroke="#14555A"
          strokeWidth="11"
        />
        <path
          d="M66.4209 119.7L54.4209 120.2L158.921 29.7002L166.421 36.2002L66.4209 119.7Z"
          fill="#65BDB4"
        />
      </g>
      <defs>
        <clipPath id={`${id}-garage`}>
          <rect x="105.921" y="183.7" width="112" height="65" />
        </clipPath>
      </defs>
      <g
        className="dnb-motion-scene__garage"
        clipPath={`url(#${id}-garage)`}
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
      <Greenery side="right" />
    </svg>
  )
}

function Greenery({ side }: { side: 'left' | 'right' }) {
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
