/**
 * Web StepIndicator Context
 *
 */

import React, { useContext, useEffect, useRef, useState } from 'react'
import Context, { ContextProps } from '../../shared/Context'
import { stepIndicatorDefaultProps } from './StepIndicatorProps'
import { extendPropsWithContext } from '../../shared/component-helper'
import { onMediaQueryChange } from '../../shared/MediaQueryUtils'
import {
  StepIndicatorData,
  StepIndicatorDataItem,
  StepIndicatorMode,
  StepIndicatorProps,
} from './StepIndicator'
import { StepIndicatorItemProps } from './StepIndicatorItem'

// We use this array to filter out unwanted properties
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

export type StepIndicatorContextValues = StepIndicatorProviderProps &
  StepIndicatorProviderStates &
  ContextProps

const StepIndicatorContext =
  React.createContext<StepIndicatorContextValues>(null)

export default StepIndicatorContext

export type StepIndicatorProviderProps = Omit<
  StepIndicatorProps,
  'mode' | 'data'
> & {
  /**
   * <em>(required)</em> a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.
   */
  sidebar_id: string
  /**
   * <em>(required)</em> defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,is_current}]`. See parameters and the example above.
   */
  data?: StepIndicatorData
  /**
   * <em>(required)</em> defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.
   */
  mode?: StepIndicatorMode
  children: React.ReactNode
  isSidebar?: boolean
}

export type StepIndicatorProviderStates = {
  data: (string | StepIndicatorItemProps)[]
  hasSidebar: boolean
  hideSidebar: boolean
  activeStep: number
  openState: boolean
  listOfReachedSteps: number[]
  countSteps: number
  stepsLabel: string
  stepsLabelExtended: string
  filterAttributes: string[]
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  sidebarIsVisible: boolean
  onChangeState: () => void
  openHandler: () => void
  closeHandler: () => void
}

export function StepIndicatorProvider({
  isSidebar = false,
  ...restOfProps
}: StepIndicatorProviderProps) {
  const props = { isSidebar, ...restOfProps }

  const data = getData(props)
  const countSteps = data.length

  const [hasSidebar, setHasSidebar] = useState<boolean>(true)
  const [hideSidebar, setHideSidebar] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState<number>(
    getActiveStepFromProps()
  )
  const [openState, setOpenState] = useState<boolean>(false)

  const listOfReachedSteps = useRef([activeStep].filter(Boolean)).current

  const mediaQueryListener = useRef(null)

  const context = useContext(Context)
  const contextValue = makeContextValue() as StepIndicatorContextValues

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

  // Keeps the activeStep state updated with changes to the current_step and data props
  useEffect(() => {
    const currentStepFromProps = getActiveStepFromProps()

    if (currentStepFromProps !== activeStep) {
      setActiveStep(currentStepFromProps)
    }
  }, [props.current_step, data])

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

  function getData(
    props: StepIndicatorProviderProps
  ): string[] | StepIndicatorDataItem[] {
    if (typeof props.data === 'string') {
      return props.data[0] === '[' ? JSON.parse(props.data) : []
    }

    return props.data || []
  }

  function getActiveStepFromProps() {
    if (typeof data[0] === 'string') {
      return props.current_step
    }

    const dataWithItems = data as StepIndicatorDataItem[]

    const itemWithCurrentStep = dataWithItems.find(
      (item) => item.is_current
    )
    // Is current on data item has precedence(?) over current_step prop
    return itemWithCurrentStep
      ? dataWithItems.indexOf(itemWithCurrentStep)
      : props.current_step
  }

  function makeContextValue() {
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
    ) as StepIndicatorContextValues

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
