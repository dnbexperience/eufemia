import type { AriaAttributes } from 'react'

type GroupNameAttributes = Pick<
  AriaAttributes,
  'aria-label' | 'aria-labelledby'
>

/**
 * A field with several options is named as a whole, so `aria-label` and `aria-labelledby` belong to the group,
 * while the remaining attributes still belong to each option.
 */
export default function splitGroupNameAttributes(
  attributes: Record<string, unknown> = {}
) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...optionAttributes
  } = attributes as Record<string, unknown> & GroupNameAttributes

  const groupNameAttributes: GroupNameAttributes = {}
  if (ariaLabel) {
    groupNameAttributes['aria-label'] = ariaLabel
  }
  if (ariaLabelledBy) {
    groupNameAttributes['aria-labelledby'] = ariaLabelledBy
  }

  return {
    groupNameAttributes,
    optionAttributes,
    hasGroupName: Boolean(ariaLabel || ariaLabelledBy),
  }
}
