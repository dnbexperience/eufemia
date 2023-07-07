/**
 * Page Component
 *
 */

import React from 'react'
import { Link } from 'gatsby'
import packageJson from '../../../package.json' // needs resolveJsonModule in tsconfig
import { P, Logo } from '@dnb/eufemia/src'
import './PortalStyle.scss'
import { footerStyle } from './Layout.module.scss'

export default function Footer() {
  return (
    <footer className={footerStyle}>
      <P>
        <small>
          Package release: {packageJson.releaseVersion} <br />
          Portal update: {packageJson.buildVersion}
        </small>
      </P>

      <Logo height="40" color="white" />

      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Link
        to="/license"
        className="dnb-anchor dnb-anchor--contrast dnb-anchor--no-underline"
      >
        Copyright (c) 2018-present DNB.no
      </Link>
    </footer>
  )
}
