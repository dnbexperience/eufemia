/**
 * Web StepIndicator Context
 *
 */

import React, { useContext, useEffect, useRef, useState } from 'react'
import Context, { ContextProps } from '../../shared/Context'
import { stepIndicatorDefaultProps } from './StepIndicatorProps'
import {
  processChildren,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { onMediaQueryChange } from '../../shared/MediaQueryUtils'
import { StepIndicatorData, StepIndicatorProps } from './StepIndicator'

// We use this array to filter out unwanted
const filterAttributes = Object.keys(stepIndicatorDefaultProps)
  .filter((item) => {
    return !['class', 'className'].includes(item)
  })
  .concat([
    'internalId',
    'isSidebar',
    'hasSidebar',
    'hideSidebar',
    'sidebarIsVisible',
    'mainTitle',
    'stepsLabel',
    'stepsLabelExtended',
    'listOfReachedSteps',
    'setActiveStep',
    'activeStep',
    'countSteps',
    'openState',
    'onChangeState',
    'openHandler',
    'closeHandler',
    'innerRef',
    'hasSkeletonData',
    'filterAttributes',
    'onChangeState',
  ])

const StepIndicatorContext = React.createContext(null)

export default StepIndicatorContext

export type StepIndicatorProviderProps = StepIndicatorProps & {
  /**
   * <em>(required)</em> a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.
   */
  sidebar_id: string
  children: React.ReactNode
  isSidebar?: boolean
}

export const StepIndicatorProvider = ({
  isSidebar = false,
  ...restOfProps
}: StepIndicatorProviderProps) => {
  const props = { isSidebar, ...restOfProps }

  const [hasSidebar, setHasSidebar] = useState<boolean>(true)
  const [hideSidebar, setHideSidebar] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState<number>(props.current_step)
  const [openState, setOpenState] = useState<boolean>(false)

  const data = getData(props)
  const countSteps = data.length
  const listOfReachedSteps = useRef([activeStep].filter(Boolean)).current

  const mediaQueryListener = useRef(null)

  const context = useContext(Context)
  const contextValue = makeContextValue() as StepIndicatorProps &
    ContextProps

  // Mount and dismount
  useEffect(() => {
    const container = document?.getElementById(
      'sidebar__' + props.sidebar_id
    )

    setHasSidebar(Boolean(container))

    mediaQueryListener.current = onMediaQueryChange(
      {
        min: '0',
        max: 'medium',
      },
      (hideSidebar) => {
        setHideSidebar(hideSidebar)
      },
      { runOnInit: true }
    )

    return () => {
      if (mediaQueryListener.current) {
        mediaQueryListener.current()
      }
    }
  }, [])

  // Keeps the activeStep state updated with changes to the current_step prop
  useEffect(() => {
    if (props.current_step !== activeStep) {
      setActiveStep(props.current_step)
    }
  }, [props.current_step])

  // Keeps the listOfReachedSteps state up to date with the activeStep state
  useEffect(() => {
    if (!listOfReachedSteps.includes(activeStep)) {
      listOfReachedSteps.push(activeStep)
    }
  }, [activeStep])

  function onChangeState() {
    setOpenState(false)
  }

  function openHandler() {
    setOpenState(true)
  }

  function closeHandler() {
    setOpenState(false)
  }

  function getData(props: StepIndicatorProviderProps): StepIndicatorData {
    let res: StepIndicatorData = []

    if (props.data) {
      res = props.data
    } else {
      res = processChildren(props)
    }

    if (typeof res === 'string') {
      return res[0] === '[' ? JSON.parse(res) : []
    }

    return res || []
  }

  function makeContextValue(): Record<string, unknown> {
    const globalContext = extendPropsWithContext(
      props,
      stepIndicatorDefaultProps,
      { skeleton: context?.skeleton },
      context.getTranslation(context).StepIndicator,
      context.StepIndicator
    )

    const value = extendSafe(
      { filterAttributes },
      globalContext,
      // Props
      {
        defaultProps: stepIndicatorDefaultProps,
        props,
      },
      // State
      {
        hasSidebar,
        hideSidebar,
        activeStep,
        openState,
        listOfReachedSteps,
        data,
        countSteps,
        stepsLabel: updateStepTitle(globalContext.step_title),
        stepsLabelExtended: updateStepTitle(
          globalContext.step_title_extended
        ),
      },
      // Functions
      {
        setActiveStep,
        onChangeState,
        openHandler,
        closeHandler,
      }
    )

    value.sidebarIsVisible = value.hasSidebar && !value.hideSidebar

    return value
  }

  function updateStepTitle(title: string) {
    return title
      ?.replace('%step', String((activeStep || 0) + 1))
      .replace('%count', String(data?.length || 1))
  }

  if (typeof window !== 'undefined' && window['IS_TEST']) {
    contextValue['no_animation'] = true
  }

  // Filter out unwanted HTML attributes
  Object.keys(contextValue).forEach((key) => {
    if (key.startsWith('_')) {
      delete contextValue[key]
    }
  })

  return (
    <StepIndicatorContext.Provider value={contextValue}>
      {props.children}
    </StepIndicatorContext.Provider>
  )
}

/**
 * Like "Object.assign" – but safe
 * A new falsy value will not be used, if it exists already
 * Also,
 *
 * @param  {...object} objects
 * @returns object
 */
function extendSafe(...objects): Record<string, unknown> {
  const obj = {}

  objects.forEach((itm) => {
    if (itm.defaultProps && itm.props) {
      itm = Object.entries(itm.props).reduce((acc, [k, v]) => {
        if (itm.defaultProps[k] !== v) {
          acc[k] = v
        }
        return acc
      }, {})
    }

    Object.entries(itm).forEach(([k, v]) => {
      if (!obj[k] || (obj[k] && v)) {
        obj[k] = v
      }
    })
  })

  return obj
}
