/**
 * Web StepIndicator Context
 *
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
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
import { StepIndicatorTriggerButtonProps } from './StepIndicatorTriggerButton'

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
  triggerButtonProps?: StepIndicatorTriggerButtonProps
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
  const props = useMemo(() => {
    return { isSidebar, ...restOfProps }
  }, [isSidebar, restOfProps])

  const data = useMemo(() => {
    if (typeof props.data === 'string') {
      return props.data[0] === '[' ? JSON.parse(props.data) : []
    }

    return props.data || []
  }, [props])

  const [hasSidebar, setHasSidebar] = useState<boolean>(true)
  const [hideSidebar, setHideSidebar] = useState<boolean>(false)
  const [openState, setOpenState] = useState<boolean>(false)

  const onChangeState = useCallback(() => {
    setOpenState(false)
  }, [])

  const openHandler = useCallback(() => {
    setOpenState(true)
  }, [])

  const closeHandler = useCallback(() => {
    setOpenState(false)
  }, [])

  const getActiveStepFromProps = useCallback(() => {
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
  }, [data, props.current_step])

  const countSteps = data.length
  const activeStepRef = useRef<number>(getActiveStepFromProps())
  const [, forceUpdate] = useReducer(() => ({}), {})
  const setActiveStep = useCallback((step: number) => {
    activeStepRef.current = step
    forceUpdate()
  }, [])
  const listOfReachedSteps = useRef(
    [activeStepRef.current].filter(Boolean)
  ).current
  const mediaQueryListener = useRef(null)
  const context = useContext(Context)

  const updateStepTitle = useCallback(
    (title: string) => {
      return title
        ?.replace('%step', String((activeStepRef.current || 0) + 1))
        .replace('%count', String(data?.length || 1))
    },
    [data?.length]
  )

  const makeContextValue = useCallback(() => {
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
        activeStep: activeStepRef.current,
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
  }, [
    closeHandler,
    context,
    countSteps,
    data,
    hasSidebar,
    hideSidebar,
    listOfReachedSteps,
    onChangeState,
    openHandler,
    openState,
    props,
    setActiveStep,
    updateStepTitle,
  ])

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
  }, [props.sidebar_id])

  // Keeps the activeStep state updated with changes to the current_step and data props
  useEffect(() => {
    const currentStepFromProps = getActiveStepFromProps()

    if (currentStepFromProps !== activeStepRef.current) {
      setActiveStep(currentStepFromProps)
    }
  }, [props.current_step, data, getActiveStepFromProps, setActiveStep])

  // Keeps the listOfReachedSteps state up to date with the activeStep state
  const activeStep = activeStepRef.current
  useEffect(() => {
    if (!listOfReachedSteps.includes(activeStep)) {
      listOfReachedSteps.push(activeStep)
    }
  }, [activeStep, listOfReachedSteps])

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
