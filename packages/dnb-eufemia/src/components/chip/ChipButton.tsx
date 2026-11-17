import { useContext, useEffect, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { clsx } from 'clsx'
import Context from '../../shared/Context'
import {
  getStatusState,
  validateDOMAttributes,
} from '../../shared/component-helper'
import FormStatus from '../form-status/FormStatus'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import { useSpacing } from '../space/SpacingUtils'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import type { ChipElement, ChipProps } from './types'

type ChipButtonProps = Omit<ChipProps, 'value' | 'onChange' | 'size'> & {
  value: string
  label: ReactNode
  labelPosition: 'right'
  onChange: (change: {
    checked: boolean
    event: MouseEvent<HTMLButtonElement>
  }) => void
}

function ChipButton(props: ChipButtonProps) {
  const context = useContext(Context)
  const {
    ref,
    id,
    checked,
    readOnly,
    required: _required,
    skeleton,
    status,
    statusState = 'error',
    statusProps,
    statusNoAnimation,
    globalStatus,
    className,
    style,
    label,
    labelPosition: _labelPosition,
    onChange,
    ...rest
  } = props
  const buttonRef = useCombinedRef<ChipElement>(ref)
  const [isChecked, setChecked] = useState(checked ?? false)

  useEffect(() => {
    setChecked(checked ?? false)
  }, [checked])

  const mainParams = useSpacing(props, {
    className: clsx(
      'dnb-form-component',
      status && `dnb-chip--status-${statusState}`,
      createSkeletonClass(null, skeleton, context),
      className
    ),
    style,
  })
  const buttonParams = skeletonDOMAttributes(
    validateDOMAttributes(props, {
      ...rest,
      'aria-disabled': readOnly || rest['aria-disabled'] || undefined,
    }),
    skeleton,
    context
  )

  return (
    <span {...mainParams}>
      <button
        {...buttonParams}
        ref={buttonRef}
        id={id}
        type="button"
        className="dnb-chip__button"
        aria-pressed={isChecked}
        onClick={(event) => {
          if (readOnly || buttonParams.disabled) {
            return
          }
          const checked = !isChecked
          setChecked(checked)
          onChange({ checked, event })
        }}
      >
        <span
          className={clsx(
            'dnb-chip__content',
            createSkeletonClass('font', skeleton, context)
          )}
        >
          {label}
        </span>
      </button>
      <input
        type="hidden"
        name={buttonParams.name}
        form={buttonParams.form}
        value={buttonParams.value}
        disabled={!isChecked || buttonParams.disabled}
      />
      <FormStatus
        show={getStatusState(status)}
        id={`${id}-form-status`}
        textId={`${id}-status`}
        label={label}
        text={status}
        state={statusState}
        globalStatus={globalStatus}
        noAnimation={statusNoAnimation}
        skeleton={skeleton}
        {...statusProps}
      />
    </span>
  )
}

export default ChipButton
