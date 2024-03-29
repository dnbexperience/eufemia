/**
 * I used this tools:
 * to convert https://svg2jsx.herokuapp.com
 * to optimize https://jakearchibald.github.io/svgomg/
 */

import React from 'react'

const SvgComparison = (props) => (
  <React.Fragment>
    <svg width="24" height="24" {...props}>
      <path
        d="M.5 23.56h23"
        stroke="black"
        fill="white"
        strokeweight="40"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        clipRule="evenodd"
        d="M4.5 19.24a.49.49 0 0 0-.5-.48H2a.49.49 0 0 0-.5.48v4.32h3v-4.32zM10.5 14.44a.49.49 0 0 0-.5-.48H8a.49.49 0 0 0-.5.48v9.12h3v-9.12zM16.5 16.36a.49.49 0 0 0-.5-.48h-2a.49.49 0 0 0-.5.48v7.2h3v-7.2zM22.5 9.64a.49.49 0 0 0-.5-.48h-2a.49.49 0 0 0-.5.48v13.92h3V9.64zM3 13.48c.828 0 1.5-.645 1.5-1.44 0-.795-.672-1.44-1.5-1.44s-1.5.645-1.5 1.44c0 .795.672 1.44 1.5 1.44zM9 8.68c.828 0 1.5-.645 1.5-1.44 0-.795-.672-1.44-1.5-1.44s-1.5.645-1.5 1.44c0 .795.672 1.44 1.5 1.44zM15 10.6c.828 0 1.5-.645 1.5-1.44 0-.795-.672-1.44-1.5-1.44s-1.5.645-1.5 1.44c0 .795.672 1.44 1.5 1.44zM21 4.36c.828 0 1.5-.645 1.5-1.44 0-.795-.672-1.44-1.5-1.44s-1.5.645-1.5 1.44c0 .795.672 1.44 1.5 1.44z"
        stroke="black"
        fill="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.261 11.032l3.587-2.87M10.424 7.695l3.153 1.009M19.8 3.784l-3.759 4.21"
        stroke="black"
        fill="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <svg width="24" height="24" {...props}>
      <path d="M.5 23.06a.5.5 0 1 0 0 1v-1zm23 1a.5.5 0 0 0 0-1v1zm-22-.5H1a.5.5 0 0 0 .5.5v-.5zm3 0v.5a.5.5 0 0 0 .5-.5h-.5zm3 0H7a.5.5 0 0 0 .5.5v-.5zm3 0v.5a.5.5 0 0 0 .5-.5h-.5zm3 0H13a.5.5 0 0 0 .5.5v-.5zm3 0v.5a.5.5 0 0 0 .5-.5h-.5zm3 0H19a.5.5 0 0 0 .5.5v-.5zm3 0v.5a.5.5 0 0 0 .5-.5h-.5zM3.949 10.642a.5.5 0 0 0 .624.78l-.624-.78zm4.211-2.09a.5.5 0 1 0-.624-.78l.624.78zm2.416-1.333a.5.5 0 1 0-.304.952l.304-.952zm2.849 1.961a.5.5 0 1 0 .304-.952l-.304.952zm6.748-5.063a.5.5 0 0 0-.746-.666l.746.666zm-4.505 3.544a.5.5 0 1 0 .746.666l-.746-.666zM.5 24.06h23v-1H.5v1zM5 19.24c0-.56-.467-.98-1-.98v1l.007.001a.02.02 0 0 1-.004-.006A.038.038 0 0 1 4 19.24h1zm-1-.98H2v1h2v-1zm-2 0c-.533 0-1 .42-1 .98h1l-.003.015a.02.02 0 0 1-.004.006L2 19.26v-1zm-1 .98v4.32h1v-4.32H1zm.5 4.82h3v-1h-3v1zm3.5-.5v-4.32H4v4.32h1zm6-9.12c0-.56-.467-.98-1-.98v1l.007.001-.004-.006A.04.04 0 0 1 10 14.44h1zm-1-.98H8v1h2v-1zm-2 0c-.533 0-1 .42-1 .98h1l-.003.015a.02.02 0 0 1-.004.006L8 14.46v-1zm-1 .98v9.12h1v-9.12H7zm.5 9.62h3v-1h-3v1zm3.5-.5v-9.12h-1v9.12h1zm6-7.2c0-.56-.467-.98-1-.98v1l.007.001-.004-.006A.04.04 0 0 1 16 16.36h1zm-1-.98h-2v1h2v-1zm-2 0c-.533 0-1 .42-1 .98h1a.04.04 0 0 1-.003.015.022.022 0 0 1-.004.006L14 16.38v-1zm-1 .98v7.2h1v-7.2h-1zm.5 7.7h3v-1h-3v1zm3.5-.5v-7.2h-1v7.2h1zm6-13.92c0-.56-.467-.98-1-.98v1l.007.001-.004-.006A.04.04 0 0 1 22 9.64h1zm-1-.98h-2v1h2v-1zm-2 0c-.533 0-1 .42-1 .98h1a.04.04 0 0 1-.003.015.022.022 0 0 1-.004.006L20 9.66v-1zm-1 .98v13.92h1V9.64h-1zm.5 14.42h3v-1h-3v1zm3.5-.5V9.64h-1v13.92h1zM3 13.98c1.085 0 2-.85 2-1.94H4c0 .5-.428.94-1 .94v1zm2-1.94c0-1.09-.915-1.94-2-1.94v1c.572 0 1 .44 1 .94h1zM3 10.1c-1.085 0-2 .85-2 1.94h1c0-.5.428-.94 1-.94v-1zm-2 1.94c0 1.09.915 1.94 2 1.94v-1c-.572 0-1-.44-1-.94H1zm8-2.86c1.085 0 2-.85 2-1.94h-1c0 .5-.428.94-1 .94v1zm2-1.94c0-1.09-.915-1.94-2-1.94v1c.572 0 1 .44 1 .94h1zM9 5.3c-1.085 0-2 .85-2 1.94h1c0-.5.428-.94 1-.94v-1zM7 7.24c0 1.09.915 1.94 2 1.94v-1c-.572 0-1-.44-1-.94H7zm8 3.86c1.085 0 2-.85 2-1.94h-1c0 .5-.428.94-1 .94v1zm2-1.94c0-1.09-.915-1.94-2-1.94v1c.572 0 1 .44 1 .94h1zm-2-1.94c-1.085 0-2 .85-2 1.94h1c0-.5.428-.94 1-.94v-1zm-2 1.94c0 1.09.915 1.94 2 1.94v-1c-.572 0-1-.44-1-.94h-1zm8-4.3c1.085 0 2-.85 2-1.94h-1c0 .5-.428.94-1 .94v1zm2-1.94c0-1.09-.915-1.94-2-1.94v1c.572 0 1 .44 1 .94h1zM21 .98c-1.085 0-2 .85-2 1.94h1c0-.5.428-.94 1-.94v-1zm-2 1.94c0 1.09.915 1.94 2 1.94v-1c-.572 0-1-.44-1-.94h-1zM4.573 11.422l3.587-2.87-.624-.78-3.587 2.87.624.78zm5.699-3.25l3.153 1.008.304-.952-3.153-1.01-.304.953zm9.155-4.721l-3.759 4.21.746.666 3.759-4.21-.746-.666z" />
    </svg>
    <svg width="24" height="24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.5 23.08a.5.5 0 0 1 .5-.5h23a.5.5 0 1 1 0 1H1a.5.5 0 0 1-.5-.5z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 18.76c0-.56.467-.98 1-.98h2c.533 0 1 .42 1 .98v4.32a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-4.32zm1 .02v3.8h2v-3.8h-2zM7.5 13.96c0-.56.467-.98 1-.98h2c.533 0 1 .42 1 .98v9.12a.5.5 0 0 1-.5.5H8a.5.5 0 0 1-.5-.5v-9.12zm1 .02v8.6h2v-8.6h-2zM13.5 15.88c0-.56.467-.98 1-.98h2c.533 0 1 .42 1 .98v7.2a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-7.2zm1 .02v6.68h2V15.9h-2zM19.5 9.16c0-.56.467-.98 1-.98h2c.533 0 1 .42 1 .98v13.92a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V9.16zm1 .02v13.4h2V9.18h-2zM1.5 11.56c0-1.09.915-1.94 2-1.94s2 .85 2 1.94c0 1.09-.915 1.94-2 1.94s-2-.85-2-1.94zm2-.94c-.572 0-1 .44-1 .94 0 .5.428.94 1 .94.572 0 1-.44 1-.94 0-.5-.428-.94-1-.94zM7.5 6.76c0-1.09.915-1.94 2-1.94s2 .85 2 1.94c0 1.09-.915 1.94-2 1.94s-2-.85-2-1.94zm2-.94c-.572 0-1 .44-1 .94 0 .5.428.94 1 .94.572 0 1-.44 1-.94 0-.5-.428-.94-1-.94zM13.5 8.68c0-1.09.915-1.94 2-1.94s2 .85 2 1.94c0 1.09-.915 1.94-2 1.94s-2-.85-2-1.94zm2-.94c-.572 0-1 .44-1 .94 0 .5.428.94 1 .94.572 0 1-.44 1-.94 0-.5-.428-.94-1-.94zM19.5 2.44c0-1.09.915-1.94 2-1.94s2 .85 2 1.94c0 1.09-.915 1.94-2 1.94s-2-.85-2-1.94zm2-.94c-.572 0-1 .44-1 .94 0 .5.428.94 1 .94.572 0 1-.44 1-.94 0-.5-.428-.94-1-.94z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.738 7.37a.5.5 0 0 1-.078.702l-3.587 2.87a.5.5 0 0 1-.624-.78l3.587-2.87a.5.5 0 0 1 .702.077zM10.448 7.063a.5.5 0 0 1 .628-.324l3.153 1.009a.5.5 0 1 1-.304.952l-3.153-1.009a.5.5 0 0 1-.324-.628zM20.633 2.931a.5.5 0 0 1 .04.706l-3.759 4.21a.5.5 0 0 1-.746-.666l3.76-4.21a.5.5 0 0 1 .705-.04z"
      />
    </svg>
  </React.Fragment>
)

export default SvgComparison
