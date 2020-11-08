import React from 'react';
import PropTypes from 'prop-types';

const SVG = ({
  fill = 'none',
  width = '80',
  height = '54',
  id = '',
  viewBox = '0 0 80 54',
  className = ''
}) => (
  <svg
    viewBox={viewBox}
    height={height}
    width={width}
    fill={fill}
    id={id}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M53.5 43.2H51.6V50.9H53.5C55.9 50.9 57.2999 49.5 57.2999 47.1C57.2999 44.7 55.9 43.2 53.5 43.2ZM53.3999 50H52.5V43.9H53.3999C55.1999 43.9 56.2999 45 56.2999 46.9C56.2999 48.8 55.2999 50 53.3999 50ZM63.6 48.2C63.6 46.4 62.6 45.3 61 45.3C59.4 45.3 58.3999 46.5 58.3999 48.1C58.3999 49.8 59.5 50.9 61.2 50.9C62.2 50.9 63 50.5 63.5 49.7L62.7999 49.2C62.4999 49.7 62 50.1 61.2 50.1C60.3 50.1 59.3999 49.5 59.3999 48.3H63.6V48.2ZM61 46C61.9 46 62.5 46.6 62.6 47.6H59.2999C59.4999 46.6 60.1 46 61 46ZM67.6 45.3C66.8 45.3 66.1 45.7 65.7 46.3V43.2H64.7V50.9H65.5V49.8C65.9 50.6 66.6 51 67.5 51C69 51 70.1 49.8 70.1 48.2C70.1 46.4 69 45.3 67.6 45.3ZM67.3999 50.1C66.3999 50.1 65.6 49.2 65.6 48.1C65.6 46.9 66.3999 46.1 67.3999 46.1C68.3999 46.1 69.1 47 69.1 48.1C69.2 49.3 68.4999 50.1 67.3999 50.1ZM71.8999 44.5C72.2999 44.5 72.5 44.2 72.5 43.9C72.5 43.5 72.1999 43.3 71.8999 43.3C71.5999 43.3 71.2999 43.6 71.2999 43.9C71.1999 44.2 71.4999 44.5 71.8999 44.5ZM71.3999 50.9H72.3999V45.4H71.3999V50.9ZM76.2 50.1C75.6 50.1 75.3999 49.8 75.3999 49.3V46.1H76.7999V45.3H75.3999V43.6H74.3999V45.3H73.5V46.1H74.3999V49.3C74.3999 50.3 75 50.9 76 50.9C76.3 50.9 76.5999 50.9 76.7999 50.8V50C76.6999 50.1 76.4 50.1 76.2 50.1Z"
      fill="#B2B4B3"
    />
    <g filter="url(#filter0_dd)">
      <path
        d="M31.3 11.4L21.7001 34.4H15.4L10.7001 16.1C10.4001 15 10.2 14.6 9.30005 14.1C7.90005 13.3 5.50002 12.6 3.40002 12.1L3.5 11.4H13.6C14.9 11.4 16 12.3 16.3 13.7L18.8 27L25 11.4H31.3ZM55.9 26.9C55.9 20.8 47.5 20.5 47.6 17.8C47.6 17 48.4 16.1 50.1 15.9C51 15.8 53.3 15.7 56 16.9L57 12C55.6 11.5 53.7 11 51.4 11C45.5 11 41.4 14.1 41.4 18.6C41.4 21.9 44.3 23.7 46.6 24.8C48.9 25.9 49.7001 26.6 49.7001 27.7C49.7001 29.2 47.9 29.9 46.1 29.9C43.1 29.9 41.4 29.1 40 28.5L38.9 33.5C40.3 34.1 42.8 34.7 45.5 34.7C51.8 34.7 55.9 31.6 55.9 26.9ZM71.4 34.4H76.9L72.1 11.4H67C65.9 11.4 64.9 12.1 64.5 13.1L55.6 34.4H61.8L63 31H70.6L71.4 34.4ZM64.8 26.2L67.9 17.6L69.7001 26.2H64.8ZM39.8 11.4L34.9 34.4H29L33.9 11.4H39.8Z"
        fill="url(#paint0_linear)"
      />
    </g>
    <defs>
      <filter
        id="filter0_dd"
        x="1.40002"
        y="10"
        width="77.5"
        height="27.7"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="83.6069"
        y1="34.2824"
        x2="-13.9951"
        y2="6.39609"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C8C8C8" />
        <stop offset="0.2041" stopColor="#C8C8C8" />
        <stop offset="0.2756" stopColor="white" />
        <stop offset="0.4337" stopColor="white" />
        <stop offset="0.5256" stopColor="#C8C8C8" />
        <stop offset="0.694" stopColor="#C8C8C8" />
        <stop offset="0.7909" stopColor="white" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
    </defs>
  </svg>

  // <svg
  //   viewBox={viewBox}
  //   height={height}
  //   width={width}
  //   fill={fill}
  //   id={id}
  //   className={className}
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <path
  //     d="M42.3153 48.3526H40.3683V56.0526H42.3153C44.7133 56.0526 46.1213 54.6226 46.1213 52.2026C46.1213 49.7826 44.7133 48.3526 42.3153 48.3526ZM42.2493 55.2496H41.3583V49.1556H42.2493C44.0973 49.1556 45.1093 50.2776 45.1093 52.2026C45.1093 54.1276 44.0973 55.2496 42.2493 55.2496ZM52.3817 53.3686C52.3817 51.6086 51.3917 50.4646 49.8187 50.4646C48.2457 50.4646 47.1897 51.6196 47.1897 53.3026C47.1897 54.9746 48.2897 56.1406 49.9397 56.1406C50.9737 56.1406 51.7767 55.7226 52.2057 54.9636L51.5237 54.5016C51.2267 55.0076 50.7427 55.3706 49.9507 55.3706C49.0157 55.3706 48.2017 54.7876 48.1247 53.5666H52.3707C52.3817 53.5336 52.3817 53.4126 52.3817 53.3686ZM49.8187 51.2456C50.7537 51.2456 51.3367 51.8506 51.4577 52.8736H48.1467C48.2677 51.8176 48.9167 51.2456 49.8187 51.2456ZM56.3613 50.4646C55.5363 50.4646 54.8543 50.8276 54.4363 51.4876V48.3526H53.4793V56.0526H54.3263V54.9196C54.7333 55.7006 55.4593 56.1406 56.3613 56.1406C57.8353 56.1406 58.9463 54.9746 58.9463 53.3026C58.9463 51.6306 57.8353 50.4646 56.3613 50.4646ZM56.2513 55.3486C55.2063 55.3486 54.4363 54.4796 54.4363 53.3026C54.4363 52.1256 55.2063 51.2566 56.2513 51.2566C57.2743 51.2566 57.9783 52.1146 57.9783 53.3026C57.9783 54.4906 57.2853 55.3486 56.2513 55.3486ZM60.6923 49.7386C61.0443 49.7386 61.3303 49.4416 61.3303 49.0896C61.3303 48.7376 61.0443 48.4516 60.6923 48.4516C60.3403 48.4516 60.0433 48.7376 60.0433 49.0896C60.0433 49.4416 60.3403 49.7386 60.6923 49.7386ZM60.2083 56.0526H61.1653V50.5526H60.2083V56.0526ZM64.9736 55.3486C64.4126 55.3486 64.1266 55.0846 64.1266 54.5566V51.3446H65.5346V50.5526H64.1266V48.8366H63.1696V50.5526H62.2346V51.3446H63.1696V54.5786C63.1696 55.5796 63.7636 56.1406 64.8086 56.1406C65.1276 56.1406 65.4356 56.0966 65.6116 56.0306V55.2606C65.4576 55.3156 65.2266 55.3486 64.9736 55.3486Z"
  //     fill="#B2B4B3"
  //   />
  //   <g filter="url(#filter0_ddi)">
  //     <path
  //       fillRule="evenodd"
  //       clipRule="evenodd"
  //       d="M35.0993 23.5893C35.0621 26.895 37.6649 28.741 39.6245 29.8373C41.6392 30.963 42.3157 31.6855 42.308 32.6913C42.2926 34.2327 40.7013 34.9125 39.2119 34.939C36.6137 34.9846 35.1031 34.1333 33.902 33.4881L32.9661 38.5192C34.171 39.1563 36.4023 39.7133 38.7161 39.7368C44.1471 39.7368 47.7006 36.6584 47.7198 31.8834C47.7403 25.8245 40.4227 25.4897 40.4726 22.7807C40.4899 21.9596 41.1715 21.084 42.6667 20.8611C43.4072 20.7485 45.4501 20.6617 47.7653 21.8875L48.6743 17.0197C47.4296 16.4988 45.8287 16.0007 43.8358 16.0007C38.7238 16.0007 35.1281 19.1218 35.0993 23.5893ZM57.4095 16.4201C56.4179 16.4201 55.5819 17.0838 55.2091 18.1042L47.4507 39.38H52.8779L53.9573 35.9521H60.5901L61.2166 39.38H65.9994L61.8258 16.4201H57.4095ZM58.1686 22.6225L59.7349 31.2433H55.4454L58.1686 22.6225ZM28.519 16.4201L24.2411 39.38H29.4126L33.6887 16.4201H28.519ZM20.8683 16.4201L15.4853 32.0468L13.3073 18.7598C13.0523 17.2765 12.0434 16.4201 10.9229 16.4201H2.12236L2 17.086C3.80586 17.5362 5.85835 18.2632 7.1024 19.0394C7.86279 19.5147 8.0806 19.9289 8.33043 21.0576L12.454 39.38H17.9202L26.2993 16.4201H20.8683Z"
  //       fill="url(#paint0_linear)"
  //     />
  //   </g>
  //   <defs>
  //     <filter
  //       id="filter0_ddi"
  //       x="0"
  //       y="15.0007"
  //       width="67.9994"
  //       height="27.7361"
  //       filterUnits="userSpaceOnUse"
  //       colorInterpolationFilters="sRGB"
  //     >
  //       <feFlood floodOpacity="0" result="BackgroundImageFix" />
  //       <feColorMatrix
  //         in="SourceAlpha"
  //         type="matrix"
  //         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
  //       />
  //       <feOffset dy="1" />
  //       <feGaussianBlur stdDeviation="1" />
  //       <feColorMatrix
  //         type="matrix"
  //         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0"
  //       />
  //       <feBlend
  //         mode="normal"
  //         in2="BackgroundImageFix"
  //         result="effect1_dropShadow"
  //       />
  //       <feColorMatrix
  //         in="SourceAlpha"
  //         type="matrix"
  //         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
  //       />
  //       <feOffset />
  //       <feGaussianBlur stdDeviation="0.5" />
  //       <feColorMatrix
  //         type="matrix"
  //         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.89 0"
  //       />
  //       <feBlend
  //         mode="normal"
  //         in2="effect1_dropShadow"
  //         result="effect2_dropShadow"
  //       />
  //       <feBlend
  //         mode="normal"
  //         in="SourceGraphic"
  //         in2="effect2_dropShadow"
  //         result="shape"
  //       />
  //       <feColorMatrix
  //         in="SourceAlpha"
  //         type="matrix"
  //         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
  //         result="hardAlpha"
  //       />
  //       <feOffset dy="1" />
  //       <feGaussianBlur stdDeviation="0.5" />
  //       <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
  //       <feColorMatrix
  //         type="matrix"
  //         values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
  //       />
  //       <feBlend mode="normal" in2="shape" result="effect3_innerShadow" />
  //     </filter>
  //     <linearGradient
  //       id="paint0_linear"
  //       x1="68.7227"
  //       y1="30.8358"
  //       x2="32.4469"
  //       y2="-15.3979"
  //       gradientUnits="userSpaceOnUse"
  //     >
  //       <stop stopColor="#C8C8C8" />
  //       <stop offset="0.204062" stopColor="#C8C8C8" />
  //       <stop offset="0.27559" stopColor="white" />
  //       <stop offset="0.433654" stopColor="white" />
  //       <stop offset="0.52559" stopColor="#C8C8C8" />
  //       <stop offset="0.693957" stopColor="#C8C8C8" />
  //       <stop offset="0.790896" stopColor="white" />
  //       <stop offset="1" stopColor="white" />
  //     </linearGradient>
  //   </defs>
  // </svg>
);

SVG.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  viewBox: PropTypes.string
};

export default SVG;
