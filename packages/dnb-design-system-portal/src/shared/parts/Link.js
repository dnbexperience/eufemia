/**
 * Page Component
 *
 */

import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import isAbsoluteUrl from 'is-absolute-url'

/* eslint-disable jsx-a11y/anchor-has-content */
const Link = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <a href={to} {...props} />
  ) : (
    <GatsbyLink to={to} {...props} />
  )

export default Link
