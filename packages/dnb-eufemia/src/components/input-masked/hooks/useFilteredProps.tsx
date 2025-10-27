/**
 * Takes all component properties and filters out all internal used properties
 *
 * @returns object {props, htmlAttributes}
 */

import React from 'react'
import InputMaskedContext from '../InputMaskedContext'

export const useFilteredProps = () => {
  const { props } = React.useContext(InputMaskedContext)

  const {
    mask, // eslint-disable-line
    numberMask, // eslint-disable-line
    currencyMask, // eslint-disable-line
    numberFormat, // eslint-disable-line
    maskOptions, // eslint-disable-line
    asCurrency, // eslint-disable-line
    asNumber, // eslint-disable-line
    asPercent, // eslint-disable-line
    locale, // eslint-disable-line
    showMask, // eslint-disable-line
    showGuide, // eslint-disable-line
    pipe, // eslint-disable-line
    keepCharPositions, // eslint-disable-line
    placeholderChar, // eslint-disable-line

    // Get get rest of possible attributes
    ...attributes
  } = props

  return {
    props,
    htmlAttributes: Object.freeze(attributes as Record<string, unknown>),
  }
}
