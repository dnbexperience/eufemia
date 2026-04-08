import React from 'react'
import useId from './useId'
import { combineDescribedBy } from '../component-helper'

type DescribedByConfig = {
  showStatus?: boolean
  hasSuffix?: boolean
  hasSubmitButton?: boolean
}

type ComponentIds = {
  id: string
  labelId: string
  statusId: string
  formStatusId: string
  suffixId: string
  submitButtonId: string
  ariaDescribedBy: (config: DescribedByConfig) => string | undefined
}

export default function useComponentIds(customId?: string): ComponentIds {
  const id = useId(customId)

  return React.useMemo(() => {
    const labelId = `${id}-label`
    const statusId = `${id}-status`
    const formStatusId = `${id}-form-status`
    const suffixId = `${id}-suffix`
    const submitButtonId = `${id}-submit-button`

    const ariaDescribedBy = ({
      showStatus,
      hasSuffix,
      hasSubmitButton,
    }: DescribedByConfig) => {
      return combineDescribedBy(
        hasSubmitButton ? submitButtonId : null,
        showStatus ? statusId : null,
        hasSuffix ? suffixId : null
      ) as string | undefined
    }

    return {
      id,
      labelId,
      statusId,
      formStatusId,
      suffixId,
      submitButtonId,
      ariaDescribedBy,
    }
  }, [id])
}
