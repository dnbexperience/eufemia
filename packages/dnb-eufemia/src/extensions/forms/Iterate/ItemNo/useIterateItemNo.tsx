import React, { useMemo } from 'react'
import { useItem } from '../hooks'
import { useTranslation } from '../../hooks'
import { convertJsxToString } from '../../../../shared/component-helper'
import { replaceItemNo } from './ItemNo'

export function useIterateItemNo({
  label: labelProp,
  labelSuffix = undefined,
  required = undefined,
}) {
  const { index: iterateIndex } = useItem() || {}

  const { optionalLabelSuffix } = useTranslation().Field
  const labelSuffixText = useMemo(() => {
    if (
      typeof labelSuffix !== 'boolean' &&
      (required === false || typeof labelSuffix !== 'undefined')
    ) {
      return labelSuffix ?? optionalLabelSuffix
    }
    return ''
  }, [required, labelSuffix, optionalLabelSuffix])

  return useMemo(() => {
    let content = labelProp

    if (iterateIndex !== undefined) {
      content = replaceItemNo(labelProp, iterateIndex)
    }

    if (labelSuffixText) {
      if (convertJsxToString(content).includes(optionalLabelSuffix)) {
        return content
      }

      if (typeof content === 'string') {
        return content + ' ' + labelSuffixText
      }

      if (React.isValidElement(content)) {
        return (
          <>
            {content}
            {' '}
            {labelSuffixText}
          </>
        )
      }
    }

    return content
  }, [iterateIndex, labelProp, labelSuffixText, optionalLabelSuffix])
}
