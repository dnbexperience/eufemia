/**
 * Web Radio Component
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
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent,
  keycode,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import RadioGroup from './RadioGroup'
import RadioGroupContext from './RadioGroupContext'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

// Helper functions
const parseChecked = (state) => /true|on/.test(String(state))

const propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  labelSrOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  labelPosition: PropTypes.oneOf(['left', 'right']),
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  element: PropTypes.node,
  group: PropTypes.string,
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
  value: PropTypes.string,
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  ...spacingPropTypes,

  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  onChange: PropTypes.func,
  onStateUpdate: PropTypes.func,
}

const defaultProps = {
  label: null,
  labelSrOnly: null,
  labelPosition: null,
  checked: null,
  disabled: null,
  id: null,
  size: null,
  element: 'input',
  group: null,
  status: null,
  statusState: 'error',
  statusProps: null,
  statusNoAnimation: null,
  globalStatus: null,
  suffix: null,
  value: '',
  attributes: null,
  readOnly: false,
  skeleton: null,

  className: null,
  children: null,

  onChange: null,
  onStateUpdate: null,

  innerRef: null,
}

/**
 * The radio component is our enhancement of the classic radio button.
 */
const RadioComponent = (localProps) => {
  const radioGroupContext = useContext(RadioGroupContext)
  const sharedContext = useContext(Context)

  // Refs - initialize before using props
  const _refInput = useRef(null)
  const _idRef = useRef(localProps.id || makeUniqueId())

  // Get extended props with context
  const contextProps = extendPropsWithContext(
    localProps,
    defaultProps,
    radioGroupContext
  )

  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    contextProps,
    { skeleton: sharedContext?.skeleton },
    pickFormElementProps(sharedContext.formElement),
    sharedContext.Radio
  )

  // State management
  const [checked, setChecked] = useState(parseChecked(props.checked))
  const [_listenForPropChanges, setListenForPropChanges] = useState(true)
  const [_checked, set_checked] = useState(props.checked)
  const [__checked, set__checked] = useState(checked)

  // Effect for getDerivedStateFromProps logic
  useEffect(() => {
    if (_listenForPropChanges) {
      if (props.checked !== _checked) {
        setChecked(parseChecked(props.checked))
      }
    }
    setListenForPropChanges(true)

    if (checked !== __checked) {
      dispatchCustomElementEvent({ props: localProps }, 'onStateUpdate', {
        checked,
      })
    }

    set_checked(props.checked)
    set__checked(checked)
  }, [
    props.checked,
    _checked,
    checked,
    __checked,
    _listenForPropChanges,
    localProps,
  ])

  // Effect for innerRef
  useEffect(() => {
    if (props.innerRef) {
      if (typeof props.innerRef === 'function') {
        props.innerRef(_refInput.current)
      } else {
        props.innerRef.current = _refInput.current
      }
    }
  }, [props.innerRef])

  // Helper methods
  const isContextGroupOrSingle = useCallback(
    () => typeof radioGroupContext.value !== 'undefined' && !props.group,
    [radioGroupContext.value, props.group]
  )

  const isPlainGroup = useCallback(
    () => typeof radioGroupContext.value === 'undefined' && props.group,
    [radioGroupContext.value, props.group]
  )

  const isInNoGroup = useCallback(
    () => typeof radioGroupContext.value === 'undefined' && !props.group,
    [radioGroupContext.value, props.group]
  )

  const callOnChange = useCallback(
    ({ value, checked: checkedValue, event }) => {
      const { group } = props
      if (radioGroupContext.onChange) {
        radioGroupContext.onChange({
          value,
          event,
        })
      }
      dispatchCustomElementEvent({ props: localProps }, 'onChange', {
        group,
        checked: checkedValue,
        value,
        event,
      })

      // help firefox and safari to have a correct state after a click
      if (_refInput.current) {
        _refInput.current.focus()
      }
    },
    [props, radioGroupContext, localProps]
  )

  // Event handlers
  const onKeyDownHandler = useCallback(
    (event) => {
      const key = keycode(event)
      // only have key support if there is only a single radio
      if (isInNoGroup()) {
        switch (key) {
          case 'enter':
            onChangeHandler(event)
            break
        }
      } else if (isContextGroupOrSingle()) {
        switch (key) {
          case 'space':
          case 'enter': {
            const { value } = radioGroupContext
            if (value !== null && typeof value !== 'undefined') {
              event.preventDefault()
            }
            onChangeHandler(event)
            break
          }
        }
      } else {
        // else we only use the native support, and don't want space support
        // because only arrow keys has to be used
        switch (key) {
          case 'space': {
            event.preventDefault()
            break
          }
        }
      }
      dispatchCustomElementEvent({ props: localProps }, 'onKeyDown', {
        event,
      })
    },
    [isInNoGroup, isContextGroupOrSingle, radioGroupContext, localProps]
  )

  const onChangeHandler = useCallback(
    (_event) => {
      const event = _event
      if (isTrue(props.readOnly)) {
        return event.preventDefault()
      }
      const value = event.target.value
      const checkedValue = !checked

      // delay in case we have a props group only
      if (isPlainGroup()) {
        // in case we have a false "hasContext" but a "group"
        // then we have to use a delay, to overwrite the uncontrolled state
        setTimeout(() => {
          setChecked(checkedValue)
          setListenForPropChanges(false)
          callOnChange({ value, checked: checkedValue, event })
        }, 1)
      } else {
        setChecked(checkedValue)
        setListenForPropChanges(false)
        callOnChange({ value, checked: checkedValue, event })
      }
    },
    [props.readOnly, checked, isPlainGroup, callOnChange]
  )

  const onClickHandler = useCallback(
    (event) => {
      if (isTrue(props.readOnly)) {
        return event.preventDefault()
      }
      // only have click support if there are more plain radio
      if (!isPlainGroup()) {
        return
      }
      const value = event.target.value
      const checkedValue = event.target.checked
      callOnChange({ value, checked: checkedValue, event })
    },
    [props.readOnly, isPlainGroup, callOnChange]
  )

  // Render logic
  const {
    status,
    statusState,
    statusProps,
    statusNoAnimation,
    globalStatus,
    suffix,
    element,
    label,
    labelSrOnly,
    labelPosition,
    size,
    readOnly,
    skeleton,
    className,
    id: _id, // eslint-disable-line
    group: _group, // eslint-disable-line
    value: _value, // eslint-disable-line
    checked: _checkedProp, // eslint-disable-line
    disabled: _disabled, // eslint-disable-line
    children, // eslint-disable-line
    onChange, // eslint-disable-line
    onStateUpdate, // eslint-disable-line
    innerRef, // eslint-disable-line

    ...rest
  } = props

  let { value, group, disabled } = props // get it from context also

  const hasContext = typeof radioGroupContext.name !== 'undefined'

  let currentChecked = checked
  if (hasContext) {
    if (typeof radioGroupContext.value !== 'undefined') {
      currentChecked = radioGroupContext.value === value
    }
    group = radioGroupContext.name
    if (isTrue(radioGroupContext.disabled) && disabled !== false) {
      disabled = true
    }
  } else if (typeof rest.name !== 'undefined') {
    group = rest.name
  }

  const id = _idRef.current
  const showStatus = getStatusState(status)

  const mainParams = {
    className: clsx(
      'dnb-radio',
      status && `dnb-radio__status--${statusState}`,
      size && `dnb-radio--${size}`,
      label && `dnb-radio--label-position-${labelPosition || 'right'}`,
      createSpacingClasses(props),
      className
    ),
  }

  let inputParams = {
    role: hasContext || group ? 'radio' : null,
    type: hasContext || group ? 'radio' : 'checkbox', // overwriting the type
  }

  if (!group) {
    inputParams.type = 'checkbox'
    inputParams.role = 'radio' // breaks axe test
  }

  if (showStatus || suffix) {
    inputParams['aria-describedby'] = combineDescribedBy(
      inputParams,
      showStatus ? id + '-status' : null,
      suffix ? id + '-suffix' : null
    )
  }
  if (readOnly) {
    inputParams['aria-readonly'] = inputParams.readOnly = true
  }

  inputParams = Object.assign(inputParams, rest)

  skeletonDOMAttributes(inputParams, skeleton, radioGroupContext)

  // also used for code markup simulation
  validateDOMAttributes(localProps, inputParams)

  const labelComp = label && (
    <FormLabel
      id={id + '-label'}
      forId={id}
      text={label}
      disabled={disabled}
      skeleton={skeleton}
      srOnly={labelSrOnly}
    />
  )

  const Element = element || 'input'

  return (
    <span {...mainParams}>
      <span className="dnb-radio__order">
        {labelPosition === 'left' && labelComp}

        <span className="dnb-radio__inner">
          <AlignmentHelper />

          <FormStatus
            show={showStatus}
            id={id + '-form-status'}
            globalStatus={globalStatus}
            label={label}
            textId={id + '-status'} // used for "aria-describedby"
            widthSelector={id + ', ' + id + '-label'}
            text={status}
            state={statusState}
            noAnimation={statusNoAnimation}
            skeleton={skeleton}
            {...statusProps}
          />

          <span className="dnb-radio__row">
            <span className="dnb-radio__shell">
              <Element
                type="radio"
                value={value}
                id={id}
                name={group}
                className="dnb-radio__input"
                checked={currentChecked}
                aria-checked={isPlainGroup() ? undefined : currentChecked}
                disabled={isTrue(disabled)}
                ref={_refInput}
                {...inputParams}
                onChange={onChangeHandler}
                onClick={onClickHandler}
                onKeyDown={onKeyDownHandler}
              />

              <span
                className={clsx(
                  'dnb-radio__button',
                  createSkeletonClass('shape', skeleton, radioGroupContext)
                )}
                aria-hidden
              />
              <span className="dnb-radio__focus" aria-hidden />
              <span
                className={clsx(
                  'dnb-radio__dot',
                  createSkeletonClass('font', skeleton, radioGroupContext)
                )}
                aria-hidden
              />
            </span>

            {labelPosition !== 'left' && labelComp}

            {suffix && (
              <Suffix
                className="dnb-radio__suffix"
                id={id + '-suffix'} // used for "aria-describedby"
                context={props}
              >
                {suffix}
              </Suffix>
            )}
          </span>
        </span>
      </span>
    </span>
  )
}

const Radio = React.memo(RadioComponent)

Radio.propTypes = propTypes
Radio.defaultProps = defaultProps
Radio.Group = RadioGroup
Radio.parseChecked = parseChecked
Radio._formElement = true
Radio._supportsSpacingProps = true

export default Radio
