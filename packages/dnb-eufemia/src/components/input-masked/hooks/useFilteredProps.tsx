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
    mask,
    numberMask,
    currencyMask,
    numberFormat,
    maskOptions,
    asCurrency,
    asNumber,
    asPercent,
    locale,
    showMask,
    allowOverflow,
    overwriteMode,
    _innerRef,

    // Get rest of possible attributes
    ...attributes
  } = props

  return {
    props,
    htmlAttributes: Object.freeze(attributes as Record<string, unknown>),
  }
}
