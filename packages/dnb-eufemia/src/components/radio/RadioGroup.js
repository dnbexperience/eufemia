/**
 * Web RadioGroup Component
 */

import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  extendPropsWithContext,
  makeUniqueId,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  combineLabelledBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import Space from '../Space'
import FormLabel from '../FormLabel'
import FormStatus from '../FormStatus'
import Flex from '../Flex'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import RadioGroupContext from './RadioGroupContext'

// Helper functions
const parseChecked = (state) => /true|on/.test(String(state))

const propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  labelDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  labelSrOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  labelPosition: PropTypes.oneOf(['left', 'right']),
  title: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['default', 'medium', 'large']),
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
  ]),
  statusState: PropTypes.string,
  statusProps: PropTypes.object,
  statusNoAnimation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  globalStatus: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }),
  suffix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  layoutDirection: PropTypes.oneOf(['column', 'row']),
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  value: PropTypes.string,
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  ...spacingPropTypes,

  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),

  onChange: PropTypes.func,
}

const defaultProps = {
  label: null,
  labelDirection: null,
  labelSrOnly: null,
  labelPosition: null,
  title: null,
  disabled: null,
  skeleton: null,
  id: null,
  name: null,
  size: null,
  status: null,
  statusState: 'error',
  statusProps: null,
  statusNoAnimation: null,
  globalStatus: null,
  suffix: null,
  vertical: null,
  layoutDirection: 'row',
  value: undefined,
  attributes: null,

  className: null,
  children: null,

  onChange: null,
}

/**
 * The radio component is our enhancement of the classic radio button. It acts like a radio. Example: On/off, yes/no.
 */
const RadioGroupComponent = (localProps) => {
  const context = useContext(Context)

  // Refs - initialize before using props
  const _refInput = useRef(null)
  const _idRef = useRef(localProps.id || makeUniqueId())
  const _nameRef = useRef(localProps.name || _idRef.current)

  // Get extended props with context
  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    pickFormElementProps(context?.formElement),
    context.RadioGroup
  )

  // State management
  const [value, setValue] = useState(props.value)
  const [_listenForPropChanges, setListenForPropChanges] = useState(true)
  const [_value, set_value] = useState(props.value)

  // Effect for getDerivedStateFromProps logic
  useEffect(() => {
    if (_listenForPropChanges) {
      if (props.value !== _value) {
        setValue(props.value)
      }
      if (typeof props.value !== 'undefined') {
        set_value(props.value)
      }
    }
    setListenForPropChanges(true)
  }, [props.value, _value, _listenForPropChanges])

  // Event handler
  const onChangeHandler = useCallback(
    ({ value: newValue, event }) => {
      setValue(newValue)
      setListenForPropChanges(false)
      dispatchCustomElementEvent({ props: localProps }, 'onChange', {
        value: newValue,
        event,
      })
    },
    [localProps]
  )

  // Render logic
  const {
    status,
    statusState,
    statusProps,
    statusNoAnimation,
    globalStatus,
    suffix,
    label,
    labelDirection,
    labelSrOnly,
    labelPosition,
    vertical,
    layoutDirection,
    size,
    disabled,
    skeleton,
    className,

    id: _id, // eslint-disable-line
    name: _name, // eslint-disable-line
    value: _valueProp, // eslint-disable-line
    children, // eslint-disable-line
    onChange, // eslint-disable-line

    ...rest
  } = props

  const id = _idRef.current
  const showStatus = getStatusState(status)

  const classes = clsx(
    'dnb-radio-group',
    status && `dnb-radio-group__status--${statusState}`,
    `dnb-radio-group--${layoutDirection}`,
    'dnb-form-component',
    createSpacingClasses(props),
    className
  )

  const params = {
    ...rest,
  }
  const legendId = id + '-label'

  if (showStatus || suffix) {
    params['aria-describedby'] = combineDescribedBy(
      params,
      showStatus ? id + '-status' : null,
      suffix ? id + '-suffix' : null
    )
  }
  if (label) {
    params['aria-labelledby'] = combineLabelledBy(params, legendId)
  }

  // also used for code markup simulation
  validateDOMAttributes(localProps, params)

  const contextValue = {
    name: _nameRef.current,
    value,
    size,
    disabled,
    labelPosition,
    onChange: onChangeHandler,
  }

  const Fieldset = label ? 'fieldset' : 'div'

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={classes}>
        <AlignmentHelper />
        <Fieldset
          className="dnb-radio-group__fieldset"
          aria-labelledby={label ? legendId : undefined}
          role="radiogroup"
        >
          <Flex.Container
            direction={
              vertical || labelDirection === 'vertical'
                ? 'vertical'
                : 'horizontal'
            }
            gap={vertical ? 'x-small' : 'small'}
          >
            {label && (
              <FormLabel
                element="legend"
                id={legendId}
                srOnly={labelSrOnly}
              >
                {label}
              </FormLabel>
            )}

            <Space
              element="span"
              id={id}
              className="dnb-radio-group__shell"
              {...params}
            >
              {children}

              {suffix && (
                <Suffix
                  className="dnb-radio-group__suffix"
                  id={id + '-suffix'} // used for "aria-describedby"
                  context={props}
                >
                  {suffix}
                </Suffix>
              )}

              <FormStatus
                show={showStatus}
                id={id + '-form-status'}
                globalStatus={globalStatus}
                label={label}
                text={status}
                state={statusState}
                textId={id + '-status'} // used for "aria-describedby"
                widthSelector={id + ', ' + legendId}
                noAnimation={statusNoAnimation}
                skeleton={skeleton}
                {...statusProps}
              />
            </Space>
          </Flex.Container>
        </Fieldset>
      </div>
    </RadioGroupContext.Provider>
  )
}

const RadioGroup = React.memo(RadioGroupComponent)

RadioGroup.propTypes = propTypes
RadioGroup.defaultProps = defaultProps
RadioGroup.parseChecked = parseChecked

export default RadioGroup

RadioGroup._supportsSpacingProps = true
