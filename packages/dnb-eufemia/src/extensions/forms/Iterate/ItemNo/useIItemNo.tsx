import React, { useMemo } from 'react'
import { useItem } from '../hooks'
import { useTranslation } from '../../hooks'
import { convertJsxToString } from '../../../../shared/component-helper'

export function useIterateItemNo({
  label: labelProp,
  labelSuffix,
  required,
}) {
  const { index: iterateIndex } = useItem() || {}

  const { optionalLabelSuffix } = useTranslation().Field
  const labelSuffixText = useMemo(() => {
    if (required === false || typeof labelSuffix !== 'undefined') {
      return labelSuffix ?? optionalLabelSuffix
    }
    return ''
  }, [required, labelSuffix, optionalLabelSuffix])

  return useMemo(() => {
    let content = labelProp

    if (iterateIndex !== undefined) {
      content = convertJsxToString(labelProp).replace(
        '{itemNo}',
        String(iterateIndex + 1)
      )
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
